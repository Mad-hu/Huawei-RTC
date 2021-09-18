/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-09-18 09:48:12
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import styleImport from "vite-plugin-style-import";
import vueJsx from '@vitejs/plugin-vue-jsx';
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
// import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: "../huawei-rtc-electron/src/vue-classroom/",
    emptyOutDir: true,
    sourcemap: true,
    // assetsDir: './assets',
    // target: 'esnext'
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // antd 按需加载
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
    // element-plus 按需加载
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
    // legacy({
    //   targets: ['ie >= 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // })
  ],
  server: {
    host: "0.0.0.0",
    port: 8088, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
  },
});
