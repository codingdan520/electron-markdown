import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      // 主进程配置
      {
        // 打包入口
        entry: 'electron/main/index.ts',
        onstart(options) {
          // 启动electron 项目
          options.startup()
        },
        vite: {
          build: {
            // 构建出口
            outDir: 'dist-electron/main',
          },
        },
      },
      // 渲染进程配置
      {
        entry: 'electron/preload/index.ts',
        onstart(options) {
          // 加载渲染进程配置
          options.reload()
        },
        vite: {
          build: {
            outDir: 'dist-electron/preload',
          },
        },
      }
    ]),
    renderer({
      // 渲染进程融入node
      nodeIntegration: true,
    })
  ],
})
