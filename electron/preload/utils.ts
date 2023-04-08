import { ipcRenderer } from 'electron';
import { IPC_AIP } from '../enum/index';
import type { MessageBoxOptions } from 'electron/main';
import type { IfileList } from '../../src/types/fileList';

const showMessageBox = (options: MessageBoxOptions) => {
  return ipcRenderer.invoke(IPC_AIP.SHOW_MESSAGE, options);
};

// 获取store中的值
const getStoreValue = async () => {
  // 获取store中的值
  return await ipcRenderer.invoke(IPC_AIP.GET_FILE_PATH);
};

// 设置store中的值
const setStoreValue = (files: IfileList[]) => {
  return ipcRenderer.invoke(IPC_AIP.SET_STORE_VALUE, files);
};

export default { showMessageBox, getStoreValue, setStoreValue };
