import { app, ipcMain } from 'electron';
import { IPC_AIP } from '../enum/index';
import { writeFile, renameFile } from '../utils/helper';
import { join } from 'node:path';
import { IfileList } from '../../src/types/fileList';

const savedPath = app.getPath('documents') + '\\testMark';

ipcMain.handle(IPC_AIP.SAVED_FILE, (e, oldFile: IfileList, newTitle: string) => {
  const { isNew, title, body } = oldFile;
  try {
    if (isNew) {
      // 新增文档
      writeFile(join(savedPath, `${newTitle}.md`), body);
    } else {
      // 修改文档
      renameFile(join(savedPath, `${title}.md`), join(savedPath, `${newTitle}.md`));
    }
  } catch (e) {
    console.log(e);
  }
});
