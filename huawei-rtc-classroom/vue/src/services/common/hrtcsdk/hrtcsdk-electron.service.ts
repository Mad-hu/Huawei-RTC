/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 10:46:37
 * @LastEditTime: 2021-11-11 09:14:44
 * @LastEditors: Yandong Hu
 * @Description: 华为云RTC Electron SDK
 */

import { getUserByKeyStatus } from "../../classroom.service";
import { RTCDisplayMode, RTCBaseProvider, RTCDeviceInfo, RTCEventType, RTCInitOpts, RTCLoginOpts, RTCRemoteAudioMode, RTCVideoEncParam, RTCVideoStreamType, RTCVideoMirrorType, HRTCNetworkTestConfig } from "../abstract/rtc.abstract";
import { ON_OFF } from "../abstract/rtm.abstract";
import { getHRTCEngine, isElectron } from "../electron.service"

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
  init(appId?: any, opt?: RTCInitOpts): any {
    if (sdkinit) {
      console.warn('rtc is already init.');
      return;
    }
    const id = appId;
    const domain = opt!.domain;
    engine.setLogParam(false, {
      level: 3,
      path: process.platform === "darwin" ? "/tmp/rtcLog" : "rtclog"
    });
    console.log('hrtc verison: ', engine.getVersion());
    engine.initialize(id, domain);
    this.enableSmallVideoStream(true, { width: 320, height: 180, frameRate: 30, bitrate: 600, disableAdjustRes: true, streamType: 1 });
    this.setPriorRemoteVideoStreamType(1);
    // 设置大流显示模式
    this.setVideoEncParam({ streamType: 3, width: 800, height: 500, frameRate: 15, bitrate: 500, disableAdjustRes: false });


    engine.setExternalDataFrameOutput(false, false);
    engine.setExternalVideoFrameOutput(false, false, {
      formate: 3,
      bufferType: 0
    });
    engine.enableUserVolumeNotify(3000);
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

    const option = {
      autoSubscribeAudio: false, // 自动订阅远端用户音频流
      autoSubscribeVideo: false, // 自动订阅远端用户视频流
      mediaType: 1
    };
    const ret = engine.joinRoom(roomId, userInfo, option);
    // const ret = engine.joinRoom(roomId, userInfo);
    console.log('join room:', userInfo, ret);
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
  renderLocalVideo(view: HTMLDivElement, mode: RTCDisplayMode ): any {
    const user = getUserByKeyStatus('isLocal', true) || {video: ON_OFF.OFF};
    this.enableLocalVideo(user.video == ON_OFF.ON? true: false);
    engine.setViewDisplayMode('', 1, false);
    const result = this.setupLocalView(view, mode);
    if (result != 0) {
      throw new Error('rtc engine setupLocalView error.' + result);
    }
    return result;
  }
  enableLocalVideo(type: boolean): number {
    return engine.enableLocalVideo(type);
  }
  enableLocalAudio(type: boolean): number {
    return engine.enableLocalAudio(type);
  }
  stopLocalPreviewAndClear(view: HTMLDivElement): number {
    const res = this.enableLocalVideo(false);
    view.innerHTML = '';
    return res;
  }
  startRemoteStreamView(userId: string, view: HTMLDivElement) {
    engine.startRemoteStreamView(userId, view, 1, true);
    this.muteRemoteVideoStream(userId, false);
    this.setRemoteVideoStreamType(userId, 1);
  }
  muteRemoteVideoStream(userId: string, mute: boolean): number {
    return engine.muteRemoteVideoStream(userId, mute);
  }
  setRemoteVideoStreamType(userId: string, type: number): number {
    return engine.setRemoteVideoStreamType(userId, type);
  }
  leaveRoom(): number {
    return engine.leaveRoom();
  }
  setUserRole(roleType: any): number | void {
    return engine.setUserRole(roleType);
  }

  getScreenSources(type = 0) {
    console.log('getScreenSources type: ', type);
    return engine.getScreenCaptureSources(type);
  }
  selectScreenShare(item: any): number {
    return engine.selectScreenCaptureTarget(item, { disableCaptureMouse: true });
    // engine.selectScreenCaptureTarget(info: HRTCScreenCaptureSourceInfo, optionalInfo: HRTCSrceenCaptureOptionalInfo)
  }
  startScreenShare(): number {
    // 1040 * 585
    engine.setSubStreamEncParam( {
      frameRate: 30, //视频帧率，单位为帧/秒
      width: 1040, // 宽
      height: 585, // 高
      bitrate: 300, //视频码率
    });
    return engine.startScreenCapture();
  }
  stopScreenShare(): number {
    return engine.stopScreenCapture();
  }
  startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number {
    // 暂时有问题，不开放
    // engine.setRemoteSubStreamViewDisplayMode(userId, 0);
    return engine.startRemoteSubStreamView(userId, view);
  }
  setRemoteSubStreamViewDisplayMode(userId: string, mode: number = 1) {
    console.log('setting remote video display mode:', userId, mode);
    engine.setRemoteSubStreamViewDisplayMode(userId, mode);
  }
  stopRenderRemoteScreenShare(userId: string): number {
    return engine.stopRemoteSubStreamView(userId);
  }

  setAudioRecordingDevice(deviceId: string): number {
    return engine.setAudioRecordingDevice(deviceId);
  }
  getAudioRecordingDevices(): RTCDeviceInfo[] {
    return engine.getAudioRecordingDevices();
  }
  getCurrentAudioRecordingDevice(): string {
    return engine.getCurrentAudioRecordingDevice();
  }
  setAudioRecordingDeviceMute(mute: boolean): number {
    return engine.setAudioRecordingDeviceMute(mute);
  }
  getAudioRecordingDeviceMute(): boolean {
    return engine.getAudioRecordingDeviceMute();
  }
  setAudioRecordingVolume(volume: number): number {
    return engine.setAudioRecordingVolume(volume);
  }
  getAudioRecordingVolume(): number {
    return engine.getAudioRecordingVolume();
  }
  setAudioPlaybackDevice(deviceId: string): number {
    return engine.setAudioPlaybackDevice(deviceId);
  }
  getAudioPlaybackDevices(): RTCDeviceInfo[] {
    return engine.getAudioPlaybackDevices();
  }
  getCurrentAudioPlaybackDevice(): string {
    return engine.getCurrentAudioPlaybackDevice();
  }
  setAudioPlaybackDeviceMute(mute: boolean): number {
    return engine.setAudioPlaybackDeviceMute(mute);
  }
  getAudioPlaybackDeviceMute(): boolean {
    return engine.getAudioPlaybackDeviceMute();
  }
  setAudioPlaybackVolume(volume: number): number {
    return engine.setAudioPlaybackVolume(volume);
  }
  getAudioPlaybackVolume(): number {
    return engine.getAudioPlaybackVolume();
  }

  setVideoDevice(deviceId: string): number {
    return engine.setVideoDevice(deviceId);
  }
  getVideoDevices(): RTCDeviceInfo[] {
    return engine.getVideoDevices();
  }
  getCurrentVideoDevice(): string {
    return engine.getCurrentVideoDevice();
  }
  setRemoteAudioMode(mode: RTCRemoteAudioMode): number {
    return engine.setRemoteAudioMode(mode);
  }
  muteLocalAudioStream(mute: boolean): number {
    return engine.muteLocalAudioStream(mute);
  }
  muteRemoteAudioStream(userId: string, mute: boolean): number {
    return engine.muteRemoteAudioStream(userId, mute);
  }
  muteAllRemoteAudioStreams(mute: boolean): number {
    return engine.muteAllRemoteAudioStreams(mute);
  }
  enableUserVolumeNotify(interval: number): number {
    return engine.enableUserVolumeNotify(interval);
  }
  adjustRecordingVolume(volume: number): number {
    return engine.adjustRecordingVolume(volume);
  }
  adjustPlaybackVolume(volume: number, userId?: string): number {
    return engine.adjustPlaybackVolume(volume, userId);
  }
  setExternalAudioFrameOutput(localEnable: boolean, remoteEnable: boolean): number {
    return engine.setExternalAudioFrameOutput(localEnable, remoteEnable);
  }
  setShareComputerSound(enable: boolean): number {
    return engine.setShareComputerSound(enable);;
  }
  setDefaultMuteAllRemoteAudioStreams(mute: boolean): number {
    return engine.setDefaultMuteAllRemoteAudioStreams(mute);
  }
  muteLocalVideoStream(mute: boolean): number {
    return engine.muteLocalVideoStream(mute);
  }
  muteAllRemoteVideoStreams(mute: boolean): number {
    return engine.muteAllRemoteVideoStreams(mute);
  }
  setVideoEncParam(encoderparam: RTCVideoEncParam): number {
    return engine.setVideoEncParam(encoderparam);
  }
  enableSmallVideoStream(enable: boolean, smallVideoParam: RTCVideoEncParam): number {
    return engine.enableSmallVideoStream(enable, smallVideoParam);
  }
  setPriorRemoteVideoStreamType(type: RTCVideoStreamType): number {
    return engine.setPriorRemoteVideoStreamType(type);
  }
  setLocalViewMirror(mirrorType: RTCVideoMirrorType): number {
    return engine.setLocalViewMirror(mirrorType);
  }
  stopRemoteStreamView(userId: string): number {
    return engine.stopRemoteStreamView(userId);
  }
  setDefaultMuteAllRemoteVideoStreams(enable: boolean): number {
    return engine.setDefaultMuteAllRemoteVideoStreams(enable);
  }
  setViewDisplayMode(userId: string, mode: RTCDisplayMode, isAux: boolean): number {
    return engine.setViewDisplayMode(userId, mode, isAux);
  }
  startPreview(): number {
    return engine.startPreview();
  }
  stopPreview(): number {
    return engine.stopPreview();
  }
  setRemoteViewMirrorMode(userId: string, enable: boolean): number {
    return engine.setRemoteViewMirrorMode(userId, enable);
  }
  setupLocalView(view: Element, displayMode?: RTCDisplayMode): number {
    return engine.setupLocalView(view, displayMode);
  }
  playAudioClip(soundId: number,filePath:string):number{
    return engine.playAudioClip(soundId, filePath);
  }
  startAudioFile(filePath:string, playMode: number, cycle: number, replace: number, startPos?:number):number{
    return engine.startAudioFile(filePath, playMode, cycle, replace, startPos);
  }
  startNetworkTest(config: HRTCNetworkTestConfig): number {
    return engine.startNetworkTest(config)
  }
}
