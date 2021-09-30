/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-09-13 17:25:40
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import store from "./store";
import 'normalize.css/normalize.css';
import { ElButton, ElDialog, ElInput, ElRadio } from "element-plus";
import "element-plus/packages/theme-chalk/src/base.scss";
import './global.config.scss';
const app = createApp(App);

// 注入路由
app.use(router).use(store).use(ElButton).use(ElInput).use(ElDialog).use(ElRadio);

// 挂载实例
app.mount("#app");
