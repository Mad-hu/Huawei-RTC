import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../../../abstract/rtc.abstract";
export default class AgoraRTCSdkElectronService extends RTCBaseProvider {
    getScreenSources(): void;
    selectScreenShare(item: any): number;
    startScreenShare(): number;
    stopScreenShare(): number;
    startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number;
    stopRenderRemoteScreenShare(userId: string): number;
    setLocalVideo(type: boolean): void;
    setLocalAudio(type: boolean): void;
    setLocalPreview(type: boolean): void;
    stopLocalPreviewAndClear(view: HTMLDivElement): number;
    muteRemoteVideoStream(userId: string): void;
    renderRemoteVideoStreamType(userId: string, type: number): void;
    getUserLocalId(): number;
    leaveRoom(): number;
    setUserRole(roleType: any): number | void;
    sdkEvent(): void;
    init(appId?: any, opt?: RTCInitOpts): void;
    joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void;
    createLocalPreview(view: HTMLDivElement, mode?: number): void;
}
