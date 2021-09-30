/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-10 13:57:56
 * @LastEditTime: 2021-08-13 17:13:28
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { ElLoading } from "element-plus";
import { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";

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
