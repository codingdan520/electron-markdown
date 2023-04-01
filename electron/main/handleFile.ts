import { app, ipcMain } from 'electron';
import { deleteFile } from '../../src/utils/helper';
import { join } from 'node:path';

ipcMain.on('get-file-path', async (evet: any, arg) => {
  const desktopPath = app.getPath('desktop');
  const path = join(__dirname, '../../src/utils/test.js');
  console.log('-----------------', arg);
  try {
    await deleteFile(path);
  } catch (e) {
    evet.reply('call-file-path', e);
  }
});
