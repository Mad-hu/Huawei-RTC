/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-15 17:25:03
 * @LastEditTime: 2021-10-20 11:04:53
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { SettingState, SettingType } from "../state-manager/setting-state.service";
import { UserInfoState, UserRole } from "../state-manager/user-state.service";
import { getStorage, setStorage } from "../storage.service";
import { RtcService } from "../common/rtc.service";
import { RTCEventType, RTCDeviceInfo } from "../common/abstract/rtc.abstract";

let settingMemory: SettingType;
/**
 * 本地存储设置
 *
 * @param {UserRole} role 用户身份
 * @param {SettingType} config 用户设置
 */
const storageRoleSetting = (role: UserRole, config: SettingType) => {
  settingMemory = SettingState(config);
  setStorage(`setting_${role}`, settingMemory);
}
/**
 * 老师身份设置
 *
 * @return {*}
 */
const setTeacherRole = () => {
  // 这样配置以后，就不会显示基础教室信息了
  SettingState().base.info = true;
  SettingState().video.allMuteVideoBtnVisible = true;
  SettingState().audio.allMuteAudioBtnVisible = true;
  SettingState().audio.muteAudioLockBtnVisible = true;

  SettingState().screen.visible = true;
  SettingState().screen.screenShareBtnVisible = true;
  SettingState().screen.allShareScreen = true;
  storageRoleSetting(UserRole.teacher, SettingState());
  return SettingState();
}
/**
 * 学生身份设置
 *
 * @return {*}
 */
const setStudentRole = () => {
  SettingState().base.info = false;

  SettingState().video.allMuteVideo = true;
  SettingState().video.allMuteVideoBtnVisible = false;
  SettingState().audio.allMuteAudio = false;
  SettingState().audio.allMuteAudioBtnVisible = false;
  SettingState().audio.muteAudioLockBtnVisible = false;

  SettingState().screen.visible = true;
  SettingState().screen.screenShareBtnVisible = true;
  storageRoleSetting(UserRole.student, SettingState());
  return SettingState();
}

/**
 * 观众身份配置
 *
 * @return {*}
 */
const setAudienceRole = () => {
  SettingState().base.info = false;

  SettingState().video.allMuteVideo = true;
  SettingState().video.allMuteVideoBtnVisible = false;
  SettingState().video.videoInputBtnVisible = false;
  SettingState().video.muteVideo = true;

  SettingState().audio.allMuteAudio = false;
  SettingState().audio.allMuteAudioBtnVisible = false;
  SettingState().audio.muteAudioLockBtnVisible = false;
  SettingState().audio.muteInputAudio = true;
  storageRoleSetting(UserRole.audience, SettingState());
  return SettingState();
}

/**
 * 获取用户设置配置项
 *
 * @param {UserRole} role 用户身份
 * @return {*}
 */
const getSetting = (role: UserRole = UserInfoState.role) => {
  if(settingMemory) {
    return settingMemory;
  }
  // 检查本地存储的setting
  const settingLocal = getStorage(`setting_${role}`);
  if(settingLocal) {
    settingMemory = SettingState(settingLocal);
    return settingMemory;
  }
  // 创建默认权限setting
  switch(role) {
    case UserRole.teacher:
      return setTeacherRole();
    case UserRole.student:
      return setStudentRole();
    case UserRole.audience:
      return setAudienceRole();
  }
}

/**
 * 用户基础设置本地存储
 *
 * @param {UserRole} role 用户身份
 * @param {SettingType} config 用户自定义配置项
 */
const setSetting = (role: UserRole, config: SettingType) => {
  storageRoleSetting(role, config);
}
/**
 * 获取音频采集设备列表
 */
const getAudioRecordingDevices = ()=>{
  return RtcService().getAudioRecordingDevices()
}

/**
 * 获取当前音频采集设备
 */
const getCurrentAudioRecordingDevice = ():string => {
  return RtcService().getCurrentAudioRecordingDevice()
}

/**
 * 获取音频播放设备列表
 */
 const getAudioPlaybackDevices = () => {
  return RtcService().getAudioPlaybackDevices()
}

/**
 * 获取当前音频播放设备
 */
 const getCurrentAudioPlaybackDevice = ():string => {
  return RtcService().getCurrentAudioPlaybackDevice()
}
/**
 * 音频监听
 */
const localVolumeChanged = (fn: (...args: any[]) => void):void=> {
  RtcService().on(RTCEventType.localVolumeChanged,fn)
}
/**
 * 调节音频采集音量
 * @param volume
 */
