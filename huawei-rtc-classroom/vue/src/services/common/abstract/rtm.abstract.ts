/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 14:14:38
 * @LastEditTime: 2021-09-30 11:41:14
 * @LastEditors: Yandong Hu
 * @Description: RTC模块基础代理
 */

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
POWER_CHANGE : string, // 角色转换
SHARE_SCREEN:string, // 屏幕共享
CONTROL_SCREEN:string, // 远程控制
NICKNAME_CHANGE :string, // 改昵称
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
  POWER_CHANGE : '10006', //角色转换
  SHARE_SCREEN:'10009', // 屏幕分享
  CONTROL_SCREEN : '10014', // 拒绝远程
  CONTROL_END : '10013', // 结束远程
  NICKNAME_CHANGE :'10015', // 改昵称
}
/**
 * 枚举 各种开关的枚举
 */
export enum ON_OFF {
   ON = 1,
   OFF = 0,
   AUDIO_ON_TIP= '老师已将你解除静音',
   AUDIO_OFF_TIP ='老师已将你静音',
   VIDEO_ON_TIP = '老师已开启的视频',
   VIDEO_OFF_TIP ='老师已关闭你的视频',
   FOCUS_ON_TIP= '老师已将你设为焦点',
   FOCUS_OFF_TIP = '老师已取消你的焦点'
}

export enum POWER_TYPE {
  MAIN_TEACHER = 0, // 主持人
  TEACHER = 1, // 讲师
  STUDENT = 2, // 学生
}

export enum SHARE_STATUS {
  SHAREING = 1, // 正在共享
  SHARE_AGREE = 2, // 同意贡献
  NO_SHARE_RECORD = 0, // 未曾共享过
  SHARE_END = 3, // 同意共享
  SHARE_ASK = 4, // 请求共享
  SHARE_REFUED= 5, // 拒绝共享
}

export enum CONTROL_STATUS {
  NO_CONTROL_RECORD = 0, // 未曾远程过
  CONTROL_READY = 6, // 已经同意远程，并初始化好
  CONTROL_ING = 1, // 正在
  CONTROL_AGREE = 2, // 同意远程
  CONTROL_END = 3, // 同意远程
  CONTROL_ASK = 4, // 请求远程
  CONTROL_REFUED= 5, // 拒绝远程

}

export interface RTMInitOpts {
    userId?: number,
    domain: string
}
export interface RTMLoginOpts {
    userName?: string,
    role?: string
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

    abstract sendMsg(msg: any): any;

    abstract leaveChannel(): any;
}
