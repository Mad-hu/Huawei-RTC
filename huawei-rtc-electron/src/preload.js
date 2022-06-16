/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 17:48:06
 * @LastEditTime: 2022-06-14 09:41:00
 * @LastEditors: Yandong Hu
 * @Description:
 */
const electron = require("electron");
const { remote, ipcRenderer } = require("electron");

window.electron_native_module = {
  sdk: {
    HRTCEngine: () => {
      return require("hrtc-electron-sdk");
    },
    bjysdk: () => {
      return require("bjysdk");
    },
    AgoraRtcEngine: () => {
      return require("agora-electron-sdk");
    },
  },
  electron: electron,
  ipcRenderer: ipcRenderer,
  remote: remote
};
