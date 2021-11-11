/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 14:14:38
 * @LastEditTime: 2021-11-11 20:52:02
 * @LastEditors: Yandong Hu
 * @Description: RTC模块基础代理
 */

import { RtmMessage } from "agora-rtm-sdk";
import exp from "constants";
import EventEmitter from "events";

export interface RtmTextMessageCategory {
  /**
   * ready shanre screen
   **/
  READY_SHARE_SCREEN: string,
  /**
   * start shanre screen
   **/
  START_SHARE_SCREEN: string,
  /**
   * stop share screen
   **/
  STOP_SHARE_SCREEN: string,
  /**
   * leave channel
   **/
  LEAVE_CHANNEL: string,
  /**
   * join channel
   **/
  JOIN_CHANNEL: string,
  /**
   * member count update channel
   **/
  MEMBER_COUNT_UPDATE_CHANNEL: string
  /**
   * attributesUpdated
   **/
  ATTRIBUTES_UPDATED: string,
  /**
   * 远程控制-通知远端开始控制
   */
  CONTROL_START: string,
  /**
   * 远程控制-通知远端停止控制
   */
  CONTROL_END: string,
  /**
   * 远程控制-通知控制端,被控端已经准备完成,可以控制
   */
  CONTROL_READY: string,
  /**
   * 通知所有人停止订阅远端id视频流
   */
  MUTE_VIDEO: string,
  MUTE_AUDIO: string,
  MUTE_FOCUS: string,
  POWER_CHANGE: string, // 角色转换
  SHARE_SCREEN: string, // 屏幕共享
  CONTROL_SCREEN: string, // 远程控制
  NICKNAME_CHANGE: string, // 改昵称
  /**
   * 点对点消息-带历史记录
   *
   * @type {string}
   * @memberof RtmTextMessageCategory
   */
  MESSAGE_FROM_PEER: string
}
export const rtmTextMessageCategory: RtmTextMessageCategory = {
  READY_SHARE_SCREEN: 'READY_SHARE_SCREEN',
  START_SHARE_SCREEN: 'START_SHARE_SCREEN',
  STOP_SHARE_SCREEN: 'STOP_SHARE_SCREEN',
  LEAVE_CHANNEL: 'LEAVE_CHANNEL',
  JOIN_CHANNEL: 'JOIN_CHANNEL',
  MEMBER_COUNT_UPDATE_CHANNEL: 'MEMBER_COUNT_UPDATE_CHANNEL',
  ATTRIBUTES_UPDATED: 'ATTRIBUTES_UPDATED',
  CONTROL_START: 'CONTROL_START',
  CONTROL_READY: 'CONTROL_READY',
  MUTE_VIDEO: '10002',
  MUTE_AUDIO: '10000',
  MUTE_FOCUS: '10004',
  POWER_CHANGE: '10006', //角色转换
  SHARE_SCREEN: '10009', // 屏幕分享
  CONTROL_SCREEN: '10014', // 拒绝远程
  CONTROL_END: '10013', // 结束远程
  NICKNAME_CHANGE: '10015', // 改昵称
  MESSAGE_FROM_PEER: 'MESSAGE_FROM_PEER'
}
/**
 * 枚举 各种开关的枚举
 */
export enum ON_OFF {
  ON = 1,
  OFF = 0,
  AUDIO_ON_TIP = '老师已将你解除静音',
  AUDIO_OFF_TIP = '老师已将你静音',
  VIDEO_ON_TIP = '老师已开启的视频',
  VIDEO_OFF_TIP = '老师已关闭你的视频',
  FOCUS_ON_TIP = '老师已将你设为焦点',
  FOCUS_OFF_TIP = '老师已取消你的焦点',
   NO_ALLOW_AUDIO_TIP ='老师已开启全体静音,无法解除',
}

export enum POWER_TYPE {
  /**
   * 主持人
   */
  MAIN_TEACHER = 0,
  /**
   * 讲师
   */
  TEACHER = 1,
  /**
   * 学生
   */
  STUDENT = 2,
}

export enum SHARE_STATUS {
  /**
   * 正在共享
   */
  SHAREING = 1,
  /**
   * 同意共享
   */
  SHARE_AGREE = 2,
  /**
   * 未曾共享过
   */
  NO_SHARE_RECORD = 0,
  /**
   * 同意共享
   */
  SHARE_END = 3,
  /**
   * 请求共享
   */
  SHARE_ASK = 4,
  /**
   * 拒绝共享
   */
  SHARE_REFUED = 5,
}

