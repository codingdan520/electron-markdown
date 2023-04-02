import { ipcRenderer } from 'electron';
import { IPC_AIP } from '../enum/index';
import type { MessageBoxOptions } from 'electron/main';

const showMessageBox = (options: MessageBoxOptions) => {
  return ipcRenderer.invoke(IPC_AIP.SHOW_MESSAGE, options);
};

export default { showMessageBox };
