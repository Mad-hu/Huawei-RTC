/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-11-10 16:53:06
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { AttributesMap, ChannelAttributeOptions, ChannelAttributes, PeerMessageSendResult, ReceivedMessageProperties, RTMBaseProvider, rtmTextMessageCategory, RtmTextMessageCategory, SendMessageOptions } from "../../../abstract/rtm.abstract";
import AgoraRTM, { RtmChannel, RtmClient, RtmEvents, RtmMessage, RtmTextMessage } from 'agora-rtm-sdk';
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
    const messageFromPeer: keyof RtmEvents.RtmClientEvents = 'MessageFromPeer';
    this.rtmClient.on(messageFromPeer, (message: RtmMessage, peerId: string, messageProps: ReceivedMessageProperties) => {
      const jsonData = JSON.parse((<RtmTextMessage>message).text);
      console.log('messageFromPeer:', jsonData);
      this.emit(rtmTextMessageCategory.MESSAGE_FROM_PEER, jsonData, peerId, messageProps);
    });
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

  queryPeersOnlineStatus(peerIds: string[]) {
    return this.rtmClient.queryPeersOnlineStatus(peerIds);
  }
  sendMsgToPeer(msg: any, peerId: string, options?: SendMessageOptions): Promise<PeerMessageSendResult> {
    return this.rtmClient.sendMessageToPeer({ text: JSON.stringify(msg) }, peerId, options);
  }
  setLocalUserAttributes(attributes: AttributesMap): Promise<void> {
    return this.rtmClient.setLocalUserAttributes(attributes);
  }
  addOrUpdateLocalUserAttributes(attributes: AttributesMap): Promise<void> {
    return this.rtmClient.addOrUpdateLocalUserAttributes(attributes);
  }
  deleteLocalUserAttributesByKeys(attributeKeys: string[]): Promise<void> {
    return this.rtmClient.deleteLocalUserAttributesByKeys(attributeKeys);
  }
  clearLocalUserAttributes(): Promise<void> {
    return this.rtmClient.clearLocalUserAttributes();
  }
  getUserAttributes(userId: string): Promise<AttributesMap> {
    return this.rtmClient.getUserAttributes(userId);
  }
  getUserAttributesByKeys(userId: string, attributeKeys: string[]): Promise<AttributesMap> {
    return this.rtmClient.getUserAttributesByKeys(userId, attributeKeys);
  }
  setChannelAttributes(channelId: string, attributes: AttributesMap, options?: ChannelAttributeOptions): Promise<void> {
    return this.rtmClient.setChannelAttributes(channelId, attributes, options);
  }
  addOrUpdateChannelAttributes(channelId: string, attributes: AttributesMap, options?: ChannelAttributeOptions): Promise<void> {
    return this.rtmClient.addOrUpdateChannelAttributes(channelId, attributes, options);
  }
  deleteChannelAttributesByKeys(channelId: string, attributeKeys: string[], options?: ChannelAttributeOptions): Promise<void> {
    return this.rtmClient.deleteChannelAttributesByKeys(channelId, attributeKeys, options);
  }
  clearChannelAttributes(channelId: string, options?: ChannelAttributeOptions): Promise<void> {
    return this.rtmClient.clearChannelAttributes(channelId, options);
  }
  getChannelAttributes(channelId: string): Promise<ChannelAttributes> {
    return this.rtmClient.getChannelAttributes(channelId);
  }
  getChannelAttributesByKeys(channelId: string, keys: string[]): Promise<ChannelAttributes> {
    return this.rtmClient.getChannelAttributesByKeys(channelId, keys);
  }
  getMembers(): Promise<string[]> {
    return this.chan.getMembers();
  }
}
