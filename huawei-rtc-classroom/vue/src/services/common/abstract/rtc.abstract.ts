/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 14:14:38
 * @LastEditTime: 2021-11-02 13:32:04
 * @LastEditors: Yandong Hu
 * @Description: RTC模块基础代理
 */

import EventEmitter from "events";

/**
 * 以HRTC Electron SDK为标准，其他RTC SDK必须参考此标准将回调信息进行转化。
 *
 * @export
 * @enum {number}
 */
export enum RTCEventType {
  /**
   * 本地用户加入房间事件。
   */
  joinedRoom = 'joinedRoom',
  /**
   * 加入房间失败事件通知。
   */
  joinRoomFailure = 'joinRoomFailure',
  /**
   * 本地用户重新加入房间事件。
   */
  rejoinedRoom = 'rejoinedRoom',
  /**
   * 本地用户离开房间事件。
   */
  leaveRoom = 'leaveRoom',
  /**
   * 发生错误时上报的事件。
   */
  error = 'error',
  /**
   * 本地用户角色切换时上报的事件通知。
   */
  roleChanged = 'roleChanged',
  /**
   * 远端用户加入房间时上报的事件通知。
   */
  userJoined = 'userJoined',
  /**
   * 远端用户离开房间时上报的事件通知。
   */
  userOffline = 'userOffline',
  /**
   * 网络连接状态已改变时上报的事件通知。
   */
  connectionStateChanged = 'connectionStateChanged',
  // /**
  //  * 本地用户视频状态已改变的事件通知。
  //  */
  localVideoStateChanged = 'localVideoStateChanged',
  // /**
  //  * 本地用户音频状态已改变的事件通知。
  //  */
  localAudioStateChanged = 'localAudioStateChanged',
  // /**
  //  * 接收到第一帧远端视频流并解码成功的事件通知。
  //  */
  // firstRemoteVideoDecoded = 'firstRemoteVideoDecoded',
  // /**
  //  * 媒体渲染成功的事件通知。
  //  */
  // renderSuccess = 'renderSuccess',
  // /**
  //  * 开始播放音频文件的事件通知。
  //  */
  // startAudioFile = 'startAudioFile',
  // /**
  //  * 停止播放音频文件的事件通知。
  //  */
  // stopAudioFile = 'stopAudioFile',
  // /**
  //  * 暂停播放音频文件的事件通知。
  //  */
  // pauseAudioFile = 'pauseAudioFile',
  // /**
  //  * 恢复播放音频文件的事件通知。
  //  */
  // resumeAudioFile = 'resumeAudioFile',
  // /**
  //  * 音频文件播放状态改变的事件通知。
  //  */
  // audioFileStateChanged = 'audioFileStateChanged',
  // /**
  //  * 音效文件播放结束的事件通知。
  //  */
  // audioFileFinished = 'audioFileFinished',
  // /**
  //  * 音效文件播放结束的事件通知。
  //  */
  // audioClipFinished = 'audioClipFinished',
  // /**
  //  * 签名到期时上报的事件通知。
  //  */
  // signatureExpired = 'signatureExpired',
  // /**
  //  * 远端用户音量统计的事件通知。
  //  */
  userVolumeStats = 'userVolumeStats',
  // /**
  //  * 本地/远端的音频流统计信息的事件通知。
  //  */
  // audioStats = 'audioStats',
  // /**
  //  * 本地/远端的视频流统计信息的事件通知。
  //  */
  // videoStats = 'videoStats',
  // /**
  //  * RTCStats统计数据上报的事件通知。
  //  */
  // rtcStats = 'rtcStats',
  // /**
  //  * 通话前本地用户的网络质量水平上报通知。
  //  */
  // networkTestQuality = 'networkTestQuality',
  // /**
  //  * 通话前本地用户的网络质量分析数据上报通知。
  //  */
  // networkTestResult = 'networkTestResult',
  // /**
  //  * 通话中本地/远端用户的网络质量水平上报通知。
  //  */
  // networkQuality = 'networkQuality',
  // /**
  //  * 日志上传结果的事件通知。
  //  */
  // logUploadResult = 'logUploadResult',
  // /**
  //  * 日志上传进度的事件通知。
  //  */
  // logUploadProgress = 'logUploadProgress',
  /**
   * 设备状态发生改变的事件通知。
   */
  deviceStateChanged = 'deviceStateChanged',
  // /**
  //  * 音频设备播放音量改变的事件通知。
  //  */
  deviceVolumeChanged = 'deviceVolumeChanged',
  /**
   * 共享屏幕流开启的事件通知。
   */
  screenCaptureStarted = 'screenCaptureStarted',
  /**
   * 共享屏幕流关闭的事件通知。
   */
  screenCaptureStoped = 'screenCaptureStoped',
  /**
   * 远端开启/停止共享流的事件通知。
   */
   userSubStreamAvailable = 'userSubStreamAvailable',

