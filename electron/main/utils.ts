import { access } from 'node:fs';

/* 判断文件存在 */
export const isFileExisted = (path_way: string) => {
  return new Promise((resolve, reject) => {
    access(path_way, (err) => {
      if (err) {
        reject(false); // 不存在
      } else {
        resolve(true); // 存在
      }
    });
  });
};
