/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-10 13:12:01
 * @LastEditTime: 2021-09-10 13:53:52
 * @LastEditors: Yandong Hu
 * @Description:
 */
/**
 * @Author: Yupeng Zhang
 * @Description:
 * @Date: 2021-08-04
 */
import { createStore } from "vuex";
import userModule from "./user";
const store: any = createStore({
  state() {
    return {};
  },
  modules: {
    user: userModule,
  },
});

export default store;
