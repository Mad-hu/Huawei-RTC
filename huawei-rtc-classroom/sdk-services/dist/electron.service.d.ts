import { Remote } from 'electron';
/**
 * 判断当前环境是否是 Electron
 *
 * @return {*}
 */
declare const isElectron: () => boolean;
/**
 * 获取remote 对象
 *
 * @return {*}  {Remote}
 */
declare const getRemote: () => Remote;
/**
 * 获取当前窗口
 *
 * @return {*}
 */
declare const getCurrentWindow: () => Electron.BrowserWindow;
/**
 * 获取当前screen
 *
 * @return {*}
 */
declare const getScreen: () => Electron.Screen;
/**
 * 获取窗口创建对象
 *
 * @return {*}
 */
declare const getBrowserWindow: () => typeof Electron.BrowserWindow;
/**
 * 获取华为RTC Electron SDK对象
 *
 * @return {*}
 */
declare const getHRTCEngine: () => any;
/**
 * 获取百家云Electron SDK对象
 *
 * @return {*}
 */
declare const getBjySdk: () => any;
export { getRemote, getCurrentWindow, getScreen, getHRTCEngine, getBjySdk, getBrowserWindow, isElectron };
