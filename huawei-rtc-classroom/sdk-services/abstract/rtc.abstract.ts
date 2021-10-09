/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 14:14:38
 * @LastEditTime: 2021-10-09 16:17:06
 * @LastEditors: Yandong Hu
 * @Description: RTC模块基础代理
 */

import EventEmitter from "events";

/**
 * 以HRTC Electron SDK为标准，其他RTC SDK必须参考此标准将回调信息进行转化。
 *
 * @export
 * @enum {number}
 */
export enum RTCEventType {
    /**
     * rtc error
     */
    error = 'error',
    /**
     * rtc warning
     */
    warning = 'warning',
    /**
     * 远端用户加入房间/频道
     */
    userJoined = 'userJoined',
    /**
     * 加入房间/频道
     */
    joinedRoom = 'joinedRoom',
    /**
     * 离开房间/频道
     */
    leaveRoom = 'leaveRoom',
    /**
     * 离开房间/频道
     */
    userOffline = 'userOffline',
    /**
     * 本地共享后回调
     */
    screenCaptureStarted = 'screenCaptureStarted',
    /**
     * 远端开启，停止共享流后，触发此回调
     */
    userSubStreamAvailable = 'userSubStreamAvailable'
}
export interface RTCInitOpts {
    userId?: number,
    domain: any
}
export interface RTCLoginOpts {
    userName?: string,
    role?: string
}
export abstract class RTCBaseProvider extends EventEmitter {

    /**
     * 初始化RTC SDK
     *
     * @abstract
     * @param {any} [appId] RTC Appid
     * @param {RTCInitOpts} [opt] other options
     * @memberof RTCBaseDelegate
     */
    abstract init(appId?: any, opt?: RTCInitOpts): void;

    /**
     * 加入房间/频道
     *
     * @abstract
     * @param {string} roomId 房间id
     * @param {number} userId 用户id
     * @param {RTCLoginOpts} [opts] other options
     * @memberof RTCBaseDelegate
     */
    abstract joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void;

    /**
     * 离开房间/频道
     *
     * @abstract
     * @return {*}  {number}
     * @memberof RTCBaseProvider
     */
    abstract leaveRoom(): number;


    /**
     * 设置用户角色
     *
     * @abstract
     * @param {*} roleType
     * @return {*}  {(number | void)}
     * @memberof RTCBaseProvider
     */
    abstract setUserRole(roleType: any): number | void;

    /**
     * 本地视频预览
     *
     * @abstract
     * @param {HTMLDivElement} view 本地预览挂载位置
     * @param {number} [mode] 预览视频模式
     * @return {*}  {*}
     * @memberof RTCBaseDelegate
     */
    abstract createLocalPreview(view: HTMLDivElement, mode?: number): any;

    /**
     * sdk 的所有监听，必须由此方法重新组装，最终方法名必须符合 RTCEventType
     *
     * @abstract
     * @memberof RTCBaseProvider
     */
    abstract sdkEvent(): void;

    /**
     * 获取用户RTC加入房间的id，id不采用用户原有id，是通过原有id再进行加工得到。保证重复用户，也能够正常进入房间。
     *
     * @abstract
     * @return {*}  {number}
     * @memberof RTCBaseProvider
     */
    abstract getUserLocalId(): number;
    abstract muteRemoteVideoStream(userId: string, mute: boolean): void;
    renderRemoteView(userId: string, view: HTMLDivElement) {
      throw new Error("Method not implemented.");
    }
    abstract renderRemoteVideoStreamType(userId: string, type: number): void;
    abstract setLocalPreview(type: boolean): void;
    abstract stopLocalPreviewAndClear(view: HTMLDivElement): number;

    abstract setLocalVideo(type: boolean): void;
    abstract setLocalAudio(type: boolean): void;

    /**
     * 获取屏幕可共享对象列表
     *
     * @abstract
     * @return {*}  {*}
     * @memberof RTCBaseProvider
     */
     abstract getScreenSources(): any;

     /**
      * 选择屏幕共享对象
      *
      * @abstract
      * @return {*}  {number}
      * @memberof RTCBaseProvider
      */
     abstract selectScreenShare(item: any): number;
     /**
      * 开始共享自己的屏幕
      *
      * @abstract
      * @return {*}  {number}
      * @memberof RTCBaseProvider
      */
     abstract startScreenShare(): number;
     /**
      * 停止共享自己的屏幕
      *
      * @abstract
      * @return {*}  {number}
      * @memberof RTCBaseProvider
      */
     abstract stopScreenShare(): number;

     /**
      * 使用Html Element渲染远端屏幕共享
      *
      * @abstract
      * @return {*}  {number}
      * @memberof RTCBaseProvider
      */
     abstract startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number;

     /**
      * 使用窗口句柄渲染远端屏幕共享
      *
      * @abstract
      * @param {string} userId 用户id
      * @param {number} view 窗口句柄
      * @return {*}  {number}
      * @memberof RTCBaseProvider
      */
     abstract startRenderRemoteScreenShareByElement(userId: string, view: number): number;

     /**
      * 停止渲染远端屏幕共享
      *
      * @abstract
      * @return {*}  {number}
      * @memberof RTCBaseProvider
      */
     abstract stopRenderRemoteScreenShare(userId: string): number;
}
