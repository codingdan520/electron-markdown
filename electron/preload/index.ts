import { contextBridge } from 'electron';
// 渲染进程传递的方法
import { getFilePath } from './fileApi';

// 可以在 vue 文件中使用的 window 全局方法，需要在 electron-api.ts 文件中去声明 方法
contextBridge.exposeInMainWorld('electronAPI', {
  getFilePath,
});
