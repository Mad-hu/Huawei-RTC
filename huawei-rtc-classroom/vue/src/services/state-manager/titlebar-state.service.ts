/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-11-09 09:52:10
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { reactive } from "vue";

const titleBarState = {
  /**
   * 是否显示标题栏
   */
  visible: true,
  /**
   * 标题栏默认文字
   */
  text: '',
  /**
   * 是否显示最小化按钮
   */
  minBtnVisible: true,
  /**
   * 是否显示最大化按钮
   */
  maxBtnVisible: true,
  /**
   * 是否显示还原按钮
   */
  restoreBtnVisible: true,
};
const TitleBarState = reactive(titleBarState);
export {
  TitleBarState
}
