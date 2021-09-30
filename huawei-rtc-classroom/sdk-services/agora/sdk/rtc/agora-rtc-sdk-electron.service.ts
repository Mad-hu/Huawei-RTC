/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-09-30 11:48:19
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../../../abstract/rtc.abstract";

export default class AgoraRTCSdkElectronService extends RTCBaseProvider {
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
        throw new Error("Method not implemented.");
    }
    joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void {
        throw new Error("Method not implemented.");
    }
    createLocalPreview(view: HTMLDivElement, mode?: number) {
        throw new Error("Method not implemented.");
    }
}
