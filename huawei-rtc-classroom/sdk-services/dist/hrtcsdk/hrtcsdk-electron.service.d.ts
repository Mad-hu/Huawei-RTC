import { RTCBaseProvider, RTCInitOpts, RTCLoginOpts } from "../abstract/rtc.abstract";
import { HRTCVideoDisplayMode } from "./hrtcsdk.service.interface";
export default class HRTCSDKElectronService extends RTCBaseProvider {
    id_random: number;
    constructor();
    init(appId?: any, opt?: RTCInitOpts): any;
    getUserLocalId(): number;
    /**
     * 加入房间
     *
     * @param {string} roomId 房间id
     * @param {number} userId 用户id
     * @param {RTCLoginOpts} [opts] 其他一些信息
     * @memberof HRTCSDKElectronService
     */
    joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void;
    /**
     * 由于rtc接口的回调采用 HRTC Electron 的回调为基准，这里直接遍历并返回即可，其他sdk，必须重新实现每一个回调并封装
     *
     * @memberof HRTCSDKElectronService
     */
    sdkEvent(): void;
    createLocalPreview(view: HTMLDivElement, mode: HRTCVideoDisplayMode): any;
    setLocalVideo(type: boolean): void;
    setLocalAudio(type: boolean): void;
    setLocalPreview(type?: boolean): void;
    stopLocalPreviewAndClear(view: HTMLDivElement): number;
    renderRemoteView(userId: string, view: HTMLDivElement): void;
    muteRemoteVideoStream(userId: string, mute: boolean): void;
    renderRemoteVideoStreamType(userId: string, type: number): void;
    leaveRoom(): number;
    setUserRole(roleType: any): number | void;
    getScreenSources(type?: number): any;
    selectScreenShare(item: any): number;
    startScreenShare(): number;
    stopScreenShare(): number;
    startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number;
    setRemoteSubStreamViewDisplayMode(userId: string, mode?: number): void;
    stopRenderRemoteScreenShare(userId: string): number;
}
