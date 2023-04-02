import { IfileList } from '../../src/types/fileList';
import type { MessageBoxOptions } from 'electron/main';

export interface IElectronAPI {
  savedFile: (oldFile: IfileList, newName: string) => Promise<void>;
  editFile: (oldFile: IfileList, content: string) => Promise<void>;
  deleteFile: (file: IfileList) => Promise<void>;
  showMessageBox: (options: MessageBoxOptions) => Promise<void>;
}
