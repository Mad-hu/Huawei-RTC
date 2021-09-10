/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-08-13 13:59:07
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../../../abstract/rtc.abstract";

export default class AgoraRTCSdkElectronService extends RTCBaseProvider {
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
    init(appId?: number, opt?: RTCInitOpts): void {
        throw new Error("Method not implemented.");
    }
    joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void {
        throw new Error("Method not implemented.");
    }
    createLocalPreview(view: HTMLDivElement, mode?: number) {
        throw new Error("Method not implemented.");
    }
}
