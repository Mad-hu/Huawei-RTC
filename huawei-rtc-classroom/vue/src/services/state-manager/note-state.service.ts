/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-11-11 20:12:16
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { reactive } from "vue";

const noteState = {
  /**
   * 显示状态
   */
  visible: false,

};
const NoteState = reactive(noteState);
export {
  NoteState
}
