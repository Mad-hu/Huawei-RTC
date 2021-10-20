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
export {
  setSetting,
  getSetting
}
