/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-10-20 13:30:17
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../../../abstract/rtc.abstract";
// import AgoraRTC, { ClientConfig, IAgoraRTCClient, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
// const agora_rtc_appId = import.meta.env.VITE_AGORA_RTC_APPID;
// let shareTrack: any;
// let rtcClient!: IAgoraRTCClient;
// let userJoinId = 0;
export default class AgoraRCMSdkWebService extends RTCBaseProvider {
  setRemoteSubStreamViewDisplayMode(userId: string, mode?: number): void {
    throw new Error("Method not implemented.");
  }
  getScreenSources() {
    throw new Error("Method not implemented.");
  }
  selectScreenShare(item: any): number {
    throw new Error("Method not implemented.");
  }
  startScreenShare(): number {
    throw new Error("Method not implemented.");
  }
  stopScreenShare(): number {
    throw new Error("Method not implemented.");
  }
  startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number {
    throw new Error("Method not implemented.");
  }
  stopRenderRemoteScreenShare(userId: string): number {
    throw new Error("Method not implemented.");
  }
  setLocalVideo(type: boolean): void {
    throw new Error("Method not implemented.");
  }
  setLocalAudio(type: boolean): void {
    throw new Error("Method not implemented.");
  }
  muteRemoteVideoStream(userId: string): void {
    throw new Error("Method not implemented.");
  }
  renderRemoteVideoStreamType(userId: string, type: number): void {
    throw new Error("Method not implemented.");
  }
  setLocalPreview(type: boolean): void {
    throw new Error("Method not implemented.");
  }
  stopLocalPreviewAndClear(view: HTMLDivElement): number {
    throw new Error("Method not implemented.");
  }
  // id_random = parseInt((Math.random() * 10000).toFixed(0));
  getUserLocalId(): number {
    throw new Error("Method not implemented.");
  }
  leaveRoom(): number {
    throw new Error("Method not implemented.");
  }
  setUserRole(roleType: any): number | void {
    throw new Error("Method not implemented.");
  }
  sdkEvent(): void {
    throw new Error("Method not implemented.");
  }
  init(appId?: number, opt?: RTCInitOpts): void {
    // const clientConfig: ClientConfig = { mode: 'rtc', codec: 'vp8' };
    // rtcClient = AgoraRTC.createClient(clientConfig);
  }
  async joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts) {
    // userJoinId = userId + this.id_random;
    // const resPromise = await rtcClient.join(`${agora_rtc_appId}`, roomId, null, userId);
  }
  createLocalPreview(view: HTMLDivElement, mode?: number) {
    throw new Error("Method not implemented.");
  }
}