  // /**
  //  * 共享流详情的事件通知。
  //  */
  // subStreamStats = 'subStreamStats',
  // /**
  //  * 上行流啸叫检测的事件通知。
  //  */
  // howlingUpDetected = 'howlingUpDetected',
  // /**
  //  * 下行流啸叫检测的事件通知。
  //  */
  // howlingDownDetected = 'howlingDownDetected',
  // /**
  //  * 媒体收包数量上报的事件通知。
  //  */
  // mediaStreamRecvPacket = 'mediaStreamRecvPacket',
  // /**
  //  * 远端用户音频状态已改变事件通知。
  //  */
  remoteAudioStateChanged = 'remoteAudioStateChanged',
  // /**
  //  * 远端用户视频状态已改变事件通知。
  //  */
  remoteVideoStateChanged = 'remoteVideoStateChanged',
  // /**
  //  * 本地音频首帧发送的事件通知。
  //  */
  // firstLocalAudioFrame = 'firstLocalAudioFrame',
  // /**
  //  * 本地视频首帧渲染的事件通知。
  //  */
  // firstLocalVideoFrame = 'firstLocalVideoFrame',
  // /**
  //  * 远端音频流第一帧解码成功的事件通知。
  //  */
  // firstRemoteAudioDecoded = 'firstRemoteAudioDecoded',
  // /**
  //  * 本地音量变化实时的事件通知。
  //  */
  localVolumeChanged = 'localVolumeChanged',
  // /**
  //  * 视频自渲染数据的事件通知。
  //  */
  // renderVideoFrame = 'renderVideoFrame',
  // /**
  //  * 音频自渲染数据的事件通知。
  //  */
  // playbackAudioFrame = 'playbackAudioFrame',
  // /**
  //  * 共享屏幕流自渲染数据的事件通知。
  //  */
  // renderDataFrame = 'renderDataFrame',
}
export interface RTCInitOpts {
  userId?: number,
  domain: any
}
export interface RTCLoginOpts {
  userName?: string,
  role?: string
}

/**
 * RTC设备信息
 *
 * @export
 * @interface RTCDeviceInfo
 */
export interface RTCDeviceInfo {
  /**
   * 音频采集设备的设备ID
   */
  deviceId: string,
  /**
   * 音频采集设备的设备名称
   */
  deviceName: string
}
export enum RTCRemoteAudioMode {
  /**
   * 订阅模式
   */
  RTC_REMOTE_AUDIO_SUBSCRIBED = 1,
  /**
   * 最大三方模式
   */
  RTC_REMOTE_AUDIO_TOP_THREE = 2
}


export enum RTCStreamType {
  RTC_STREAM_TYPE_LD = 0,
  RTC_STREAM_TYPE_SD,
  RTC_STREAM_TYPE_HD,
  RTC_STREAM_TYPE_FHD
};

