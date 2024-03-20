import { md5 } from 'hash-wasm';
import { MessageFile, ChunkMD5 } from '@/store/modules/types';

// 接收主线程的消息
onmessage = async function (e) {
  let data = e.data as MessageFile;

  // 将 Blob 转为 ArrayBuffer
  let chunkList = data.chunkList;
  let progress = 0;

  // 存储计算 MD5 的 Promise 列表
  let promiseMD5List: Promise<ChunkMD5>[] = [];

  // 遍历每个切片，计算 MD5
  chunkList.forEach((chunk) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(chunk.chunk);
    const promise = new Promise<ChunkMD5>((resolve, reject) => {
      reader.onload = function (e) {
        let uint8Array = new Uint8Array(e.target?.result as ArrayBuffer);
        // 计算切片的 MD5
        md5(uint8Array)
          .then((res) => {
            progress++;
            // 发送进度给主线程
            postMessage({
              uucode: data.uucode,
              type: 'progress',
              data: Math.floor((progress / chunkList.length) * 100) / 100,
            });
            resolve({
              md5: res,
              index: chunk.index,
            });
          })
          .catch((err) => {
            reject(err);
          });
      };
    });
    promiseMD5List.push(promise);
  });

  // 等待所有切片的 MD5 计算完成
  const res = await Promise.all(promiseMD5List);

  // 按索引排序 MD5 结果
  res.sort((a, b) => {
    return a.index - b.index;
  });

  // 将所有切片的 MD5 拼接为一个字符串
  let md5Str = '';
  res.forEach((item) => {
    md5Str += item.md5;
  });

  // 计算整个文件的 MD5
  let resultMD5 = await md5(md5Str);

  // 将结果发送给主线程
  postMessage({
    data: resultMD5,
    uucode: data.uucode,
    type: 'md5',
  });
};