export enum CONTROL_STATUS {
  /**
   * 未曾远程过
   */
  NO_CONTROL_RECORD = 0,
  /**
   * 已经同意远程，并初始化好
   */
  CONTROL_READY = 6,
  /**
   * 正在远程
   */
  CONTROL_ING = 1,
  /**
   * 同意远程
   */
  CONTROL_AGREE = 2,
  /**
   * 同意远程
   */
  CONTROL_END = 3,
  /**
   * 请求远程
   */
  CONTROL_ASK = 4,
  /**
   * 拒绝远程
   */
  CONTROL_REFUED = 5,

}

export interface RTMInitOpts {
  userId?: number,
  domain: string
}
export interface RTMLoginOpts {
  userName?: string,
  role?: string
}
export interface PeersOnlineStatusResult {
  [peerId: string]: boolean;
}
export interface AttributesMap {

  /** @zh-cn
  * 属性名和属性值，以键值对形式表示。单个属性值的长度不得超过 8 KB。单个属性名长度不得超过 32 字节。
  */
  [key: string]: string;
}
/**
 * An interface for setting and getting channel attribute options.
 */
export interface ChannelAttributeOptions {
  /** @zh-cn
   * 是否通知所有频道成员本次频道属性变更。该标志位仅对本次 API 调用有效：
   *
   * - `true`: 通知所有频道成员本次频道属性变更。
   * - `false`: (默认) 不通知所有频道成员本次频道属性变更。
   */
  enableNotificationToChannelMembers?: boolean;
}
/** @zh-cn
 * 管理频道属性。
 */
/**
 * Manages channel attributes.
 */
export interface ChannelAttributeProperties {
  /** @zh-cn
   * 频道属性的属性值。长度不得超过 8 KB。
   */
  /**
   * The value of the channel attribute. Must not exceed 8 KB in length.
   */
  value: string;

  /** @zh-cn
   * 最近一次更新频道属性用户的 ID。
   */
  /**
   * User ID of the user who makes the latest update to the channel attribute.
   */
  lastUpdateUserId: string;

  /** @zh-cn
   * 频道属性最近一次更新的时间戳（毫秒）。
   */
  /**
   * Timestamp of when the channel attribute was last updated in milliseconds.
   */
  lastUpdateTs: number;
}
/** @zh-cn
 * 定义频道属性。
 */
export interface ChannelAttributes {
  /** @zh-cn
   * 频道属性名和频道属性健值对。
   */
  [key: string]: ChannelAttributeProperties;
}
/** @zh-cn
 * 消息发送选项接口。
 */
export interface SendMessageOptions {
  /** @zh-cn
   * 是否设置为离线消息（仅适用于点对点消息）。
   *
   * - `true`: 将该消息设为离线消息。
   * - `false`: （默认）不将该消息设为离线消息。
   */
  enableOfflineMessaging?: boolean;
  /** @zh-cn
   * <b>Private Beta</b> 是否保存为历史消息。
   *
   * - `true`: 将该消息保存为历史消息。
   * - `false`: （默认）不将该消息保存为历史消息。
   */
  enableHistoricalMessaging?: boolean;
}
/** @zh-cn
 * 用于表示点对点消息发送结果的接口。
 */
export interface PeerMessageSendResult {
  /** @zh-cn
   * 该布尔值属性代表消息接收方是否已收到发出的消息。
   *
   * - `true`: 点对点消息发送成功，对方已收到；
   * - `false`: 对方不在线，未收到该消息。
   *
   */
  hasPeerReceived: boolean;
}

/** @zh-cn
 * 用于管理已接收消息属性的接口。
 */
export interface ReceivedMessageProperties {
  /** @zh-cn
   * 消息服务器接收到消息的时间戳，单位为毫秒。
   *
   * <p><b>Note</b></p>
   *
   * <li> 你不能设置时间戳，但是你可以从该时间戳推断出消息的<i>大致</i>发送时间。</li>
   * <li> 时间戳的精度为毫秒。仅用于展示，不建议用于消息的严格排序。</li>
   */
  serverReceivedTs: number;
  /** @zh-cn
   * 供消息接收者检查消息是否在服务端被缓存过（仅适用于点对点消息）。
   *
   * <p><b>Note</b></p>
   * 如果消息没有被消息服务器缓存过，该方法将返回 NO。也就是说：只有当消息发送者将 {@link enableOfflineMessaging} 设为 true，发送离线消息且在发送离线消息时对端不在线，对端重新上线后调用该方法会返回 `true` 。
   *
   * - `true`: 被缓存过（消息服务器缓存了该条消息且在对端重新上线后重新发送成功）。
   * - `false`: 未被缓存过。
   */
  isOfflineMessage: boolean;
}

export abstract class RTMBaseProvider extends EventEmitter {

