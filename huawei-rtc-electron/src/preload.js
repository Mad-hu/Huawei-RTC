/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 17:48:06
 * @LastEditTime: 2021-11-12 10:29:03
 * @LastEditors: Yandong Hu
 * @Description:
 */
const HRTCEngine = require('hrtc-electron-sdk') ;
const electron = require('electron');
const remote = electron.remote;
const ipcRenderer = electron.ipcRenderer;

let bjysdk = null;
const openRemoteControl = true;

if(openRemoteControl) {
  bjysdk = require('bjysdk');
}

window.electron_render = ()=> {
  return electron;
}
window.electron_native_module = {
  sdk: {
    HRTCEngine,
    bjysdk
  },
  electron: electron,
  ipcRenderer: ipcRenderer,
  remote: remote
};
