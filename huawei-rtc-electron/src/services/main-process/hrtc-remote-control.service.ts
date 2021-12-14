/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 11:00:29
 * @LastEditTime: 2021-12-02 17:30:38
 * @LastEditors: Yandong Hu
 * @Description:
 */

import {
  BrowserWindow,
  screen
} from "electron";
import { createBrowserWindow } from "./browser-window.services";
const slsdk = require('bjysdk');
//向日葵sdk的一些变量
const slRemoteInvalid = "0";
const slSessionInvalid = -1;
let slremote = slRemoteInvalid;
let desktopsession = slSessionInvalid;
var initslsdk = false;

let remoteWin: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

function closeRemoteWindow() {
  remoteWin && remoteWin.close();
}

function setRemoteSDKRenderMainWindow(mWin: BrowserWindow) {
  mainWindow = mWin;
}

function initRemoteSDK() {
  //初始化向日葵SDK环境
  if (slsdk.initialize()) {
    slremote = slsdk.createRemote();
    if (slremote != slRemoteInvalid) {
      slsdk.setRemoteCallback(slremote, slremoteCallback);
      slsdk.openRemoteLog(slremote, "./slsdklog");
      initslsdk = true;
    }
  }
}
//发起远程连接
function createDesktop(message: string) {
  if (slremote != slRemoteInvalid) {
    if (desktopsession != slSessionInvalid) {
      slsdk.destroyRemoteSession(slremote, desktopsession);
      desktopsession = slSessionInvalid;
    }
    desktopsession = slsdk.createRemoteEmptySession(slremote, 0);
    if (desktopsession != slSessionInvalid) {
      var jsonObj = JSON.parse(message);
      var address = jsonObj.address;
      var session = jsonObj.session;
      createRemoteWindows();
      var hwnd = remoteWin!.getNativeWindowHandle();
      if (slsdk.setRemoteSessionOpt(slremote, desktopsession, 1, hwnd, hwnd.length)) {
        moveDesktopPos();
        if (slsdk.setRemoteSessionOpt(slremote, desktopsession, 2, slremoteDesktopSessionCallback, 0)) {
          if (slsdk.connectRemoteSession(slremote, desktopsession, address, session)) {
            mainWindow!.webContents.send('controlEvent', "notify", {
              code: 7000,
              msg: "连接远程会话成功"
            });
          } else {
            mainWindow!.webContents.send('controlEvent', "notify", {
              code: 7999,
              msg: "连接远程会话失败"
            });
          }
        } else {
          mainWindow!.webContents.send('controlEvent', "notify", {
            code: 3199,
            msg: "设置远程会话回调失败!!!"
          });
        }
      } else {
        mainWindow!.webContents.send('controlEvent', "notify", {
          code: 8999,
          msg: "设置窗口句柄失败"
        });
      }
    } else {
      mainWindow!.webContents.send('controlEvent', "notify", {
        code: 3999,
        msg: "创建远程会话失败"
      });
    }
  } else {
    mainWindow!.webContents.send('controlEvent', "notify", {
      code: 3299,
      msg: "无效的被控端实例"
    });
  }
}

//创建远程桌面窗口
function createRemoteWindows() {
  remoteWin = null;
  remoteWin = createBrowserWindow({
    minWidth: 800,
    minHeight: 500,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    title: '远程桌面',
    frame: true,
    transparent: false,
    backgroundColor: '#FFF',
    show: true,
    titleBarStyle: 'default',
  });
  remoteWin.setMenu(null);
  remoteWin.setTitle("远程桌面");
  remoteWin.maximize();
  remoteWin.center();
  remoteWin.on('close', () => {
    remoteWin = null;
    if (slremote != slRemoteInvalid && desktopsession != slSessionInvalid) {
      slsdk.destroyRemoteSession(slremote, desktopsession);
      desktopsession = slSessionInvalid;
      mainWindow!.webContents.send('controlEvent', "destroy", {
        code: 9100,
        msg: "销毁远程桌面成功"
      });
    }
  });
  remoteWin.on('resize', () => {
    remoteWin!.reload();
    moveDesktopPos();
  });
}

//远程事件回调
function slremoteCallback(_remote: any, session: number, event: number) {
  if (session == desktopsession) {
    if (event == 0) {

      mainWindow!.webContents.send('controlEvent', "notify", {
        code: 6000,
        msg: "桌面会话已连接"
      });
      slsdk.hideRemoteDesktopToolbarItem(slremote, desktopsession, [0]);
    } else {
      mainWindow!.webContents.send('controlEvent', "destroy", {
        code: 6999,
        msg: "桌面会话已断开"
      });
    }
    if (event == 0) {
      var hwnd = remoteWin!.getNativeWindowHandle();
      slsdk.setDesktopSessionVisible(slremote, desktopsession, hwnd);
    } else if (remoteWin) {
      remoteWin.close();
    }
  }
}

//远程连接会话回调
function slremoteDesktopSessionCallback(session: number, event: number, data: any) {
  if (session == desktopsession) {
    if (event == 1) {
      mainWindow!.webContents.send('controlEvent', "notify", {
        code: 6000,
        msg: "桌面会话已连接"
      });
    } else if (event == 2) {
      mainWindow!.webContents.send('controlEvent', "destroy", {
        code: 6999,
        msg: "桌面会话已断开"
      });
    }
  }
}

//设置远程桌面相对位置
function moveDesktopPos() {
  var rc = remoteWin!.getContentBounds();
  if (process.platform == "win32") {
    var scaleFactor = screen.getPrimaryDisplay().scaleFactor;
    slsdk.setDesktopSessionPos(slremote, desktopsession, 0, 0, parseInt(`${rc.width*scaleFactor}`), parseInt(`${rc.height*scaleFactor}`));
  } else {
    slsdk.setDesktopSessionPos(slremote, desktopsession, rc.x, rc.y, rc.width, rc.height);
  }
}
export {
  createDesktop,
  initRemoteSDK,
  setRemoteSDKRenderMainWindow,
  closeRemoteWindow
}