export interface RTCVideoEncParam {
  /**
   * 必选，HRTCStreamType 类型，流类型。
   */
  streamType: RTCStreamType,
  /**
   * 必选，number类型，分辨率的宽度，单位为pixel。
   */
  width: number,
  /**
   * 必选，分辨率的高度，单位为pixel
   */
  height: number,
  /**
   * 必选，视频帧率，单位为帧/秒
   */
  frameRate: number,
  /**
   * 必选，number类型，视频码率，单位为Kbps
   */
  bitrate: number,
  /**
   * 可选，boolean类型，禁用/启用下行分辨率自适应，true 表示禁用，false表示启用。 默认为false。
   */
  disableAdjustRes?: boolean;
  /**
   * 可选，number类型，视频最小帧率，单位为帧/秒。 默认为0。
   */
  minFrameRate?: number,
  /**
   * 可选，number类型，视频最小码率，单位为Kbps。默认为0。
   */
  minBitrate?: number,
}
export enum RTCVideoStreamType {
  RTC_VIDEO_STREAM_TYPE_BIG = 0,
  RTC_VIDEO_STREAM_TYPE_SMALL
};

export enum RTCVideoDisplayMode {
  /**
     * 黑边模式，通过填充黑边的方式保持宽高比。
     */
  'HRTC_VIDEO_DISPLAY_MODE_FIT' = 0,
  /**
   * 裁剪模式，通过裁剪的方式保持宽高比
   */
  'HRTC_VIDEO_DISPLAY_MODE_HIDDEN',
  /**
   * 缩放模式，缩放和拉伸视频尺寸以充满显示视窗
   */
  'HRTC_VIDEO_DISPLAY_MODE_FILL',
}
export enum RTCDisplayMode {
  /**
   * 裁剪模式，通过裁剪的方式保持宽高比
   */
  'HRTC_VIDEO_DISPLAY_MODE_HIDDEN' = 0,
  /**
   * 黑边模式，通过填充黑边的方式保持宽高比。
   */
  'HRTC_VIDEO_DISPLAY_MODE_FIT',

  /**
   * 缩放模式，缩放和拉伸视频尺寸以充满显示视窗
   */
  'HRTC_VIDEO_DISPLAY_MODE_FILL',
}
export enum RTCVideoMirrorType {
  disable = 0,
  enable = 1
}
/**
 * 设备类型
 */
export enum HRTCDeviceType {
  /**
   * 音频播放设备
   */
  HRTC_DEVTYPE_AUDIO_PLAYBACK = 0, 
  /**
   * 音频采集设备
   */
  HRTC_DEVTYPE_AUDIO_RECORDING,
  /**
   * 视频采集设备
   */
  HRTC_DEVTYPE_VIDEO_CAPTURE
} 
/**
 * 设备状态
 */
export enum HRTCDeviceState {
  /**
   * 设备正常
   */
  HRTC_DEVTYPE_STATE_ACTIVE = 0, 
  /**
   * 设备不可用
   */
  HRTC_DEVTYPE_STATE_DISABLED,
  /**
   * 设备已经被拔出
   */
  HRTC_DEVTYPE_STATE_UNPLUGGED
}  
export abstract class RTCBaseProvider extends EventEmitter {
  /**
   * 初始化RTC SDK
   *
   * @abstract
   * @param {any} [appId] RTC Appid
   * @param {RTCInitOpts} [opt] other options
   * @memberof RTCBaseDelegate
   */
  abstract init(appId?: any, opt?: RTCInitOpts): void;

  /**
   * 加入房间/频道
   *
   * @abstract
   * @param {string} roomId 房间id
   * @param {number} userId 用户id
   * @param {RTCLoginOpts} [opts] other options
   * @memberof RTCBaseDelegate
   */
  abstract joinRoom(roomId: string, userId: number, opts?: RTCLoginOpts): void;

  /**
   * 离开房间/频道
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract leaveRoom(): number;


  /**
   * 设置用户角色
   *
   * @abstract
   * @param {*} roleType
   * @return {*}  {(number | void)}
   * @memberof RTCBaseProvider
   */
  abstract setUserRole(roleType: any): number | void;

  /**
   * 本地视频预览
   *
   * @abstract
   * @param {HTMLDivElement} view 本地预览挂载位置
   * @param {number} [mode] 预览视频模式
   * @return {*}  {*}
   * @memberof RTCBaseDelegate
   */
  abstract renderLocalVideo(view: HTMLDivElement, mode?: RTCDisplayMode): any;

