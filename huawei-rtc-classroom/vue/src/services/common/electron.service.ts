/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:11:26
 * @LastEditTime: 2021-11-09 17:43:21
 * @LastEditors: Yandong Hu
 * @Description: Electron Render Process
 */

import { IpcRenderer, Remote } from 'electron';
import semverDiff from 'semver-diff';
let osType: string;
let clientVersion: string;
let appInfo: any;
/**
 * 判断当前环境是否是 Electron
 *
 * @return {*}
 */
const isElectron = () => {
  if (typeof window.electron_render === 'function') {
    return true;
  }
  return false;
}

const getIpcRenderer = () => {
  return <IpcRenderer>electron_native_module.ipcRenderer;
}

/**
 * 获取remote 对象
 *
 * @return {*}  {Remote}
 */
const getRemote = (): Remote => {
  return electron_render().remote;
}
/**
 * 获取当前窗口webContents ID
 *
 * @return {*}
 */
const getCurrentWindowWebContentsId = () => {
  return getRemote().getCurrentWebContents().id;
}
/**
 * 获取当前窗口
 *
 * @return {*}
 */
const getCurrentWindow = () => {
  return getRemote().getCurrentWindow();
}

/**
 * 获取当前screen
 *
 * @return {*}
 */
const getScreen = () => {
  return getRemote().screen;
}

/**
 * 获取窗口创建对象
 *
 * @return {*}
 */
const getBrowserWindow = () => {
  return getRemote().BrowserWindow;
}


/**
 * check env,and native module inject success.
 *
 */
const checkElectronAndNativeModule = () => {
  if (!window.electron_native_module && isElectron()) {
    throw new Error('if you look this error, maybe you forget inject preload.js into webview?')
  }
}

/**
 * 获取华为RTC Electron SDK对象
 *
 * @return {*}
 */
const getHRTCEngine = () => {
  checkElectronAndNativeModule();
  return window.electron_native_module.sdk.HRTCEngine.default;
}

/**
 * 获取百家云Electron SDK对象
 *
 * @return {*}
 */
const getBjySdk = () => {
  checkElectronAndNativeModule();
  return window.electron_native_module.sdk.bjysdk;
}
/**
 * 获取系统类型
 *
 * @return {*} win32 | drawin | linux
 */
const getOSType = () => {
  if(!process) return 'web';
  return process.platform;
}

/**
 * 获取系统名称
 *
 * @return {*} windows | mac | linux
 */
const getOSPublicName = () => {
  switch (getOSType()) {
    case 'win32':
      return 'windows';
    case 'darwin':
      return 'mac';
    case 'linux':
      return 'linux';
    default:
      return getOSType();
  }
}

// 是否windows
const isWin = () => {
  if (!isElectron()) {
    return false;
  }
  return getOSType() === 'win32';
}
/**
 * 获取
 *
 * @return {*}
 */
const getAppInfo = () => {
  if (appInfo) return appInfo;
  appInfo = get_app_info();
  return appInfo;
}
/**
 * 获取electron客户端版本号
 *
 * @return {*}
 */
const getElectronClientVersion = () => {
  if (isElectron()) {
    if (clientVersion) {
      return clientVersion;
    }
    clientVersion = getAppInfo().app_version + '';
    return getAppInfo().app_version + '';
  } else {
    throw new Error('is Not electron environment.');
  }
}
/**
 * 比较当前客户端版本与提供的版本进行比较。
 * exp: 当前功能最低要求客户端版本为minimumSupportVersion 2.1.13，客户端本身版本不能低于2.1.13，如果低于2.1.13返回 false，说明这个功能不能在此版本客户端上用。否则返回true
 * @param {string} minimumSupportVersion 当前功能最低支持版本
 * @returns
 * @memberof ClientVersionService
 */
const supportVersion = (minimumSupportVersion: string) => {
  if (isElectron()) {
    const version = getElectronClientVersion() + '';
    if (version == minimumSupportVersion) {
      return true;
    }
    if (semverDiff(minimumSupportVersion, version)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export {
  getRemote,
  getCurrentWindow,
  getScreen,
  getHRTCEngine,
  getBjySdk,
  getBrowserWindow,
  isElectron,
  supportVersion,
  getElectronClientVersion,
  getAppInfo,
  isWin,
  getOSPublicName,
  getOSType,
  getIpcRenderer,
  getCurrentWindowWebContentsId
}
