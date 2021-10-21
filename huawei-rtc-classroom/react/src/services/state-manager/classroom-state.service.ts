/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-09 17:25:55
 * @LastEditTime: 2021-10-21 11:35:41
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { atom } from "recoil";

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
const UserListState = atom({
  key: 'UserListState',
  default: userList
});

interface RemoteShareType {
  /**
   * 用户id
   */
  userId: string,
  /**
   * true表示远端开启屏幕共享，false表示远端停止屏幕共享
   */
  available: boolean
}
interface remoteScreenShareListType {
  remoteShareList: RemoteShareType[]
}
const remoteScreenShareList: remoteScreenShareListType = {
  remoteShareList: [] // 远端共享列表, 暂时只支持单人共享
}
const ScreenShareState = atom({
  key: 'screenShareState',
  default: {
    screenShareState: false
  }
});
const RemoteScreenShareListState = atom({
  key: 'remoteScreenShareListState',
  default: remoteScreenShareList
});

const ControlUserIdState = atom({
  key: 'ControlUserIdState',
  default: {
    userId: ''
  }
})

const RoomNameState = atom({
  key: 'RoomNameState',
  default: {
    roomName: ''
  }
})
export {
  UserListState,
  ScreenShareState,
  RemoteScreenShareListState,
  ControlUserIdState,
  RoomNameState,
  UserListType,
  UserType
};