  /**
   * sdk 的所有监听，必须由此方法重新组装，最终方法名必须符合 RTCEventType
   *
   * @abstract
   * @memberof RTCBaseProvider
   */
  abstract sdkEvent(): void;

  /**
   * 获取用户RTC加入房间的id，id不采用用户原有id，是通过原有id再进行加工得到。保证重复用户，也能够正常进入房间。
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract getUserLocalId(): number;


  abstract stopLocalPreviewAndClear(view: HTMLDivElement): number;




  /**
   * 获取屏幕可共享对象列表
   *
   * @abstract
   * @return {*}  {*}
   * @memberof RTCBaseProvider
   */
  abstract getScreenSources(): any;

  /**
   * 选择屏幕共享对象
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract selectScreenShare(item: any): number;
  /**
   * 开始共享自己的屏幕
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract startScreenShare(): number;
  /**
   * 停止共享自己的屏幕
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract stopScreenShare(): number;

  /**
   * 开始渲染远端屏幕共享
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract startRenderRemoteScreenShare(userId: string, view: HTMLDivElement): number;
  /**
   * 停止渲染远端屏幕共享
   *
   * @abstract
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract stopRenderRemoteScreenShare(userId: string): number;

  /**
   * 设置共享流视图渲染模式
   *
   * @abstract
   * @param {string} userId
   * @param {number} mode
   * @memberof RTCBaseProvider
   */
  abstract setRemoteSubStreamViewDisplayMode(userId: string, mode?: RTCVideoDisplayMode): void;


  /************************************************************************************
   * 音频设备管理
   ************************************************************************************/

  /**
   * 设置音频采集设备。
   *
   * @abstract
   * @param {string} deviceId 必选，string类型，音频采集设备的设备ID
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败。
   * @memberof RTCBaseProvider
   */
  abstract setAudioRecordingDevice(deviceId: string): number;

  /**
   * 获取音频采集设备列表
   *
   * @abstract
   * @return {*}  {Array<RTCDeviceInfo>}
   * RTCDeviceInfo:
    {
      - deviceId：string类型，视频采集设备的设备ID。
      - deviceName：string类型，视频采集设备的设备名称。
    }
   * @memberof RTCBaseProvider
   */
  abstract getAudioRecordingDevices(): Array<RTCDeviceInfo>;

  /**
   * 获取当前音频采集设备。
   *
   * @abstract
   * @return {*}  {string} 返回当前音频采集设备的deviceId
   * @memberof RTCBaseProvider
   */
  abstract getCurrentAudioRecordingDevice(): string;

  /**
   * 设置音频采集设备静音
   *
   * @abstract
   * @param {boolean} mute 音频采集设备是否静音，true表示静音，false表示取消静音
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败。
   * @memberof RTCBaseProvider
   */
  abstract setAudioRecordingDeviceMute(mute: boolean): number;

  /**
   * 获取音频采集设备静音状态
   *
   * @abstract
   * @return {*}  {boolean} 音频采集设备是否静音。 true：音频采集设备已静音。 false：音频采集设备未静音。
   * @memberof RTCBaseProvider
   */
  abstract getAudioRecordingDeviceMute(): boolean;

  /**
   * 设置音频采集设备的音量
   *
   * @abstract
   * @param {number} volume 设置音频采集的音量，取值范围为[0,100]
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败。
   * @memberof RTCBaseProvider
   */
  abstract setAudioRecordingVolume(volume: number): number;

  /**
   * 获取当前音频采集设备音量
   *
   * @abstract
   * @return {*}  {number} 音频采集设备的音量，0-100
   * @memberof RTCBaseProvider
   */
  abstract getAudioRecordingVolume(): number;

