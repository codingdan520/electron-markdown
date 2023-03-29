import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslintPlugin from 'vite-plugin-eslint';
import { join } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue', 'electron/*.ts', 'electron/**/*.ts'],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    electron([
      // 主进程配置
      {
        // 打包入口
        entry: 'electron/main/index.ts',
        onstart(options) {
          // 启动electron 项目
          options.startup();
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
          options.reload();
        },
        vite: {
          build: {
            outDir: 'dist-electron/preload',
          },
        },
      },
    ]),
    renderer({
      // 渲染进程融入node
      nodeIntegration: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: join(__dirname, 'src'),
      },
      {
        find: '#',
        replacement: join(__dirname, 'electron'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        additionalData: '@import "@/assets/scss/global.scss";',
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      },
    },
  },
});