  /**
   * 初始化RTC SDK
   *
   * @abstract
   * @param {any} [appId] RTC Appid
   * @param {RTCInitOpts} [opt] other options
   * @memberof RTCBaseDelegate
   */
  abstract init(appId?: any, opt?: RTMInitOpts): void;
  abstract login(user: any): void;

  /**
   * 加入房间
   *
   * @abstract
   * @param {string} roomId 房间id
   * @param {number} userId 用户id
   * @param {RTCLoginOpts} [opts] other options
   * @memberof RTCBaseDelegate
   */
  abstract joinRoom(roomId: string, userId: number, opts?: RTMLoginOpts): void;

  /**
   * 发送消息给全体
   *
   * @abstract
   * @param {*} msg
   * @return {*}  {*}
   * @memberof RTMBaseProvider
   */
  abstract sendMsg(msg: any): any;

  /**
   * 本地用户（发送者）向指定用户（接收者）发送点对点消息或点对点的离线消息。

   发送消息（包括点对点消息和频道消息）的频率上限为 180 次每 3 秒
   *
   * @abstract
   * @param {*} msg 消息
   * @param {string} peerId
   * @param {SendMessageOptions} [options]
   * @return {*}  {Promise<PeerMessageSendResult>}
   * @memberof RTMBaseProvider
   */
  abstract sendMsgToPeer(msg: any, peerId: string, options?: SendMessageOptions): Promise<PeerMessageSendResult>;

  /**
   * 离开频道
   *
   * @abstract
   * @return {*}  {*}
   * @memberof RTMBaseProvider
   */
  abstract leaveChannel(): any;
  /**
   * 查询指定用户的在线状态。
   *
   * @param {string[]} peerIds 用户 ID 列表。用户 ID 的数量不能超过 256。
   * @memberof AgoraRTMSdkWebService
   */
  abstract queryPeersOnlineStatus(peerIds: string[]): Promise<PeersOnlineStatusResult>;

  /*** 用户属性增删改查 ******/

  /**
   * 全量设置本地用户的属性。
   *
   * @abstract
   * @param {AttributesMap} attributes 新的属性。
   * @return {*}  {Promise<void>} 该 Promise 会在设置本地用户属性成功后 resolve。
   * @memberof RTMBaseProvider
   */
  abstract setLocalUserAttributes(attributes: AttributesMap): Promise<void>;

  /**
   * 添加或更新本地用户的属性。

      如果属性已存在，该方法更新本地用户的已有属性；
      如果属性不存在，该方法增加本地用户的属性。
   *
   * @abstract
   * @param {AttributesMap} attributes 待增加或更新的属性列表。
   * @return {*}  {Promise<void>} 该 Promise 会在添加或更新本地用户属性成功后 resolve。
   * @memberof RTMBaseProvider
   */
  abstract addOrUpdateLocalUserAttributes(attributes: AttributesMap): Promise<void>;

  /**
   * 删除本地用户的指定属性。
   *
   * @abstract
   * @param {string[]} attributeKeys 属性名列表。
   * @return {*}  {Promise<void>} 该 Promise 会在删除指定属性成功后 resolve。
   * @memberof RTMBaseProvider
   */
  abstract deleteLocalUserAttributesByKeys(attributeKeys: string[]): Promise<void>;
  /**
   * 清空本地用户的所有属性
   *
   * @abstract
   * @return {*}  {Promise<void>} 该 Promise 会在清空本地用户属性成功后 resolve
   * @memberof RTMBaseProvider
   */
  abstract clearLocalUserAttributes(): Promise<void>;

  /**
   * 获取指定用户的全部属性。
   *
   * @abstract
   * @param {string} userId 指定用户的用户 ID。
   * @return {*}  {Promise<AttributesMap>}
   * @memberof RTMBaseProvider
   */
  abstract getUserAttributes(userId: string): Promise<AttributesMap>;
  /**
   * 获取指定用户指定属性名的属性。
   *
   * @abstract
   * @param {string} userId 指定用户的用户 ID。
   * @param {string[]} attributeKeys 属性名列表。
   * @return {*}  {Promise<AttributesMap>}
   * @memberof RTMBaseProvider
   */
  abstract getUserAttributesByKeys(userId: string, attributeKeys: string[]): Promise<AttributesMap>;

