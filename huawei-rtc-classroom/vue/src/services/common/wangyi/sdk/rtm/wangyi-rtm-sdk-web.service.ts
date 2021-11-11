/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-11-10 16:53:12
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { NIM_Web_NIM } from "@huyandong/netease-nim-web-sdk";
import { Subject } from "rxjs";
import { AttributesMap, ChannelAttributeOptions, ChannelAttributes, PeerMessageSendResult, PeersOnlineStatusResult, RTMBaseProvider, rtmTextMessageCategory, RtmTextMessageCategory, SendMessageOptions } from "../../../abstract/rtm.abstract";

enum WangYiRTMListensTypes {
  onconnect = 'onconnect',
  onwillreconnect = 'onwillreconnect',
  ondisconnect = 'ondisconnect',
  onerror = 'onerror'
}
export default class WangyiRTMSdkWebService extends RTMBaseProvider {
  getMembers(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  sendMsgToPeer(msg: any, peerId: string, options?: SendMessageOptions): Promise<PeerMessageSendResult> {
    throw new Error("Method not implemented.");
  }
  queryPeersOnlineStatus(peerIds: string[]): Promise<PeersOnlineStatusResult> {
    throw new Error("Method not implemented.");
  }
  setLocalUserAttributes(attributes: AttributesMap): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addOrUpdateLocalUserAttributes(attributes: AttributesMap): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteLocalUserAttributesByKeys(attributeKeys: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clearLocalUserAttributes(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserAttributes(userId: string): Promise<AttributesMap> {
    throw new Error("Method not implemented.");
  }
  getUserAttributesByKeys(userId: string, attributeKeys: string[]): Promise<AttributesMap> {
    throw new Error("Method not implemented.");
  }
  setChannelAttributes(channelId: string, attributes: AttributesMap, options?: ChannelAttributeOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addOrUpdateChannelAttributes(channelId: string, attributes: AttributesMap, options?: ChannelAttributeOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteChannelAttributesByKeys(channelId: string, attributeKeys: string[], options?: ChannelAttributeOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clearChannelAttributes(channelId: string, options?: ChannelAttributeOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getChannelAttributes(channelId: string): Promise<ChannelAttributes> {
    throw new Error("Method not implemented.");
  }
  getChannelAttributesByKeys(channelId: string, keys: string[]): Promise<ChannelAttributes> {
    throw new Error("Method not implemented.");
  }
  /**
   * RTM 初始化后的对象
   */
  rtmClient: any;
  /**
  * RTM 连接的频道ID
  */
  channelId: string = '';
  init(appId?: any, opt?: any) {
    const subject = new Subject<any>();
    console.log('开始 网易rtm');
    this.rtmClient = NIM_Web_NIM.getInstance({
      appKey: appId, // 在开发者管理控制台创建的应用的appKey
      account: opt.account,        // IM帐号名称
      token: opt.token,        // 登录IM所需的token
      onconnect: () => {
        console.log('onconnect!!!');
        this.emit(WangYiRTMListensTypes.onconnect, {});
        subject.next('success');
        subject.complete();
      },
      onwillreconnect: (obj: any) => {
        console.log('onwillreconnect:', obj);
        this.emit(WangYiRTMListensTypes.onwillreconnect, obj)
      },
      ondisconnect: (error: any) => {
        console.log('ondisconnect:', error);
        this.emit(WangYiRTMListensTypes.ondisconnect, error)
      },
      onerror: (error: any) => {
        console.log('onerror:', error);
        subject.error(error);
        subject.complete();
        this.emit(WangYiRTMListensTypes.onerror, error)
      },
    });
    return subject.asObservable();
  }
  async login(user: any) {
    const channelName = `${user.channel}`;
    const param = {
      type: 1,
      channelName: channelName,
      ext: ''
    }
    console.log('rtm login: ', user);
    const channelInfo = await this.getChannelInfo(channelName);
    this.channelId = channelInfo.channelId;
    console.log('rtm get channelInfo:', channelInfo);
    if (!channelInfo.channelCreateTime) {
      const data = await this.rtmClient.signalingCreate(param);
      console.log('rtm signalingCreate channelInfo:', data);
      this.channelId = data.channelId;
    }
    this.messageEvent();
    console.log('start join room:', this.channelId, user.userId);
    await this.joinRoom(this.channelId, user.userId);
  }

  async getChannelInfo(channelName: string) {
    // 被叫接受的通知
    const data = await this.rtmClient.signalingGetChannelInfo({
      channelName: channelName
    });
    return data;
  }
  leaveChannel() {
    var param = {
      channelId: this.channelId,
      offlineEnabled: true,
      attachExt: ''
    }
    this.rtmClient.signalingLeave(param);
  }

  async joinRoom(roomId: string, userId: number, opts?: any) {
    var param = {
      channelId: roomId,
      offlineEnabled: false,
      attachExt: '',
      uid: userId
    }
    try {
      await this.rtmClient.signalingJoin(param);
    } catch (error) {
      console.log('join room error:', error);
    }

  }
  sendMsg(msg: any) {
    var param = {
      channelId: this.channelId,
      account: '',
      attachExt: JSON.stringify(msg)
    }
    return this.rtmClient.signalingControl(param);
  }

  messageEvent() {
    this.rtmClient.on('signalingNotify', (event: any) => {
      console.log("signalingOnlineNotify: ", event)
      switch (event.eventType) {
        case 'LEAVE':
          /* 该事件的通知内容
            event.eventType 事件类型
            event.channelName 频道名称
            event.channelId 频道ID
            event.channelCreateTime 频道创建时间
            event.channelExpireTime 频道过期时间
            event.creator 频道创建者
            event.from 操作者
            event.to 接收者
            evnet.ext 操作者附加的自定义信息，透传给你
            event.time 操作的时间戳
          */
          console.log("独立呼叫信令：离开频道事件");
          this.emit(rtmTextMessageCategory.LEAVE_CHANNEL, {userId: event.from, exit: false});
          break;
        case 'CONTROL':
          const jsonData = JSON.parse(event.attachExt.text);
          const command: keyof RtmTextMessageCategory = jsonData.command;
          this.emit(command, jsonData);
          break;
      }
    });
  }

  destroy() {
    this.rtmClient.destroy({
      done: (err: any) => {
        console.log('实例已被完全清除')
      }
    })
  }
}
