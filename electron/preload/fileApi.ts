import { ipcRenderer } from 'electron';
import { IPC_AIP } from '../enum/index';
import { IfileList } from '../../src/types/fileList';

const savedFile = (oldFile: IfileList, newName: string) => {
  return ipcRenderer.invoke(IPC_AIP.SAVED_FILE, oldFile, newName);
};

const editFile = (oldFile: IfileList, content: string) => {
  return ipcRenderer.invoke(IPC_AIP.EDIT_FILE, oldFile, content);
};

const deleteFile = (file: IfileList) => {
  return ipcRenderer.invoke(IPC_AIP.DELETE_FILE, file);
};

export default { savedFile, editFile, deleteFile };
