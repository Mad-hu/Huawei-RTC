/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 11:00:29
 * @LastEditTime: 2022-04-12 11:57:52
 * @LastEditors: Yandong Hu
 * @Description: 远程控制主控端
 */

import { BrowserWindow, screen } from 'electron';
import { createBrowserWindow } from '../browser-window.services';
import slsdkService, {
  RemoteControlMsgCodeType,
  RemoteMsgType,
} from './slsdk.service';

//向日葵sdk创建返回值
const slRemoteInvalid = '0';
const slSessionInvalid = -1;
let slremote = slRemoteInvalid;
let desktopsession = slSessionInvalid;
let initslsdk = false;

let remoteWin: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

/**
 * 关闭主控端控制窗口
 *
 */
function closeRemoteWindow() {
  remoteWin && remoteWin.close();
}

/**
 * 设置主控端发送事件的窗口
 *
 * @param {BrowserWindow} mWin
 */
function setRemoteSDKRenderMainWindow(mWin: BrowserWindow) {
  mainWindow = mWin;
}

/**
 * sdk 状态发送
 *
 * @param {string} eventName
 * @param {string} msg
 */
function sendMsgEvent(eventName: string, msg: any) {
  mainWindow!.webContents.send('controlRemoteEvent', eventName, msg);
}

/**
 * 初始化主控端环境
 *
 */
function initRemoteSDK() {
  if (slsdkService.getInitState()) {
    slremote = slsdkService.slsdkEngine.createRemote();
    if (slremote != slRemoteInvalid) {
      slsdkService.slsdkEngine.setRemoteCallback(slremote, slremoteCallback);
      slsdkService.slsdkEngine.openRemoteLog(slremote, './slsdk-remote-log');
      initslsdk = true;
    }
    sendMsgEvent(RemoteMsgType.notic, {
      code: RemoteControlMsgCodeType.InitSuccess,
      msg: '初始化成功',
    });
  } else {
    sendMsgEvent(RemoteMsgType.error, {
      code: RemoteControlMsgCodeType.InitFailed,
      msg: '初始化失败',
    });
  }
}
/**
 * 发起远程连接
 *
 * @param {string} message
 */
function createDesktop(message: string) {
  console.log('createDesktop');
  if (slremote != slRemoteInvalid) {
    if (desktopsession != slSessionInvalid) {
      slsdkService.slsdkEngine.destroyRemoteSession(slremote, desktopsession);
      desktopsession = slSessionInvalid;
    }
    desktopsession = slsdkService.slsdkEngine.createRemoteEmptySession(
      slremote,
      0
    );
    if (desktopsession != slSessionInvalid) {
      var jsonObj = JSON.parse(message);
      var address = jsonObj.address;
      var session = jsonObj.session;
      createRemoteWindows();
      var hwnd = remoteWin!.getNativeWindowHandle();
      if (
        slsdkService.slsdkEngine.setRemoteSessionOpt(
          slremote,
          desktopsession,
          1,
          hwnd,
          hwnd.length
        )
      ) {
        moveDesktopPos();
        if (
          slsdkService.slsdkEngine.setRemoteSessionOpt(
            slremote,
            desktopsession,
            2,
            slremoteDesktopSessionCallback,
            0
          )
        ) {
          if (
            slsdkService.slsdkEngine.connectRemoteSession(
              slremote,
              desktopsession,
              address,
              session
            )
          ) {
            sendMsgEvent(RemoteMsgType.notic, {
              code: RemoteControlMsgCodeType.ConnectRemoteSessionSuccess,
              msg: '连接远程会话成功',
            });
          } else {
            sendMsgEvent(RemoteMsgType.error, {
              code: RemoteControlMsgCodeType.DisconnectRemoteSession,
              msg: '连接远程会话失败',
            });
          }
        } else {
          sendMsgEvent(RemoteMsgType.error, {
            code: RemoteControlMsgCodeType.SetRemoteSessionCallbackFailed,
            msg: '设置远程会话回调失败',
          });
        }
      } else {
        sendMsgEvent(RemoteMsgType.error, {
          code: RemoteControlMsgCodeType.SetWindowHandleFailed,
          msg: '设置窗口句柄失败',
        });
      }
    } else {
      sendMsgEvent(RemoteMsgType.error, {
        code: RemoteControlMsgCodeType.CreateRemoteSessionFailed,
        msg: '创建远程会话失败',
      });
    }
  } else {
    sendMsgEvent(RemoteMsgType.error, {
      code: RemoteControlMsgCodeType.InvalidSessionInstance,
      msg: '无效的被控端实例',
    });
  }
}

