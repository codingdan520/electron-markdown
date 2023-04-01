import { ipcRenderer } from 'electron';
import { IPC_AIP } from '../enum/index';
export const getFilePath = () => ipcRenderer.invoke(IPC_AIP.GET_FILE_PATH, 123);
