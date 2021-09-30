"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:11:26
 * @LastEditTime: 2021-08-10 14:23:53
 * @LastEditors: Yandong Hu
 * @Description: Electron Render Process
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElectron = exports.getBrowserWindow = exports.getBjySdk = exports.getHRTCEngine = exports.getScreen = exports.getCurrentWindow = exports.getRemote = void 0;
/**
 * 判断当前环境是否是 Electron
 *
 * @return {*}
 */
var isElectron = function () {
    if (typeof window.electron_render === 'function') {
        return true;
    }
    return false;
};
exports.isElectron = isElectron;
/**
 * 获取remote 对象
 *
 * @return {*}  {Remote}
 */
var getRemote = function () {
    return electron_render().remote;
};
exports.getRemote = getRemote;
/**
 * 获取当前窗口
 *
 * @return {*}
 */
var getCurrentWindow = function () {
    return getRemote().getCurrentWindow();
};
exports.getCurrentWindow = getCurrentWindow;
/**
 * 获取当前screen
 *
 * @return {*}
 */
var getScreen = function () {
    return getRemote().screen;
};
exports.getScreen = getScreen;
/**
 * 获取窗口创建对象
 *
 * @return {*}
 */
var getBrowserWindow = function () {
    return getRemote().BrowserWindow;
};
exports.getBrowserWindow = getBrowserWindow;
/**
 * check env,and native module inject success.
 *
 */
var checkElectronAndNativeModule = function () {
    if (!window.electron_native_module && isElectron()) {
        throw new Error('if you look this error, maybe you forget inject preload.js into webview?');
    }
};
/**
 * 获取华为RTC Electron SDK对象
 *
 * @return {*}
 */
var getHRTCEngine = function () {
    checkElectronAndNativeModule();
    return window.electron_native_module.sdk.HRTCEngine.default;
};
exports.getHRTCEngine = getHRTCEngine;
/**
 * 获取百家云Electron SDK对象
 *
 * @return {*}
 */
var getBjySdk = function () {
    checkElectronAndNativeModule();
    return window.electron_native_module.sdk.bjysdk;
};
exports.getBjySdk = getBjySdk;
