import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import './plugins';
import './handleFile';
import './dialog';

// 配置构建时输出文件目录路径
process.env.DIST_ELECTRON = join(__dirname, '..');
// 配置打包后输出文件目录路径
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
// 配置public 文件目录路径，VITE_DEV_SERVER_URL表示vite默认生成的服务url
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST;

// 关闭控制台警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// 配置打包后的文件加载路径
const indexHtml = join(process.env.DIST, 'index.html');
// 这个需要electron加载编译后的js文件
const preload = join(__dirname, '../preload/index.js');
// vite启动项目时的服务路径
const url = process.env.VITE_DEV_SERVER_URL;

let mainWind: BrowserWindow | null = null;
function createWind() {
  mainWind = new BrowserWindow({
    icon: join(process.env.PUBLIC as string, 'favicon.ico'),
    show: false,
    webPreferences: {
      preload,
      // 渲染进程可以调用 node 中的方法
      nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  if (url) {
    // 加载本地开发路径
    mainWind.loadURL(url);

    // 开发调试
    mainWind.webContents.openDevTools();
    mainWind.maximize();
  } else {
    // 打包后加载路径
    mainWind.loadFile(indexHtml);
  }
  mainWind.once('ready-to-show', () => {
    mainWind?.show();
  });
}

app.whenReady().then(() => {
  createWind();
  app.on('activate', () => {
    // 此处解决mac系统关闭app后，但程序坞中还存在图标，再次点击可以重新创建进程
    if (BrowserWindow.getAllWindows.length === 0) createWind();
  });
});

app.on('window-all-closed', () => {
  // electron 运行在三个环境（win32 Windows系统、linux Linux系统、 darwin Mac系统）
  // 此处解决的是非mac系统，程序退出进程 (Mac系统关闭app会保留在程序坞中)
  if (process.platform !== 'darwin') app.quit();
});
