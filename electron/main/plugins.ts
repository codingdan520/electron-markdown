import Store from 'electron-store';
import { ipcMain } from 'electron';
import { IPC_AIP } from '../enum/index';
const store = new Store({ name: 'markdownInfo' });
// store.openInEditor(); // 在编辑器中打开store存储路径
// 获取store中的值
ipcMain.handle(IPC_AIP.GET_FILE_PATH, () => {
  return store.get('files');
});

// 设置store中的值
ipcMain.handle(IPC_AIP.SET_STORE_VALUE, (e, files) => {
  store.set('files', files);
});
