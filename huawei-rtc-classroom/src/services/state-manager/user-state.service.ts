/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-09-13 17:37:09
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { reactive } from "vue";

interface UserInfo {
  userName: string,
  userId: number,
  role: string
}
const userInfo: UserInfo = {
  userName: '',
  userId: 0,
  role: ''
};
export const UserInfoState = reactive(userInfo);