  /**
   * 设置音频播放设备
   *
   * @abstract
   * @param {string} deviceId  音频播放设备的设备ID
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract setAudioPlaybackDevice(deviceId: string): number

  /**
   * 获取音频播放设备列表
   *
   * @abstract
   * @return {*}  {Array<RTCDeviceInfo>}
   * RTCDeviceInfo:
    {
      - deviceId：string类型，视频采集设备的设备ID。
      - deviceName：string类型，视频采集设备的设备名称。
    }
   * @memberof RTCBaseProvider
   */
  abstract getAudioPlaybackDevices(): Array<RTCDeviceInfo>;

  /**
   * 获取当前音频播放设备 一般扬声器
   *
   * @abstract
   * @return {*}  {string} 返回当前音频播放设备的deviceId
   * @memberof RTCBaseProvider
   */
  abstract getCurrentAudioPlaybackDevice(): string;

  /**
   * 设置音频播放设备静音
   *
   * @abstract
   * @param {boolean} mute  音频播放设备是否静音，true表示静音，false表示取消静音
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract setAudioPlaybackDeviceMute(mute: boolean): number;

  /**
   * 获取音频播放设备静音状态
   *
   * @abstract
   * @return {*}  {boolean} 音频播放设备是否静音  true：音频播放设备已静音  false：音频播放设备未静音
   * @memberof RTCBaseProvider
   */
  abstract getAudioPlaybackDeviceMute(): boolean;
  /**
   * 设置音频播放音量
   *
   * @abstract
   * @param {number} volume 设置音频播放的音量，取值范围为[0,100]
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract setAudioPlaybackVolume(volume: number): number;

  /**
   * 获取当前音频播放设备音量
   *
   * @abstract
   * @return {*}  {number} 音频播放设备的音量，取值范围为[0,100]
   * @memberof RTCBaseProvider
   */
  abstract getAudioPlaybackVolume(): number;


  /****************************************************************************
   * 视频设备管理
   ****************************************************************************/

  /**
   * 设置视频采集设备
   *
   * @abstract
   * @param {string} deviceId 视频采集设备的设备ID
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract setVideoDevice(deviceId: string): number;
  /**
   * 获取视频采集设备列表
   *
   * @abstract
   * @return {*}  {Array<RTCDeviceInfo>}
   * RTCDeviceInfo:
    {
      - deviceId：string类型，视频采集设备的设备ID。
      - deviceName：string类型，视频采集设备的设备名称。
    }
   * @memberof RTCBaseProvider
   */
  abstract getVideoDevices(): Array<RTCDeviceInfo>;

  /**
   * 获取当前视频采集设备
   *
   * @abstract
   * @return {*}  {string} 视频采集设备的设备ID
   * @memberof RTCBaseProvider
   */
  abstract getCurrentVideoDevice(): string;

  /****************************************************************************
   * 音频基础功能
   ****************************************************************************/
  /**
   * 设置远端音频模式
   *
   * @abstract
   * @param {RTCRemoteAudioMode} mode 1：订阅模式、2：最大三方模式
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract setRemoteAudioMode(mode: RTCRemoteAudioMode): number;
  /**
   * 停止/恢复发送本地音频流
   *
   * @abstract
   * @param {boolean} mute true表示停止，false表示恢复
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /**
   * 停止/恢复接收指定的远端音频流
   *
   * @abstract
   * @param {string} userId 用户ID
   * @param {boolean} mute true表示停止，false表示恢复
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract muteRemoteAudioStream(userId: string, mute: boolean): number;

  /**
   * 停止/恢复接收全部远端音频流，不支持音频订阅模式
   *
   * @abstract
   * @param {boolean} mute true表示停止，false表示恢复设置的topN的音频流
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;
  /**
  * 开启/关闭本地音频采集
  *
  * @abstract
  * @param {boolean} type true表示开启，false表示关闭
  * @return {*}  {number} 0表示调用成功，其它值表示调用失败
  * @memberof RTCBaseProvider
  */
  abstract enableLocalAudio(type: boolean): number;
  /**
   * 设置远端用户音量上报周期
   *
   * @abstract
   * @param {number} interval 音量值上报周期，默认关闭音量回调，单位毫秒
   *  - 0：关闭音量回调。
   *  - [100，10000]：有效值范围，单位：毫秒
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   *
   * *调用该函数后，每隔一段时间(interval)的时间，会收到userVolumeStats回调事件，包含这段时间内说话的用户信息和音量信息。
   * @memberof RTCBaseProvider
   */
  abstract enableUserVolumeNotify(interval: number): number;

