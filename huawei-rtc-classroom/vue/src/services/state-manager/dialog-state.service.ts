/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-11-11 20:12:16
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { reactive } from "vue";

const dialogState = {
  /**
   * 用户列表弹窗显示状态
   */
  userListVisible: false,
  /**
   * 共享屏幕选择弹窗显示状态
   */
  shareSelectVisible: false,
  /**
   * 教室信息弹窗显示状态
   */
  classroomInfoVisible: false,
  /**
   * 设置弹窗显示状态
   */
  settingVisible: false
};
const DialogState = reactive(dialogState);
export {
  DialogState
}
