/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 15:19:47
 * @LastEditTime: 2021-11-12 10:31:09
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { BrowserWindow, WebPreferences } from "electron";
let mainWindow: BrowserWindow | null = null;
const path = require('path');
const preloadJsPath = process.env.NODE_ENV === 'development' ? '../../preload.js' : './preload.js';
const renderProcessApi = path.join(__dirname, preloadJsPath);
class BrowserWindowServices {
  constructor() {

  }
  /**
   * 创建一个新的BrowserWindow
   *
   * @param {Electron.BrowserWindowConstructorOptions} [opts]
   * @param {WebPreferences} [webPres]
   * @return {*}  {BrowserWindow}
   */
  createBrowserWindow(opts?: Electron.BrowserWindowConstructorOptions, webPres?: WebPreferences): BrowserWindow {
    return new BrowserWindow({
      show: false,
      width: 1280,
      height: 720,
      frame: false,
      resizable: true,
      transparent: true,
      backgroundColor: '#00000000',
      ...opts,
      webPreferences: {
        plugins: true,
        webviewTag: true,
        nodeIntegration: true,
        enableRemoteModule: true,
        ...webPres
      },
    });
  }

  /**
   * 获取主窗口对象
   *
   * @param {Electron.BrowserWindowConstructorOptions} [opts]
   * @param {WebPreferences} [webPres]
   * @return {*}  {BrowserWindow}
   */
  getMainWindow(opts?: Electron.BrowserWindowConstructorOptions, webPres?: WebPreferences): BrowserWindow {
    if (mainWindow) {
      return mainWindow;
    }
    mainWindow = createBrowserWindow(opts, webPres);
    return mainWindow;
  }
  /**
   * 发送消息到主窗口渲染进程
   *
   * @param {string} channel
   * @param {...any[]} args
   */
  sendMsgToMainWindow(channel: string, ...args: any[]) {
    mainWindow!.webContents.send(channel, ...args);
  }

  /**
   * 发送消息到目标窗口渲染进程
   *
   * @param {string} channel
   * @param {...any[]} args
   */
  sendMsgToWindow(win: BrowserWindow, channel: string, ...args: any[]) {
    win.webContents.send(channel, ...args);
  }
}
/**
 * 创建一个新的BrowserWindow
 *
 * @param {Electron.BrowserWindowConstructorOptions} [opts]
 * @param {WebPreferences} [webPres]
 * @return {*}  {BrowserWindow}
 */
const createBrowserWindow = (opts?: Electron.BrowserWindowConstructorOptions, webPres?: WebPreferences): BrowserWindow => {
  return new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    frame: false,
    resizable: true,
    transparent: true,
    backgroundColor: '#00000000',
    ...opts,
    webPreferences: {
      plugins: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: renderProcessApi,
      ...webPres
    },
  });
}

/**
 * 获取主窗口对象
 *
 * @param {Electron.BrowserWindowConstructorOptions} [opts]
 * @param {WebPreferences} [webPres]
 * @return {*}  {BrowserWindow}
 */
const getMainWindow = (opts?: Electron.BrowserWindowConstructorOptions, webPres?: WebPreferences): BrowserWindow => {
  if (mainWindow) {
    return mainWindow;
  }
  mainWindow = createBrowserWindow(opts, webPres);
  return mainWindow;
}
/**
 * 发送消息到主窗口渲染进程
 *
 * @param {string} channel
 * @param {...any[]} args
 */
const sendMsgToMainWindow = (channel: string, ...args: any[]) => {
  mainWindow!.webContents.send(channel, ...args);
}

/**
 * 发送消息到目标窗口渲染进程
 *
 * @param {string} channel
 * @param {...any[]} args
 */
const sendMsgToWindow = (win: BrowserWindow, channel: string, ...args: any[]) => {
  win.webContents.send(channel, ...args);
}


export {
  createBrowserWindow,
  getMainWindow,
  sendMsgToMainWindow,
  sendMsgToWindow
}
