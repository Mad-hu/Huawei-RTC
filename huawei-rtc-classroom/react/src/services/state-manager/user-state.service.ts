/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-10-20 14:42:41
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { atom } from "recoil";

enum UserRole {
  teacher = 'teacher',
  student = 'student',
  audience = 'audience',
}
interface UserInfoType {
  userName: string,
  userId: number,
  role: string
}
const userInfo: UserInfoType = {
  userName: '',
  userId: 0,
  role: ''
};
const UserInfoState = atom({
  key: 'UserInfoState',
  default: userInfo
});
export {
  UserRole, 
  UserInfoState
};
export type { 
  UserInfoType 
};