  /** 频道属性增删改查  **/
  /**
   * 全量设置某指定频道的属性。
   * Note

 - 你无需加入指定频道即可为该频道设置频道属性。
 - 当某频道处于空频道状态（无人状态）数分钟后，该频道的频道属性将被清空。
 - setLocalUserAttributes、 addOrUpdateChannelAttributes、 deleteChannelAttributesByKeys ，和 clearChannelAttributes 一并计算在内：调用频率限制为每 5 秒 10 次。
   *
   * @abstract
   * @param {string} channelId 该指定频道的频道 ID。
   * @param {AttributesMap} attributes 频道属性列表实例。
   * @param {ChannelAttributeOptions} [options] 频道属性操作选项。
   * @return {*}  {Promise<void>}
   * @memberof RTMBaseProvider
   */
  abstract setChannelAttributes(channelId: string, attributes: AttributesMap, options?: ChannelAttributeOptions): Promise<void>;

  /**
   * 添加或更新某指定频道的属性。

 - 如果属性已存在，该方法更新该频道的已有属性；
 - 如果属性不存在，该方法增加该频道的属性。
 -- Note

 - 你无需加入指定频道即可为该频道更新频道属性。
 - 当某频道处于空频道状态（无人状态）数分钟后，该频道的频道属性将被清空。
 - setLocalUserAttributes、 addOrUpdateChannelAttributes、 deleteChannelAttributesByKeys ，和 clearChannelAttributes 一并计算在内：调用频率限制为每 5 秒 10 次。
   *
   * @abstract
   * @param {string} channelId 该指定频道的 ID
   * @param {AttributesMap} attributes 待增加或更新的属性列表
   * @param {ChannelAttributeOptions} [options] 频道属性操作选项。详见 ChannelAttributeOptions
   * @return {*}  {Promise<void>}
   * @memberof RTMBaseProvider
   */
  abstract addOrUpdateChannelAttributes(channelId: string, attributes: AttributesMap, options?: ChannelAttributeOptions): Promise<void>;

  /**
   * 删除某指定频道的指定属性。
   *
   * Note

 - 你无需加入指定频道即可删除该频道的属性。
 - 当某频道处于空频道状态（无人状态）数分钟后，该频道的频道属性将被清空。
 - setLocalUserAttributes、 addOrUpdateChannelAttributes、 deleteChannelAttributesByKeys 和 clearChannelAttributes 一并计算在内：调用频率限制为每 5 秒 10 次。
   *
   * @abstract
   * @param {string} channelId 该指定频道的 ID
   * @param {string[]} attributeKeys 属性名列表
   * @param {ChannelAttributeOptions} [options] 频道属性操作选项。详见 ChannelAttributeOptions
   * @return {*}  {Promise<void>}
   * @memberof RTMBaseProvider
   */
  abstract deleteChannelAttributesByKeys(channelId: string, attributeKeys: string[], options?: ChannelAttributeOptions): Promise<void>;

  /**
   * 清空某指定频道的属性
   *
   * Note

 - 你无需加入指定频道即可清空该频道的属性。
 - RtmClient.setChannelAttributes()、 addOrUpdateChannelAttributes、 deleteChannelAttributesByKeys 和 clearChannelAttributes 一并计算在内：调用频率限制为每 5 秒 10 次。
   *
   * @abstract
   * @param {string} channelId 该指定频道的频道 ID
   * @param {ChannelAttributeOptions} [options] 频道属性操作选项。详见 ChannelAttributeOptions
   * @return {*}  {Promise<void>}
   * @memberof RTMBaseProvider
   */
  abstract clearChannelAttributes(channelId: string, options?: ChannelAttributeOptions): Promise<void>;

  /**
   * 查询某指定频道的全部属性
   * Note

  - 你无需加入指定频道即可查询该频道的属性。
  - getChannelAttributes 和 getChannelAttributesByKeys 一并计算在内：调用频率限制为每 5 秒 10 次。
   *
   * @abstract
   * @param {string} channelId 该指定频道的 ID
   * @return {*}  {Promise<ChannelAttributes>}
   * @memberof RTMBaseProvider
   */
  abstract getChannelAttributes(channelId: string): Promise<ChannelAttributes>;

  /**
   * 查询某指定频道指定属性名的属性
   * Note

  - 你无需加入指定频道即可查询该频道的属性。
  - getChannelAttributes 和 getChannelAttributesByKeys 一并计算在内：调用频率限制为每 5 秒 10 次。
   *
   * @abstract
   * @param {string} channelId
   * @param {string[]} keys
   * @return {*}  {Promise<ChannelAttributes>}
   * @memberof RTMBaseProvider
   */
  abstract getChannelAttributesByKeys(channelId: string, keys: string[]): Promise<ChannelAttributes>;

  /**
   * 获取频道用户列表
   *
   * @abstract
   * @return {*}  {Promise<string[]>} 该 Promise 会在成功获取频道用户列表后 resolve。Promise 返回的值为该频道所有用户 ID 的数组。
   * @memberof RTMBaseProvider
   */
  abstract getMembers(): Promise<string[]>;
}
