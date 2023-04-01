import { ipcRenderer, contextBridge } from 'electron';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// window.ipcRenderer = ipcRenderer;

// contextBridge.exposeInMainWorld('ELECTRON', {
//   getFilePath: () => ipcRenderer.invoke('get-file-path'),
// });
// ipcRenderer.send('get-file-path');
