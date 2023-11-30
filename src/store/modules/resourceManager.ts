import { FileItem } from '@arco-design/web-vue';
import { defineStore } from 'pinia';
import { FileInfo } from './types';

export const useStoreResourceManager = defineStore('ResourceManager', () => {
  const fileMap = ref<Map<string, FileItem>>(new Map());

  //上传
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
    if (data.floderType == 'file') {
      console.log(value, data);
    }
  }

  function getList(targetPath: string): FileItem[] {
    let targetList: FileInfo[] = [];

    fileMap.value.forEach((val, key) => {
      if (key.indexOf(targetPath) === 0) {
        // 判断是否还有子文件夹
        let subPath = key.replace(targetPath, '');

        let subIndexs = subPath.split('/');

        if (subIndexs.length === 1) {
          // 如果已经存在，就不添加了
          targetList.push({
            ...val,
            floderType: 'file',
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
          });
        }
      }
    });
    return targetList;
  }

  return {
    getList,
    uploadFile,
    delFile,
    renameFile,
  };
});
