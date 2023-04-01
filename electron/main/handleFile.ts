import { app, ipcMain } from 'electron';
import { join } from 'node:path';
import { IPC_AIP } from '../enum/index';

ipcMain.handle(IPC_AIP.GET_FILE_PATH, async (e, arg) => {
  const path = join(__dirname, '../../src/utils/test.js');
  console.log('-----------------', arg);
  return path;
});
