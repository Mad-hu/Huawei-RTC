/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 15:19:47
 * @LastEditTime: 2021-12-27 14:53:08
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { BrowserWindow, ipcMain, WebPreferences } from "electron";
const path = require('path');

let windowLists = new Map();
const preloadPath = process.env.NODE_ENV === 'development'? '../../preload.js' : './preload.js';
const preloadRealPath = path.join(__dirname, preloadPath);
/**
 * 创建一个新的BrowserWindow
 *
 * @param {Electron.BrowserWindowConstructorOptions} [opts]
 * @param {WebPreferences} [webPreferences]
 * @return {*}  {BrowserWindow}
 */
const createBrowserWindow = (opts:Electron.BrowserWindowConstructorOptions = {}, webPreferences:WebPreferences = {}, url = '') => {
  console.log('createBrowserWindow', opts, webPreferences, url);
  const bw = new BrowserWindow({
    show: false,
    center: true,
    frame: false,
    width: 1133,
    height: 771,
    hasShadow: false,
    transparent: true,
    // maximizable: false,
    backgroundColor: '#00000000',
    titleBarStyle: process.platform == 'darwin'? 'customButtonsOnHover': 'hidden',
    ...opts,
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      allowRunningInsecureContent: true,
      plugins: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: preloadRealPath,
      ...webPreferences
    },
  });
  if(url != '') {
    bw.loadURL(url);
  }
  windowLists.set(opts.title, bw);
  return bw;
}

/**
 * 销毁目标窗口，并从窗口列表清空
 *
 * @param {*} title
 */
function destroyTargetWindow(title: string) {
  const win = getTargetWindow(title);
  if(win) {
    win.close();
    removeTargetWindow(title);
  }
}
/**
 * 获取title对应的窗口对象
 *
 * @param {*} title
 * @return {*}
 */
function getTargetWindow(title: string) {
  return windowLists.get(title);
}
function removeTargetWindow(title: string) {
  windowLists.delete(title);
}

/**
 * 发送消息到目标窗口渲染进程
 *
 * @param {string} channel
 * @param {...any[]} args
 */
const sendMsgToTargetWindow = (win: BrowserWindow, channel: string, ...args: any[]) => {
  win.webContents.send(channel, ...args);
}

export {
  createBrowserWindow,
  sendMsgToTargetWindow,
  getTargetWindow,
  destroyTargetWindow
}
