/// <reference types="node" />
import EventEmitter from "events";
export interface RtmTextMessageCategory {
    /**
     * ready shanre screen
     **/
    READY_SHARE_SCREEN: string;
    /**
     * start shanre screen
     **/
    START_SHARE_SCREEN: string;
    /**
     * stop share screen
     **/
    STOP_SHARE_SCREEN: string;
    /**
     * leave channel
     **/
    LEAVE_CHANNEL: string;
    /**
     * join channel
     **/
    JOIN_CHANNEL: string;
    /**
     * member count update channel
     **/
    MEMBER_COUNT_UPDATE_CHANNEL: string;
    /**
     * attributesUpdated
     **/
    ATTRIBUTES_UPDATED: string;
    /**
     * 远程控制-通知远端开始控制
     */
    CONTROL_START: string;
    /**
     * 远程控制-通知远端停止控制
     */
    CONTROL_END: string;
    /**
     * 远程控制-通知控制端,被控端已经准备完成,可以控制
     */
    CONTROL_READY: string;
    /**
     * 通知所有人停止订阅远端id视频流
     */
    MUTE_VIDEO: string;
    /**
     * 通知所有人停止订阅远端id音频流
     */
    MUTE_AUDIO: string;
}
export declare const rtmTextMessageCategory: RtmTextMessageCategory;
export interface RTMInitOpts {
    userId?: number;
    domain: string;
}
export interface RTMLoginOpts {
    userName?: string;
    role?: string;
}
export declare abstract class RTMBaseProvider extends EventEmitter {
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