const adjustRecordingVolume = (volume:number):number=>{
  return RtcService().adjustRecordingVolume(volume)
}
/**
 * 获取当前音频采集设备音量
 * @returns {Number}
 */
const getAudioRecordingVolume = ():number=>{
  return RtcService().getAudioRecordingVolume()
}
/**
 * 设置音频播放的音量，取值范围为[0,100]
 * @param {Number} number
 * @returns
 */
const setAudioPlaybackVolume = (number:number):number=>{
  return RtcService().setAudioPlaybackVolume(number)
}
/**
 * 获取视频采集设备列表
 * @returns {Array<RTCDeviceInfo>}
 */
const getVideoDevices = ():RTCDeviceInfo[]=>{
  return RtcService().getVideoDevices()
}
/**
 * 获取当前视频采集设备
 * @returns
 */
const getCurrentVideoDevice = ():string=>{
  return RtcService().getCurrentVideoDevice()
}
/**
 * 设置视频设备
 * @param deviceId
 * @returns
 */
const setVideoDevice = (deviceId: string):number=>{
  return RtcService().setVideoDevice(deviceId)
}
/**
 * 设置音频采集设备。
 * @param deviceId
 * @returns
 */
const setAudioRecordingDevice = (deviceId: string):number=>{
  return RtcService().setAudioRecordingDevice(deviceId)
}
/**
 * 设置音频播放设备
 */
const setAudioPlaybackDevice = (deviceId: string):number=>{
  return RtcService().setAudioPlaybackDevice(deviceId)
}
/**
 * 开启/关闭本地音频采集
 * @param enable
 * @returns
 */
const enableLocalAudio = (enable: boolean):number=>{
  return RtcService().enableLocalAudio(enable)
}
/**
 * 开启/关闭本地视频采集
 * @param enable
 * @returns
 */
const enableLocalVideo = (enable: boolean):number=>{
  return RtcService().enableLocalVideo(enable)
}
/**
 * 获取用户RTC加入房间的id，id不采用用户原有id，是通过原有id再进行加工得到。保证重复用户，也能够正常进入房间
 */
const getUserLocalId = ()=>{
  return RtcService().getUserLocalId()
}
/**
 * 设置远端用户音量上报周期
 * @param interva 
 */
const enableUserVolumeNotify = (interva: number)=>{
  RtcService().enableUserVolumeNotify(interva)
}
/**
 * 本地用户音频状态已改变事件通知。
 * @param fn 
 */
const localAudioStateChanged = (fn: (...args: any[]) => void)=>{
  RtcService().on('localAudioStateChanged',fn)
}
/**
 * 本地用户视频状态已改变事件通知。
 * @param fn 
 */
const localVideoStateChanged = (fn: (...args: any[]) => void)=>{
  RtcService().on('localVideoStateChanged',fn)
}
/**
 * 停止/恢复接收指定远端视频流
 * @param userId 
 * @param mute 
 */
const muteRemoteVideoStream = (userId:string,mute:boolean)=>{
  return RtcService().muteRemoteVideoStream(userId,mute)
}
/**
 * 网络质量监听
 * @param fn 
 */
const networkQuality = (fn: (...args: any[]) => void)=>{
  RtcService().on('networkQuality',fn)
}
/**
 * 本地/远端的音频流统计信息的事件通知。
 * @param fn 
 */
const audioStats = (fn: (...args: any[]) => void)=>{
  RtcService().on('audioStats',fn)
}
/**
 * 本地/远端的视频频流统计信息的事件通知。
 * @param fn 
 */
const videoStats = (fn: (...args: any[]) => void)=>{
  RtcService().on('videoStats',fn)
}
export {
  setSetting,
  getSetting,
  getAudioRecordingDevices,
  getCurrentAudioRecordingDevice,
  localVolumeChanged,
  getAudioPlaybackDevices,
  getCurrentAudioPlaybackDevice,
  adjustRecordingVolume,
  getAudioRecordingVolume,
  setAudioPlaybackVolume,
  getVideoDevices,
  getCurrentVideoDevice,
  setVideoDevice,
  setAudioRecordingDevice,
  setAudioPlaybackDevice,
  enableLocalAudio,
  getUserLocalId,
  enableLocalVideo,
  enableUserVolumeNotify,
  localAudioStateChanged,
  localVideoStateChanged,
  muteRemoteVideoStream,
  networkQuality,
  audioStats,
  videoStats,
}
