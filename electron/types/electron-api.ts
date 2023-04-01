import { IfileList } from '../../src/types/fileList';

export interface IElectronAPI {
  savedFile: (oldFile: IfileList, newName: string) => Promise<void>;
}
