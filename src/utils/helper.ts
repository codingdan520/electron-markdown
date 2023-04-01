import { promises } from 'node:fs';

export const readFile = (path: string) => {
  return promises.readFile(path, 'utf-8');
};

export const writeFile = (path: string, content: string) => {
  return promises.writeFile(path, content, 'utf-8');
};

export const renameFile = (oldPath: string, newPath: string) => {
  return promises.rename(oldPath, newPath);
};

export const deleteFile = (path: string) => {
  return promises.unlink(path);
};
