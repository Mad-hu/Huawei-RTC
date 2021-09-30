/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-09-30 11:39:25
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { RTMBaseProvider } from "../../../abstract/rtm.abstract";

export default class WangyiRTMSdkWebService extends RTMBaseProvider {
  login(user: any): void {
    throw new Error("Method not implemented.");
  }
  leaveChannel() {
    throw new Error("Method not implemented.");
  }
  init(appId?: number, opt?: any): void {
    throw new Error("Method not implemented.");
  }
  joinRoom(roomId: string, userId: number, opts?: any): void {
    throw new Error("Method not implemented.");
  }
  sendMsg(msg: any) {
    throw new Error("Method not implemented.");
  }
}
