import { app, ipcMain } from 'electron';
import { IPC_AIP } from '../enum/index';
import { isFileExisted } from './utils';
import { writeFile, renameFile, deleteFile, readFile } from '../utils/helper';
import { join } from 'node:path';
import { mkdir } from 'node:fs';
import { IfileList } from '@/types/fileList';

const rootPath = app.getPath('desktop');
const savedPath = rootPath + '\\testMark';
console.log(savedPath);

// 判断文件夹是否存在并创建
(async () => {
  try {
    await isFileExisted(savedPath);
  } catch (e) {
    console.log('文件夹不存在', e);
    mkdir(savedPath, { recursive: true }, (err) => {
      console.log(err);
    });
  }
})();

// 新增文件
ipcMain.handle(IPC_AIP.SAVED_FILE, async (e, oldFile: IfileList, newTitle: string) => {
  const { body } = oldFile;
  try {
    // 新增文档
    return await writeFile(join(savedPath, `${newTitle}.md`), body);
  } catch (e) {
    return Promise.reject(e);
  }
});

// 修改文件名
ipcMain.handle(IPC_AIP.UPDATED_FILE_NAME, async (e, oldFile: IfileList, newTitle: string) => {
  const { title } = oldFile;
  try {
    // 修改文档名称
    return await renameFile(join(savedPath, `${title}.md`), join(savedPath, `${newTitle}.md`));
  } catch (e) {
    return Promise.reject(e);
  }
});

// 修改文档内容
ipcMain.handle(IPC_AIP.EDIT_FILE, async (e, oldFile: IfileList, content: string) => {
  const { title } = oldFile;
  try {
    // 修改文档
    return await writeFile(join(savedPath, `${title}.md`), content);
  } catch (e) {
    return Promise.reject(e);
  }
});

// 删除文档
ipcMain.handle(IPC_AIP.DELETE_FILE, async (e, file: IfileList) => {
  const { title } = file;
  try {
    // 修改文档
    return await deleteFile(join(savedPath, `${title}.md`));
  } catch (e) {
    return Promise.reject(e);
  }
});

// 读取文档内容
ipcMain.handle(IPC_AIP.READ_FILE, async (e, fileName) => {
  try {
    return await readFile(join(savedPath, `${fileName}.md`));
  } catch (e) {
    return Promise.reject(e);
  }
});
