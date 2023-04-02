import { app, ipcMain } from 'electron';
import { IPC_AIP } from '../enum/index';
import { writeFile, renameFile, deleteFile } from '../utils/helper';
import { join } from 'node:path';
import { IfileList } from '@/types/fileList';

const savedPath = app.getPath('desktop') + '\\testMark';

// 保存文件或修改名称
ipcMain.handle(IPC_AIP.SAVED_FILE, async (e, oldFile: IfileList, newTitle: string) => {
  const { isNew, title, body } = oldFile;
  try {
    if (isNew) {
      // 新增文档
      writeFile(join(savedPath, `${newTitle}.md`), body);
    } else {
      // 修改文档名称
      renameFile(join(savedPath, `${title}.md`), join(savedPath, `${newTitle}.md`));
    }
  } catch (e) {
    console.log(e);
  }
});

// 修改文档内容
ipcMain.handle(IPC_AIP.EDIT_FILE, async (e, oldFile: IfileList, content: string) => {
  const { title } = oldFile;
  try {
    // 修改文档
    writeFile(join(savedPath, `${title}.md`), content);
  } catch (e) {
    console.log(e);
  }
});

// 删除文档
ipcMain.handle(IPC_AIP.DELETE_FILE, async (e, file: IfileList) => {
  const { title } = file;
  try {
    // 修改文档
    deleteFile(join(savedPath, `${title}.md`));
  } catch (e) {
    console.log(e);
  }
});
