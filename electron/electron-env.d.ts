/// <reference types="vite-plugin-electron/electron-env" />
import { IElectronAPI } from '#/types/electron-api';

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    DIST_ELECTRON: string;
    DIST: string;
    PUBLIC: string;
  }
}
