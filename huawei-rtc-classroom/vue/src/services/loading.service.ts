/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-10 13:57:56
 * @LastEditTime: 2021-10-21 09:11:27
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { ElLoading, ILoadingInstance } from "element-plus";

let loading: ILoadingInstance;
const loadingShow = (msg?: string) => {
  loading = ElLoading.service({
    lock: true,
    text: msg || 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    fullscreen: true
  });
  return loading;
}

const loadingHide = () => {
  loading.close();
}

export {
  loadingShow,
  loadingHide
}
