/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 17:48:06
 * @LastEditTime: 2021-10-19 17:07:20
 * @LastEditors: Yandong Hu
 * @Description:
 */
let bjysdk = null;
const openRemoteControl = true;
const HRTCEngine = require('hrtc-electron-sdk') ;
if(openRemoteControl) {
  bjysdk = require('bjysdk');
}

const electron_render_obj = require('electron');

window.electron_render = ()=> {
  return electron_render_obj;
}
window.electron_native_module = {
  sdk: {
    HRTCEngine,
    bjysdk
  }
};
