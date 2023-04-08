import { IfileList } from '../../src/types/fileList';
import type { MessageBoxOptions } from 'electron/main';

export interface IElectronAPI {
  savedFile: (oldFile: IfileList, newName: string) => Promise<void>;
  updatedFileName: (oldFile: IfileList, newName: string) => Promise<void>;
  editFile: (oldFile: IfileList, content: string) => Promise<void>;
  deleteFile: (file: IfileList) => Promise<void>;
  readFile: (fileName: string) => Promise<string>;
  showMessageBox: (options: MessageBoxOptions) => Promise<void>;
  getStoreValue: () => Promise<IfileList[]>;
  setStoreValue: (files: Omit<IfileList, 'body'>[]) => Promise<void>;
}
