import { ipcRenderer } from 'electron';
import { IPC_AIP } from '../enum/index';
import { IfileList } from '../../src/types/fileList';

const savedFile = (oldFile: IfileList, newName: string) => {
  return ipcRenderer.invoke(IPC_AIP.SAVED_FILE, oldFile, newName);
};

export default { savedFile };