  /**
   * 调节音频采集音量
   *
   * @abstract
   * @param {number} volume 0-100，取值为10表示当前音量大小
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract adjustRecordingVolume(volume: number): number;

  /**
   * 调节音频播放音量
   *
   * @abstract
   * @param {number} volume 0-100，取值为10表示当前音量大小
   * @param {string} [userId] 用户Id
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract adjustPlaybackVolume(volume: number, userId?: string): number;
  /**
   * 开启音频自渲染
   *
   * @abstract
   * @param {boolean} localEnable 开启本地音频自渲染，默认sdk渲染
   * @param {boolean} remoteEnable 开启远端音频自渲染，默认sdk渲染
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * *该接口调用成功后，触发playbackAudioFrame回调
   * @memberof RTCBaseProvider
   */
  abstract setExternalAudioFrameOutput(localEnable: boolean, remoteEnable: boolean): number;

  /**
   * 设置是否开启系统音频采集、发送，只能在房间内使用
   *
   * @abstract
   * @param {boolean} enable true表示开启系统音频采集、发送，false表示取消系统音频采集、发送
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract setShareComputerSound(enable: boolean): number;

  /**
   * 设置是否关闭默认自动接收新用户音频流。在加入房间前调用
   *
   * @abstract
   * @param {boolean} mute true表示关闭自动接收，false表示开启自动接收， 默认true关闭接收
   * @return {*}  {number} 0表示调用成功，> 0：方法调用失败
   * @memberof RTCBaseProvider
   */
  abstract setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;

  /****************************************************************************
   * 视频基础功能
   ****************************************************************************/

  /**
   * 开启/关闭本地视频采集
   *
   * @abstract
   * @param {boolean} type true表示开启，false表示关闭
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract enableLocalVideo(type: boolean): number;

  /**
   * 停止/恢复发送本地视频流
   *
   * @abstract
   * @param {boolean} mute true表示停止，false表示恢复
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract muteLocalVideoStream(mute: boolean): number;

  /**
   * 停止/恢复接收指定远端视频流
   *
   * @abstract
   * @param {string} userId 远端用户ID
   * @param {boolean} mute true表示停止，false表示恢复
   * @memberof RTCBaseProvider
   */
  abstract muteRemoteVideoStream(userId: string, mute: boolean): number;

  /**
   * 停止/恢复接收全部远端视频流
   *
   * @abstract
   * @param {boolean} mute true表示停止，false表示恢复
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  abstract setVideoEncParam(encoderparam: RTCVideoEncParam): number;
  /**
   * 是否激活视频流大小流功能，并设置小流的编码参数
   *
   * @abstract
   * @param {boolean} enable 必选，boolean类型。true为激活，false表示不激活
   * @param {RTCVideoEncParam} smallVideoParam 必选，RTCVideoEncParam 类型
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract enableSmallVideoStream(enable: boolean, smallVideoParam: RTCVideoEncParam): number;

  /**
   * 设置默认选看的视频流类型
   *
   * @abstract
   * @param {RTCVideoStreamType} type 必选，HRTCVideoStreamType 类型，0为大流，1为小流。该接口未调用时，默认选看类型为0
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract setPriorRemoteVideoStreamType(type: RTCVideoStreamType): number;

  /**
   * 设置指定远端用户的当前选看的视频流类型
   *
   * @abstract
   * @param {string} userId 用户ID
   * @param {number} type RTCVideoStreamType类型，0为大流，1为小流
   * @memberof RTCBaseProvider
   */
  abstract setRemoteVideoStreamType(userId: string, type: RTCVideoStreamType): number;

