import { FileItem } from '@arco-design/web-vue';
import { defineStore } from 'pinia';
import { FileInfo, ProgressShowInfo } from './types';
import { userWorkerStore } from '@/store/modules/worker';

export const useStoreResourceManager = defineStore('ResourceManager', () => {
  const fileMap = ref<Map<string, FileInfo>>(new Map());

  const workStore = userWorkerStore();
  const progressInfo = ref<Map<string, ProgressShowInfo>>(new Map());

  //待上传
  function uploadFile(file: FileItem, type: string, key: string) {
    let fileInfo: FileInfo = {
      ...file,
      floderType: type,
      key: key,
      edit: false,
    };
    fileMap.value.set(key, fileInfo);
  }
  //删除
  function delFile(type: string, recordkey: string) {
    fileMap.value.forEach((_val, key) => {
      if (type == 'file' && key == recordkey) {
        fileMap.value.delete(key);
      }
      if (type == 'folder' && key.indexOf(recordkey) !== -1) {
        fileMap.value.delete(key);
      }
    });
  }
  //重命名
  function renameFile(value: string, data: any) {
    fileMap.value.forEach((val, key) => {
      if (data.floderType == 'file' && data.key == key) {
        fileMap.value.delete(key);
        fileMap.value.set(value, val);
        val.key = value;
      }
      if (data.floderType == 'folder' && key.indexOf(data.key) !== -1) {
        fileMap.value.delete(key);
        const newFolderKey = key.replace(data.key, value);
        fileMap.value.set(newFolderKey, val);
        val.key = value;
      }
    });
  }

  //新建文件夹
  function addFiles(name: string, path: string) {
    fileMap.value.set(`${path}${name}`, {
      floderType: 'folder',
      key: `${path}${name}`,
      edit: false,
      size: 0,
    });
  }

  function getList(targetPath: string) {
    let targetList: FileInfo[] = [];
    fileMap.value.forEach((val, key) => {
      if (key.indexOf(targetPath) === 0) {
        // 判断是否还有子文件夹
        let subPath = key.replace(targetPath, '');

        let subIndexs = subPath.split('/');

        if (subIndexs.length === 1) {
          targetList.push({
            ...val,
            floderType: val.floderType,
            key: key,
            edit: false,
          });
        }
        if (subIndexs.length > 1) {
          let parentFolderName = subIndexs[0];
          let parentPaht = targetPath + parentFolderName;
          if (targetList.find((item) => item.key === parentPaht)) {
            return;
          }
          targetList.push({
            ...val,
            floderType: 'folder',
            key: parentPaht,
            edit: false,
            size: 0,
          });
        }
      }
    });

    return targetList;
  }

  function getSize(targetPath: string) {
    let regex = new RegExp('^' + targetPath);
    let size = 0;
    fileMap.value.forEach((val, key) => {
      console.log(val)
      if (regex.test(key)) {
        size += val.file?.size;
      }
    });
    return size;
  }

  function subitUpload() {
    fileMap.value.forEach((value, _key) => {
      let uuid = workStore.createChunkList(value);
      let watchStopFn = watch(
        () => workStore.getFileInfo(uuid)?.progress,
        (val, _) => {
          if (val == undefined) return;
          // progressInfo.value.set(uuid, {
          //   progress: val,
          //   title: '计算文件md5中.....',
          //   uuid: uuid,
          // });
          if (val === 1) {
            setTimeout(() => {
              let path = value.key as string;
              console.log(uuid, path, '2we35ratrewt');
              workStore.uploadFile(uuid, path);
              progressInfo.value.set(uuid, {
                progress: 0,
                title: '上传文件中.....',
                uuid: uuid,
              });
              watchStopFn();

              let watchUpStopFile = watch(
                () => workStore.getFileInfo(uuid)?.uploadedSlice?.length,
                (val, _old) => {
                  if (val == undefined) return;
                  if (
                    val === workStore.getFileInfo(uuid)?.chunkList.length &&
                    val !== 0
                  ) {
                    progressInfo.value.set(uuid, {
                      progress: 1,
                      title: '上传完成',
                      uuid: uuid,
                    });
                    workStore
                      .compeleUpload(uuid)
                      .then((_res: any) => {})
                      .catch((_err: any) => {});
                    watchUpStopFile();
                    return;
                  }

                  progressInfo.value.set(uuid, {
                    progress:
                      val / workStore.getFileInfo(uuid)?.chunkList.length!,
                    title: '上传文件中.....',
                    uuid: uuid,
                  });
                },
                {
                  deep: true,
                  immediate: true,
                },
              );
            }, 1000);
          }
        },
        {
          deep: true,
          immediate: true,
        },
      );
    });
  }

  return {
    getList,
    uploadFile,
    delFile,
    renameFile,
    addFiles,
    subitUpload,
    getSize,
  };
});
