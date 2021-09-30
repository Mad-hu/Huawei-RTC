/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:11:26
 * @LastEditTime: 2021-08-10 14:23:53
 * @LastEditors: Yandong Hu
 * @Description: Electron Render Process
 */

import { Remote } from 'electron';

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
/**
 * 获取remote 对象
 *
 * @return {*}  {Remote}
 */
const getRemote = (): Remote => {
  return electron_render().remote;
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
  if(!window.electron_native_module && isElectron()) {
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


export {
  getRemote,
  getCurrentWindow,
  getScreen,
  getHRTCEngine,
  getBjySdk,
  getBrowserWindow,
  isElectron
}
