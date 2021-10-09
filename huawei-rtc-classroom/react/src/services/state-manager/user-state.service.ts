/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-10-09 18:14:05
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { atom } from "recoil";

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
export const UserInfoState = atom({
  key: 'UserInfoState',
  default: userInfo
});