/**
 * 创建远程桌面窗口
 *
 */
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
    maximizable: true,
    titleBarStyle: 'default',
  });
  remoteWin.setMenu(null);
  remoteWin.setTitle('远程桌面');
  remoteWin.maximize();
  remoteWin.center();
  remoteWin.on('close', () => {
    remoteWin = null;
    if (slremote != slRemoteInvalid && desktopsession != slSessionInvalid) {
      slsdkService.slsdkEngine.destroyRemoteSession(slremote, desktopsession);
      desktopsession = slSessionInvalid;
      sendMsgEvent(RemoteMsgType.destroy, {
        code: RemoteControlMsgCodeType.DestoryRemoteDesktopSuccess,
        msg: '销毁远程桌面成功',
      });
    }
  });
  remoteWin.on('resize', () => {
    remoteWin!.reload();
    moveDesktopPos();
  });
}

/**
 * 远程事件回调
 *
 * @param {*} _remote
 * @param {number} session
 * @param {number} event
 */
function slremoteCallback(_remote: any, session: number, event: number) {
  if (session == desktopsession) {
    if (event == 0) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.DesktopSessionConnectSuccess,
        msg: '桌面会话已连接',
      });
    } else {
      sendMsgEvent(RemoteMsgType.destroy, {
        code: RemoteControlMsgCodeType.DesktopSessionDisconnect,
        msg: '桌面会话已断开',
      });
    }
    if (event == 0) {
      var hwnd = remoteWin!.getNativeWindowHandle();
      slsdkService.slsdkEngine.setDesktopSessionVisible(
        slremote,
        desktopsession,
        hwnd
      );
    } else if (remoteWin) {
      remoteWin.close();
    }
  }
}

//远程连接会话回调
function slremoteDesktopSessionCallback(
  session: number,
  event: number,
  _data: any
) {
  if (session == desktopsession) {
    if (event == 1) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.DesktopSessionConnectSuccess,
        msg: '桌面会话已连接',
      });
      slsdkService.slsdkEngine.hideRemoteDesktopToolbarItem(
        slremote,
        desktopsession,
        [0]
      );
    } else if (event == 2) {
      sendMsgEvent(RemoteMsgType.destroy, {
        code: RemoteControlMsgCodeType.DesktopSessionDisconnect,
        msg: '桌面会话已断开',
      });
    }
  }
}

/**
 * 销毁主控端
 *
 */
function destroy() {
  if (slremote != slRemoteInvalid) {
    if (desktopsession != slSessionInvalid) {
      slsdkService.slsdkEngine.destroyRemoteSession(slremote, desktopsession);
      desktopsession = slSessionInvalid;
    }
    slsdkService.slsdkEngine.destroyRemote(slremote);
    slremote = slRemoteInvalid;
  }
  initslsdk = false;
  mainWindow!.webContents.send('controlRemoteEvent', 'notic', {
    code: 9000,
    msg: '销毁成功',
  });
}

/**
 * 设置远程桌面相对位置
 *
 */
function moveDesktopPos() {
  var rc = remoteWin!.getContentBounds();
  if (process.platform == 'win32') {
    const windowBounds = remoteWin!.getBounds();
    const currentHoverDisplay = screen.getDisplayMatching(windowBounds);
    const scaleFactor = currentHoverDisplay.scaleFactor;
    slsdkService.slsdkEngine.setDesktopSessionPos(
      slremote,
      desktopsession,
      0,
      0,
      parseInt(`${rc.width * scaleFactor}`),
      parseInt(`${rc.height * scaleFactor}`)
    );
  } else {
    slsdkService.slsdkEngine.setDesktopSessionPos(
      slremote,
      desktopsession,
      rc.x,
      rc.y,
      rc.width,
      rc.height
    );
  }
}

const slsdkRemoteService = {
  createDesktop,
  initRemoteSDK,
  setRemoteSDKRenderMainWindow,
  closeRemoteWindow,
  destroy,
};
export default slsdkRemoteService;
