/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 15:47:27
 * @LastEditTime: 2021-09-30 11:48:34
 * @LastEditors: Yandong Hu
 * @Description: 华为云 web rtc sdk
 */

import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../abstract/rtc.abstract";
import { HRTCVideoDisplayMode } from "./hrtcsdk.service.interface";


export default class HRTCSDKWebService extends RTCBaseProvider {
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
    setLocalPreview(type: boolean): void {
      throw new Error("Method not implemented.");
    }
    stopLocalPreviewAndClear(view: HTMLDivElement): number {
      throw new Error("Method not implemented.");
    }
    muteRemoteVideoStream(userId: string): void {
      throw new Error("Method not implemented.");
    }
    renderRemoteVideoStreamType(userId: string, type: number): void {
      throw new Error("Method not implemented.");
    }
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
    init(appId?: any, opt?: RTCInitOpts): void {
    }
    joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void {
    }
    createLocalPreview(view: HTMLDivElement, mode: HRTCVideoDisplayMode): any {
    }
}
