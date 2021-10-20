/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-10-18 14:22:46
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { reactive } from "vue";

enum UserRole {
  teacher = 'teacher',
  student = 'student',
  audience = 'audience',
}
interface UserInfoType {
  userName: string,
  userId: number,
  role: UserRole
}

const userInfo: UserInfoType = {
  userName: '',
  userId: 0,
  role: UserRole.teacher
};
const UserInfoState = reactive(userInfo);
export {
  UserRole,
  UserInfoType,
  UserInfoState
}
