/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 10:46:37
 * @LastEditTime: 2021-08-18 11:56:26
 * @LastEditors: Yandong Hu
 * @Description: 华为云RTC Electron SDK
 */

import { RTCBaseProvider, RTCEventType, RTCInitOpts, RTCLoginOpts } from "../abstract/rtc.abstract";
import { getHRTCEngine, isElectron } from "../electron.service"
import { HRTCVideoDisplayMode } from "./hrtcsdk.service.interface";
const huawei_rtc_appId = import.meta.env.VITE_HUAWEI_RTC_APPID;
const huawei_rtc_domain = import.meta.env.VITE_HUAWEI_DOMAIN;
let engine: any;
let sdkinit = false;
let userJoinId = 0;
export default class HRTCSDKElectronService extends RTCBaseProvider {


  id_random = parseInt((Math.random() * 10000).toFixed(0));

  constructor() {
    super();
    if (!isElectron()) {
      throw new Error('is not electron env, please build config by web');
    }
    engine = new (getHRTCEngine())();

    if (!engine) {
      throw new Error('native engine module is not found.');
    }
    this.sdkEvent();
  }
  init(appId?: number, opt?: RTCInitOpts): any {
    if (sdkinit) {
      console.warn('rtc is already init.');
      return ;
    }
    const id = appId || huawei_rtc_appId;
    const domain = opt && opt.domain || huawei_rtc_domain;
    engine.initialize(id, domain);
    engine.setExternalVideoFrameOutput(true, true,{format: 0,bufferType:0});
    engine.enableSmallVideoStream(true, {width: 320, height: 180, frameRate: 30, bitrate: 600, disableAdjustRes: true, streamType: 1});
    engine.setPriorRemoteVideoStreamType(1);
    // engine.setLogParam(true, {
    //   level: 3,
    //   path: process.platform === "darwin" ? "/tmp/rtcLog" : "rtclog"
    // });
    // 设置大流显示模式
    // engine.setVideoEncParam({streamType:0,width:240,height:180,frameRate:10,bitrate:600})
    sdkinit = true;
    return engine;
  }

  getUserLocalId() {
    return userJoinId;
  }

  /**
   * 加入房间
   *
   * @param {string} roomId 房间id
   * @param {number} userId 用户id
   * @param {RTCLoginOpts} [opts] 其他一些信息
   * @memberof HRTCSDKElectronService
   */
  joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void {
    userJoinId = userId + this.id_random;
    const userInfo = { 'userId': `${userId + this.id_random}`, 'userName': `${opts && opts.userName}_roletype_${opts && opts.role}`, signature: '', ctime: 0, role: 0 };
    console.log('join room:', userInfo);
    const ret = engine.joinRoom(roomId, userInfo);
    if (ret != 0) {
      throw new Error('join failed, ' + ret)
    }
  }
  /**
   * 由于rtc接口的回调采用 HRTC Electron 的回调为基准，这里直接遍历并返回即可，其他sdk，必须重新实现每一个回调并封装
   *
   * @memberof HRTCSDKElectronService
   */
  sdkEvent() {
    for (let eventType in RTCEventType) {
      engine.on(eventType, (...opts: any[]) => {
        // console.log('sdk event:', eventType, opts);
        this.emit(eventType, ...opts);
      });
    }
  }
  createLocalPreview(view: HTMLDivElement, mode: HRTCVideoDisplayMode): any {
    engine.enableLocalVideo(true);
    engine.setViewDisplayMode('', 1, false);
    const result = engine.setupLocalView(view, mode);
    if(result != 0) {
      throw new Error('rtc engine setupLocalView error.' + result);
    }
    return result;
  }
  setLocalVideo(type: boolean): void {
    engine.enableLocalVideo(type);
  }
  setLocalAudio(type: boolean): void {
    engine.enableLocalAudio(type);
  }
  setLocalPreview(type: boolean = true) {
    // engine.enableLocalVideo(type);
  }
  stopLocalPreviewAndClear(view: HTMLDivElement): number {
    const res = engine.enableLocalVideo(false);
    view.innerHTML = '';
    return res;
  }
  renderRemoteView(userId: string, view: HTMLDivElement) {
    engine.startRemoteStreamView(userId, view, 1, true);
    this.muteRemoteVideoStream(userId, false);
    this.renderRemoteVideoStreamType(userId, 1);
  }
  muteRemoteVideoStream(userId: string, mute: boolean) {
    engine.muteRemoteVideoStream(userId, mute);
  }
  renderRemoteVideoStreamType(userId: string, type: number) {
    engine.setRemoteVideoStreamType(userId, type);
  }
  leaveRoom(): number {
    return engine.leaveRoom();
  }
  setUserRole(roleType: any): number | void {
    return engine.setUserRole(roleType);
  }
}
