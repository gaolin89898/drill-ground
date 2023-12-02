import { defineStore } from 'pinia';
import {
  ChunkList,
  MapMd5FileInfo,
  ReceiveMessage,
} from '@/store/modules/types';
import { FileItem } from '@arco-design/web-vue';
import axios from 'axios';
import { GetUploadIDReq } from './types';

export const userWorkerStore = defineStore('workerStore', () => {
  // Web Worker 实例
  const webWorker = ref(
    new Worker(new URL('../worker.ts', import.meta.url), { type: 'module' }),
  );
  // 全局文件信息存储
  const globalFiles = ref(new Map<string, MapMd5FileInfo>());
  // 最大并发上传数
  const max = ref(10);
  // 上传任务的 UUID 列表
  const taskUUIDs = ref<string[]>([]);
  // 处理 Web Worker 的消息
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
  };

  function getFileInfo(uucode: string): MapMd5FileInfo | undefined {
    return globalFiles.value.get(uucode);
  }

  // 创建切片列表
  function createChunkList(file: FileItem, size = 1024 * 1024 * 5): string {
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
      path: '',
      speed: 0,
      type: file.file?.type as string,
    });

    webWorker.value.postMessage({
      uucode: file.uid,
      chunkList: chunks,
    });

    return file.uid;
  }

  async function uploadFile(uuid: string, path: string): Promise<any> {
    try {
      await getUploadID(uuid, path);
      let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
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
      console.log('parts length number', uuid, parts.length);
      if (parts.length === 0) {
        return Promise.resolve();
      }
      return sendUploadPart(uuid, parts);
    } catch (err) {
      // console.log('error', err)
      return Promise.reject(err);
    }
  }

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
    };
    const res = await axios.post('/api/electronic/getUploadChunkID', req);
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

  async function sendUploadPart(uuid: string, parts: number[]): Promise<any> {
    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    let total = fileInfo.chunkList.length;
    if (parts.length === 0) {
      return Promise.resolve();
    }
    if (parts.length > total) {
      return Promise.reject('parts length error');
    }

    const uploadPart = async () => {
      let startIndex = 0;

      if (max.value === 0) {
        return Promise.resolve();
      }

      while (
        startIndex < parts.length &&
        parts.length <= total &&
        !fileInfo.isPause
      ) {
        // console.log("upload", uuid, startIndex, parts.length, total, max.value)
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
        max.value--;
        startIndex++;
        try {
          let timeNow = new Date().getTime();
          const res = await axios.post('/api/electronic/uploadPart', formData);
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
            max.value++;
            return Promise.resolve();
          }
        } catch (err) {
          max.value++;
          return Promise.reject(err);
        }
      }
    };
    return uploadPart();
  }

  async function compeleUpload(uuid: string): Promise<any> {
    let fileInfo = globalFiles.value.get(uuid);
    try {
      let res = axios.post('/api/electronic/completeChunkUpload', {
        uploadId: fileInfo?.uploadId,
      });
      globalFiles.value.delete(uuid);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

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

  async function continueUpload(uuid: string): Promise<any> {
    let fileInfo = globalFiles.value.get(uuid) as MapMd5FileInfo;
    fileInfo.isPause = false;

    globalFiles.value.set(uuid, fileInfo);
    if (max.value === 0) {
      return Promise.reject('max upload part');
    }
    uploadFile(uuid, fileInfo.path);
    return;
  }

  return {
    getFileInfo,
    createChunkList,
    uploadFile,
    compeleUpload,
    pauseUpload,
    continueUpload,
  };
});
