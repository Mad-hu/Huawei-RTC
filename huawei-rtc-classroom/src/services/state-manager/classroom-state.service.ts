/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-09 17:25:55
 * @LastEditTime: 2021-09-10 15:52:21
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { reactive } from "vue";

interface UserType {
  /**
   * 用户的id
   *
   * @type {number}
   */
  userId: number;
  /**
   * 用户的昵称
   *
   * @type {string}
   */
  userName: string;
  /**
   * 用户的权限。
   * 0 主持人，只能是一个人
   * 1 联席主持人，可多人
   * 2 普通观众
   * @type {number}
   */
  power?: number;
  video?: boolean;
  audio?: boolean;
  share?: boolean;
  control?: boolean;
  isLocal?: boolean;
}
interface UserListType {
  lists: UserType[];
}

const userList: UserListType = {
  lists: []
}
const UserListState = reactive(userList);
const ShareState = reactive({
  share: false
})

const ControlUserIdState = reactive({
  userId: ''
})

const RoomNameState = reactive({
  roomName: ''
})
export {
  UserListType,
  UserType,
  UserListState,
  ShareState,
  ControlUserIdState,
  RoomNameState
}
