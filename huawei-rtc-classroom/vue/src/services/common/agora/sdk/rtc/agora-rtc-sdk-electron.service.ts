/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-11-10 19:51:07
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { RTCDisplayMode, RTCBaseProvider, RTCDeviceInfo, RTCInitOpts, RTCLoginOpts, RTCRemoteAudioMode, RTCVideoEncParam, RTCVideoStreamType, RTCVideoMirrorType } from "../../../abstract/rtc.abstract";

export default class AgoraRTCSdkElectronService extends RTCBaseProvider {
    startAudioFile(filePath: string, playMode: number, cycle: number, replace: number, startPos?: number): number {
      throw new Error("Method not implemented.");
    }
    playAudioClip(soundId: number, filePath: string): number {
      throw new Error("Method not implemented.");
    }
    stopRemoteStreamView(userId: string): number {
      throw new Error("Method not implemented.");
    }
    setDefaultMuteAllRemoteVideoStreams(enable: boolean): number {
      throw new Error("Method not implemented.");
    }
    setLocalViewMirror(mirrorType: RTCVideoMirrorType): number {
      throw new Error("Method not implemented.");
    }
    renderLocalVideo(view: HTMLDivElement, mode?: RTCDisplayMode) {
      throw new Error("Method not implemented.");
    }
    muteLocalVideoStream(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    muteRemoteVideoStream(userId: string, mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    muteAllRemoteVideoStreams(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    setVideoEncParam(encoderparam: RTCVideoEncParam): number {
      throw new Error("Method not implemented.");
    }
    enableSmallVideoStream(enable: boolean, smallVideoParam: RTCVideoEncParam): number {
      throw new Error("Method not implemented.");
    }
    setPriorRemoteVideoStreamType(type: RTCVideoStreamType): number {
      throw new Error("Method not implemented.");
    }
    setRemoteVideoStreamType(userId: string, type: RTCVideoStreamType): number {
      throw new Error("Method not implemented.");
    }
    setViewDisplayMode(userId: string, mode: RTCDisplayMode, isAux: boolean): number {
      throw new Error("Method not implemented.");
    }
    startPreview(): number {
      throw new Error("Method not implemented.");
    }
    stopPreview(): number {
      throw new Error("Method not implemented.");
    }
    setRemoteViewMirrorMode(userId: string, enable: boolean): number {
      throw new Error("Method not implemented.");
    }
    setupLocalView(view: Element, displayMode?: RTCDisplayMode): number {
      throw new Error("Method not implemented.");
    }
    setVideoDevice(deviceId: string): number {
      throw new Error("Method not implemented.");
    }
    getVideoDevices(): RTCDeviceInfo[] {
      throw new Error("Method not implemented.");
    }
    getCurrentVideoDevice(): string {
      throw new Error("Method not implemented.");
    }
    setRemoteAudioMode(mode: RTCRemoteAudioMode): number {
      throw new Error("Method not implemented.");
    }
    muteLocalAudioStream(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    muteRemoteAudioStream(userId: string, mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    muteAllRemoteAudioStreams(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    enableUserVolumeNotify(interval: number): number {
      throw new Error("Method not implemented.");
    }
    adjustRecordingVolume(volume: number): number {
      throw new Error("Method not implemented.");
    }
    adjustPlaybackVolume(volume: number, userId?: string): number {
      throw new Error("Method not implemented.");
    }
    setExternalAudioFrameOutput(localEnable: boolean, remoteEnable: boolean): number {
      throw new Error("Method not implemented.");
    }
    setShareComputerSound(enable: boolean): number {
      throw new Error("Method not implemented.");
    }
    setDefaultMuteAllRemoteAudioStreams(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    setAudioRecordingDevice(deviceId: string): number {
      throw new Error("Method not implemented.");
    }
    getAudioRecordingDevices(): RTCDeviceInfo[] {
      throw new Error("Method not implemented.");
    }
    getCurrentAudioRecordingDevice(): string {
      throw new Error("Method not implemented.");
    }
    setAudioRecordingDeviceMute(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    getAudioRecordingDeviceMute(): boolean {
      throw new Error("Method not implemented.");
    }
    setAudioRecordingVolume(volume: number): number {
      throw new Error("Method not implemented.");
    }
    getAudioRecordingVolume(): number {
      throw new Error("Method not implemented.");
    }
    setAudioPlaybackDevice(deviceId: string): number {
      throw new Error("Method not implemented.");
    }
    getAudioPlaybackDevices(): RTCDeviceInfo[] {
      throw new Error("Method not implemented.");
    }
    getCurrentAudioPlaybackDevice(): string {
      throw new Error("Method not implemented.");
    }
    setAudioPlaybackDeviceMute(mute: boolean): number {
      throw new Error("Method not implemented.");
    }
    getAudioPlaybackDeviceMute(): boolean {
      throw new Error("Method not implemented.");
    }
    setAudioPlaybackVolume(volume: number): number {
      throw new Error("Method not implemented.");
    }
    getAudioPlaybackVolume(): number {
      throw new Error("Method not implemented.");
    }
    startRemoteStreamView(userId: string, view: HTMLDivElement): void {
      throw new Error("Method not implemented.");
    }
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
    enableLocalVideo(type: boolean): number {
      throw new Error("Method not implemented.");
    }
    enableLocalAudio(type: boolean): number {
      throw new Error("Method not implemented.");
    }
    stopLocalPreviewAndClear(view: HTMLDivElement): number {
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
}
