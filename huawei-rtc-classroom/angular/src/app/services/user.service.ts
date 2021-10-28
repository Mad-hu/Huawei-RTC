/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-26 10:31:01
 * @LastEditTime: 2021-10-26 14:22:27
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Injectable } from '@angular/core';

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
interface ShareStateValueType {
  screenShareState: boolean,
  remoteShareList: RemoteShareType[]
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  shareStateValue: ShareStateValueType = {
    screenShareState: false, // 本地是否有屏幕共享
    remoteShareList: [] // 远端共享列表, 暂时只支持单人共享
  }
  ControlUserIdState = {
    userId: ''
  }
  userList: UserListType = {
    lists: []
  }
  constructor(
  ) {
  }
}