  /**
   * 设置视频显示窗口的显示模式
   *
   * @abstract
   * @param {string} userId 用户ID，当设置本地视频的显示模式时，设置为“”
   * @param {RTCDisplayMode} mode 必选，RTCDisplayMode类型，窗口的显示模式。
- 0：表示优先保证视窗被填满。视频尺寸等比缩放，直至整个视窗被视频填
满。如果视频长宽与显示窗口不同，多出的视频将被截掉。
- 1：表示优先保证视频内容全部显示。视频尺寸等比缩放，直至视频窗口的一
边与视窗边框对齐。如果视频长宽与显示窗口不同，视窗上未被填满的区域
将被涂黑。
- 2：表示视频尺寸进行缩放和拉伸以充满显示视窗。
   * @param {boolean} isAux 可选，boolean类型， true表示设置辅流窗口的显示模式，false或空表示设置主流窗口的显示模式
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract setViewDisplayMode(userId: string, mode: RTCDisplayMode, isAux: boolean): number

  /**
   * 开始SparkRTC通话前，开启视频预览
   *
   * @abstract
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract startPreview(): number;

  /**
   * 开始SparkRTC通话前，停止视频预览
   *
   * @abstract
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract stopPreview(): number;
  /**
   * 设置是否开启远端流视图镜像模式
   *
   * @abstract
   * @param {string} userId 用户ID
   * @param {boolean} enable true：开启，false：不开启
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract setRemoteViewMirrorMode(userId: string, enable: boolean): number;

  /**
   * 设置本地视图及本地视图的显示模式
   *
   * @abstract
   * @param {Element} view HTMLElement类型，本地视频流先使用的本地视图
   * @param {*} displayMode 可选，RTCDisplayMode类型，窗口的显示模式
   * @param {*} RTCDisplayMode
     - 0：表示优先保证视窗被填满。视频尺寸等比缩放，直至整个视窗被视频填满。如
    果视频长宽与显示窗口不同，多出的视频将被截掉。
     - 1：表示优先保证视频内容全部显示。视频尺寸等比缩放，直至视频窗口的一边与
    视窗边框对齐。如果视频长宽与显示窗口不同，视窗上未被填满的区域将被涂
    黑。
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract setupLocalView(view: Element, displayMode?: RTCDisplayMode): number;

  /**
   * 设置远端视图窗口并订阅远端主流
   *
   * @abstract
   * @param {string} userId 用户id
   * @param {HTMLDivElement} view div节点
   * @memberof RTCBaseProvider
   */
  abstract startRemoteStreamView(userId: string, view: HTMLDivElement): void;

  /**
   * 取消订阅远端主流
   *
   * @abstract
   * @param {string} userId 远端视频流所属的用户ID
   * @return {*}  {number} 0表示调用成功，其它值表示调用失败
   * @memberof RTCBaseProvider
   */
  abstract stopRemoteStreamView(userId: string): number;

  /**
   * 设置是否默认自动接收新用户视频流。在加入房间前调用
   *
   * @abstract
   * @param {boolean} enable true：关闭自动接收，false：开启自动接收。默认为true。
   * @return {*}  {number} 0表示调用成功，其他表示调用失败
   * * 调用setDefaultMuteAllRemoteVideoStreams设置为false时，调用
muteAllRemoteVideoStreams参数为true时，新加入用户不接收视频流，为false时，
新加入用户自动接收视频流
   * @memberof RTCBaseProvider
   */
  abstract setDefaultMuteAllRemoteVideoStreams(enable: boolean): number;

  /**
   * 设置本地视频镜像模式
   *
   * @abstract
   * @param {RTCVideoMirrorType} mirrorType 必选，RTCVideoMirrorType类型。
        RTCVideoMirrorType: {
        - 0：表示disable，对所有摄像头都不进行镜像处理。
        - 1：表示enable，对所有摄像头都进行镜像处理。
        }
   * @return {*}  {number}
   * @memberof RTCBaseProvider
   */
  abstract setLocalViewMirror(mirrorType: RTCVideoMirrorType): number
  abstract playAudioClip(soundId: number,filePath:string):number
  abstract startAudioFile(filePath:string, playMode: number, cycle: number, replace: number, startPos?:number):number
}
