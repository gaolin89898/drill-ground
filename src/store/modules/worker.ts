import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ChunkList, MapMd5FileInfo, ReceiveMessage } from './types';
import { FileItem } from '@arco-design/web-vue';
import axios from 'axios';
import { GetUploadIDReq } from './types';
// import { baseURL } from '@/http/index';
// import { useStoreResourceManager } from '@/store/modules/fileManagement/index';

export const userWorkerStore = defineStore('workerStore', () => {
  // const useResourceManager = useStoreResourceManager();
  // 创建 Web Worker，用于处理文件上传
  const webWorker = ref(
    new Worker(new URL('@/view/fileExplorer/worker.ts', import.meta.url), {
      type: 'module',
    }),
  );
  // 全局文件信息存储
  const baseURL = 'http://192.168.0.195:8888';
  const globalFiles = ref(new Map<string, MapMd5FileInfo>());
  const max = ref(10); // 最大上传并发数
  const taskUUIDs = ref<string[]>([]); // 任务队列
  const lock = ref(false); // 上传锁，防止同时上传多个文件
  const currentUUID = ref(''); // 当前上传的文件 UUID
  const md5Num = ref(3);

  // 创建文件切片列表并发送给 Web Worker
  function createChunkList(
    file: FileItem,
    size = 1024 * 1024 * 5,
    archiveId: number,
    path: string,
  ): string {
    if (globalFiles.value.has(file.uid)) {
      return file.uid;
    }
    let chunks: ChunkList = [];
    let cur = 0;
    let index = 0;
    while (cur < file.file!.size) {
      let chunk = file.file!.slice(cur, cur + size);
      chunks.push({
        chunk,
        index,
      });
      index++;
      cur += size;
    }
    globalFiles.value.set(file.uid, {
      md5: '',
      progress: 0,
      uuid: file.uid,
      chunkList: chunks,
      size: file.file?.size as number,
      isPause: false,
      path: path,
      speed: 0,
      type: file.file?.type as string,
      archiveId: archiveId,
      // isCancel: false,
      // isSuccess: false,
    });

    if (md5Num.value === 0) {
      return file.uid;
    }
    // 向 Web Worker 发送文件信息
    webWorker.value.postMessage({
      uucode: file.uid,
      chunkList: chunks,
    });
    return file.uid;
  }

  // 处理 Web Worker 发送的消息
  webWorker.value.onmessage = function (e) {
    const data = e.data as ReceiveMessage;
    if (!globalFiles.value.has(data.uucode)) {
      return;
    }
    let fileInfo = globalFiles.value.get(data.uucode) as MapMd5FileInfo;
    switch (data.type) {
      case 'progress':
        {
          fileInfo.progress = data.data as number;
          globalFiles.value.set(data.uucode, fileInfo);
        }
        break;
      case 'md5':
        {
          fileInfo.md5 = data.data as string;
          globalFiles.value.set(data.uucode, fileInfo);
        }
        break;
      default:
        break;
    }
    // 如果未锁定且文件上传完成且已计算 MD5，则进行下一步
    if (!lock.value && fileInfo.progress == 1 && fileInfo.md5 != '') {
      md5Num.value++;
      globalFiles.value.forEach((item) => {
        if (item.md5 == '') {
          md5Num.value--;
          webWorker.value.postMessage({
            uucode: item.uuid,
            chunkList: item.chunkList,
          });
        }
      });
      next();
    }
  };

  // 获取文件信息
  function getFileInfo(uucode: string): MapMd5FileInfo | undefined {
    return globalFiles.value.get(uucode);
  }

  // 获取文件上传 ID
  async function getUploadID(uuid: string, path: string) {
    if (!globalFiles.value.has(uuid)) {
      return Promise.reject('uuid not exist');
    }

    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    if (fileInfo.progress !== 1) {
      return Promise.reject('file not upload finish');
    }
    fileInfo.path = path;
    let req: GetUploadIDReq = {
      md5: fileInfo.md5,
      size: fileInfo.size,
      path: path,
      total: fileInfo.chunkList.length,
      type: fileInfo.type,
      archiveId: fileInfo.archiveId as number,
    };
    // 发送请求获取上传 ID
    const res = await axios.post(baseURL + '/electronic/getUploadChunkID', req);
    try {
      fileInfo.uploadId = res.data.data.uploadId;
      fileInfo.uploadedSlice =
        res.data.data.successChunkList === null
          ? []
          : res.data.data.successChunkList;
      globalFiles.value.set(uuid, fileInfo);
      return Promise.resolve(fileInfo.uploadId);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  // 获取文件上传 ID
  async function uploadFile(uuid: string): Promise<any> {
    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    // 获取上传 ID
    await getUploadID(uuid, fileInfo.path);
    if (fileInfo.uploadId === undefined) {
      return Promise.reject('upload id is undefined');
    }
    let parts: number[] = [];
    for (let i = 0; i < fileInfo.chunkList.length; i++) {
      var isExit = false;
      for (let j = 0; j < fileInfo.uploadedSlice!.length; j++) {
        if (fileInfo.uploadedSlice![j] === fileInfo.chunkList[i].index) {
          isExit = true;
        }
      }
      if (!isExit) {
        parts.push(i);
      }
    }
    if (parts.length === 0) {
      return Promise.resolve();
    }
    await sendUploadPart(uuid, parts);
    return Promise.resolve();
  }

  // 发送文件部分进行上传
  const statusMessage = ref('');
  async function sendUploadPart(uuid: string, parts: number[]): Promise<any> {
    if (currentUUID.value != uuid) return;
    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    let total = fileInfo.chunkList.length;
    if (parts.length === 0) {
      return Promise.resolve();
    }
    if (parts.length > total) {
      return Promise.reject('parts length error');
    }
    // 上传文件部分的具体实现
    const uploadPart = async () => {
      let startIndex = 0;
      while (
        startIndex < parts.length &&
        parts.length <= total &&
        !fileInfo.isPause
      ) {
        if (taskUUIDs.value.find((item) => item === uuid) === undefined) {
          taskUUIDs.value.push(uuid);
        }

        let partIndex = parts[startIndex];
        const chunk = fileInfo.chunkList.find((item) => {
          return item.index === partIndex;
        });
        if (chunk === undefined) {
          return Promise.reject('chunk is undefined');
        }
        const formData = new FormData();
        formData.append('uploadId', fileInfo.uploadId as string);
        formData.append('index', (chunk!.index + 1).toString());
        formData.append('chunk', chunk!.chunk);
        startIndex++;
        try {
          let timeNow = new Date().getTime();
          await axios.post(baseURL + '/electronic/uploadPart', formData);
          let endTime = new Date().getTime();
          let speed = Math.floor(
            (chunk.chunk.size / (endTime - timeNow)) * 1000,
          );
          fileInfo.speed = speed;
          let copySlice = [...fileInfo.uploadedSlice!];
          copySlice.push(chunk.index);
          let slice = copySlice.filter((item, index) => {
            return copySlice.indexOf(item) === index;
          });
          fileInfo.uploadedSlice = slice;
          if (fileInfo.uploadedSlice.length === fileInfo.chunkList.length) {
            await compeleUpload(uuid);
            return Promise.resolve();
          }
        } catch (err: any) {
          if (err.code == 'ERR_NETWORK') {
            statusMessage.value = err.code;
          }
          return Promise.reject(err);
        }
      }
    };
    return uploadPart();
  }

  // 完成文件上传
  async function compeleUpload(uuid: string): Promise<any> {
    let fileInfo = globalFiles.value.get(uuid);
    try {
      let res = axios.post(baseURL + '/electronic/completeChunkUpload', {
        uploadId: fileInfo?.uploadId,
      });
      // fileInfo!.isSuccess = true;
      globalFiles.value.set(uuid, fileInfo!);
      next();
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // 暂停上传
  function pauseUpload(uuid: string) {
    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    fileInfo.isPause = true;
    fileInfo.speed = 0;
    globalFiles.value.set(uuid, fileInfo);
    let index = taskUUIDs.value.findIndex((item) => item === uuid);
    if (index !== -1) {
      taskUUIDs.value.splice(index, 1);
    }
  }

  // 继续上传
  async function continueUpload(uuid: string): Promise<any> {
    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    fileInfo.isPause = false;

    globalFiles.value.set(uuid, fileInfo);
    if (max.value === 0) {
      return Promise.reject('max upload part');
    }
    uploadFile(uuid);
    return;
  }
  // 处理下一个上传任务
  async function next() {
    lock.value = true;
    let isStart = false;
    // globalFiles.value.forEach((value, key) => {
    //   if (
    //     value.chunkList.length !== value.uploadedSlice?.length &&
    //     !value.isSuccess &&
    //     !isStart &&
    //     value.md5 != ''
    //   ) {
    //     isStart = true;
    //     currentUUID.value = key;
    //     uploadFile(key);
    //     return true;
    //   }
    // });
    if (!isStart) {
      lock.value = false;
    }
  }
  //取消上传
  async function cancelFiles() {
    taskUUIDs.value = [];
    globalFiles.value.clear();
  }

  async function cancelFile(uuid: string) {
    globalFiles.value.delete(uuid);
    if (uuid == currentUUID.value) {
      await next();
    }
  }

  return {
    getFileInfo,
    createChunkList,
    uploadFile,
    compeleUpload,
    pauseUpload,
    continueUpload,
    cancelFile,
    next,
    // subitUpload,
    md5Num,
    cancelFiles,
    statusMessage,
    currentUUID,
  };
});
