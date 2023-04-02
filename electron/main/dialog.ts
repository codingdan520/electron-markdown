import { dialog, ipcMain } from 'electron';
import { IPC_AIP } from '../enum/index';
import type { MessageBoxOptions } from 'electron/main';

ipcMain.handle(IPC_AIP.SHOW_MESSAGE, async (e, options: MessageBoxOptions) => {
  return await dialog.showMessageBox(options);
});
