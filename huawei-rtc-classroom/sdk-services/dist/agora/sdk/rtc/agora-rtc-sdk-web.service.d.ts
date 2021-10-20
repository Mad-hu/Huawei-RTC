import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../../../abstract/rtc.abstract";
export default class AgoraRCMSdkWebService extends RTCBaseProvider {
    setRemoteSubStreamViewDisplayMode(userId: string, mode?: number): void;
    getScreenSources(): void;
    selectScreenShare(item: any): number;
    startScreenShare(): number;
    stopScreenShare(): number;
    startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number;
    stopRenderRemoteScreenShare(userId: string): number;
    setLocalVideo(type: boolean): void;
    setLocalAudio(type: boolean): void;
    muteRemoteVideoStream(userId: string): void;
    renderRemoteVideoStreamType(userId: string, type: number): void;
    setLocalPreview(type: boolean): void;
    stopLocalPreviewAndClear(view: HTMLDivElement): number;
    getUserLocalId(): number;
    leaveRoom(): number;
    setUserRole(roleType: any): number | void;
    sdkEvent(): void;
    init(appId?: number, opt?: RTCInitOpts): void;
    joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): Promise<void>;
    createLocalPreview(view: HTMLDivElement, mode?: number): void;
}
