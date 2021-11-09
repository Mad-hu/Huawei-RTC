/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-09-30 11:41:29
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { RTMBaseProvider, rtmTextMessageCategory, RtmTextMessageCategory } from "../../../abstract/rtm.abstract";
import AgoraRTM, { RtmChannel, RtmClient, RtmEvents, RtmTextMessage } from 'agora-rtm-sdk';
import EventEmitter from "events";
export default class AgoraRTMSdkWebService extends RTMBaseProvider {
  /**
   * RTM 初始化后的对象
   */
  rtmClient!: RtmClient;
  /**
  * RTM 连接的频道
  */
  chan!: RtmChannel;
  init(appId?: any, opt?: any): void {
    EventEmitter.defaultMaxListeners = 20;
    this.rtmClient = AgoraRTM.createInstance(`${appId}`);
  }
  async login(user: any) {
    await this.rtmClient.login({ uid: `${user.userId}` });
    this.createChannel(user.channel);
    this.joinRoom();
  }

  createChannel(channel: string) {
    if (!this.rtmClient) {
      throw new Error('not find rtmClient! first please init rtm sdk!');
    };
    if (typeof (channel) != 'string') {
      throw new Error('channel is not string!');
    }
    this.chan = this.rtmClient.createChannel(channel);
  }
  async joinRoom(roomId?: string, userId?: number, opts?: any) {
    if (!this.chan) {
      throw new Error('not find chan! first please create channel!');
    };
    /* 频道监听 */
    this.messageEvent();
    await this.chan.join();
  }
  sendMsg(msg: any) {
    console.log('sendMessage:', { text: msg });
    return this.chan.sendMessage({ text: JSON.stringify(msg) });
  }
  /**
   * 离开频道
   *
   * @memberof AgoraRTMService
   */
  leaveChannel() {
    this.chan && this.chan.leave();
  }
  messageEvent() {
    console.log('messageEvent init!');
    const channelMessage: keyof RtmEvents.RtmChannelEvents = 'ChannelMessage';
    const attributesUpdated: keyof RtmEvents.RtmChannelEvents = 'AttributesUpdated';
    const memberCountUpdated: keyof RtmEvents.RtmChannelEvents = 'MemberCountUpdated';
    const memberJoined: keyof RtmEvents.RtmChannelEvents = 'MemberJoined';
    const memberLeft: keyof RtmEvents.RtmChannelEvents = 'MemberLeft';

    this.chan.on(channelMessage, (message, memberId, messagePros) => {
      console.log('channelMessage:', message, memberId, messagePros);
      const jsonData = JSON.parse((<RtmTextMessage>message).text);
      const command: keyof RtmTextMessageCategory = jsonData.command || jsonData.code;
      this.emit(command, jsonData);
    });
    this.chan.on(attributesUpdated, (attributes) => {
      console.log('attributesUpdated:', attributes);
      this.emit(rtmTextMessageCategory.ATTRIBUTES_UPDATED, attributes);
    });
    this.chan.on(memberCountUpdated, (attributes) => {
      console.log('memberCountUpdated:', attributes);
      this.emit(rtmTextMessageCategory.MEMBER_COUNT_UPDATE_CHANNEL, attributes);
    });
    this.chan.on(memberJoined, (attributes) => {
      console.log('memberJoined:', attributes);
      this.emit(rtmTextMessageCategory.JOIN_CHANNEL, attributes);
    });
    this.chan.on(memberLeft, (attributes) => {
      console.log('memberLeft:', attributes);
      this.emit(rtmTextMessageCategory.LEAVE_CHANNEL, attributes);
    });
  }
}
