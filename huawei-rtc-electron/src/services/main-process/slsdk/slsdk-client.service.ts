/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:08:31
 * @LastEditTime: 2022-04-11 13:51:27
 * @LastEditors: Yandong Hu
 * @Description: 百家云sdk
 */

import { BrowserWindow } from 'electron';
import slsdkService, {
  RemoteControlMsgCodeType,
  RemoteMsgType,
} from './slsdk.service';

// 百家云sdk的一些变量
const slClientInvalid = '0'; // 创建以后返回成功标识 ‘0’ 失败
const slSessionInvalid = -1;
let slclient = slClientInvalid;
let desktopsession = slSessionInvalid;
let clientAddress = '';

let mainWindow: BrowserWindow;

/**
 * sdk 状态发送
 *
 * @param {string} eventName
 * @param {string} msg
 */
function sendMsgEvent(eventName: string, msg: any) {
  mainWindow!.webContents.send('controlClientEvent', eventName, msg);
}
/**
 * 设置被控端发送事件窗口
 *
 * @param {BrowserWindow} mWin
 */
function setMainWindow(mWin: BrowserWindow) {
  mainWindow = mWin;
}
/**
 * 被控制端初始化
 *
 * @return {*} true success, false failed
 */
function init() {
  try {
    if (slsdkService.getInitState()) {
      slclient = slsdkService.slsdkEngine.createClient();
      if (slclient != slClientInvalid) {
        slsdkService.slsdkEngine.setClientCallback(slclient, slclientCallback);
        slsdkService.slsdkEngine.openClientLog(slclient, './slsdk-client-log');
      }
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.InitSuccess,
        msg: '初始化成功',
      });
      return true;
    } else {
      sendMsgEvent(RemoteMsgType.error, {
        code: RemoteControlMsgCodeType.InitFailed,
        msg: '初始化失败',
      });
      return false;
    }
  } catch (error) {
    console.error('远程控制初始化Error：', error);
    return false;
  }
}
/**
 * 销毁百家云SDK控制端环境
 *
 * @return {*} true success, false failed
 */
function destroy() {
  try {
    if (slclient != slClientInvalid) {
      destroyDesktopsession();
      slsdkService.slsdkEngine.destroyClient(slclient);
      slclient = slClientInvalid;
    }
    sendMsgEvent(RemoteMsgType.notic, {
      code: RemoteControlMsgCodeType.DestorySuccess,
      msg: '销毁成功',
    });
    return true;
  } catch (error) {
    sendMsgEvent(RemoteMsgType.error, {
      code: RemoteControlMsgCodeType.DestoryFailed,
      msg: '销毁失败',
    });
    return false;
  }
}

/**
 * 登录独立服务器
 *
 * @param {string} message JSON String
 * @return {*}
 */
function login(openid: string, openkey: string) {
  try {
    if (slclient != slClientInvalid) {
      slsdkService.slsdkEngine.clientLoginWithOpenID(
        `${slclient}`,
        `${openid}`,
        `${openkey}`,
        '',
        0
      );
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.LoginSuccess,
        msg: '登录成功',
      });
      return;
    }
    sendMsgEvent(RemoteMsgType.error, {
      code: RemoteControlMsgCodeType.LoginFailed,
      msg: '登录失败',
    });
  } catch (error) {
    console.error('远程控制登录Error：', error);
  }
}

/**
 * master client create desktop session
 *
 */
function createDesktopsession() {
  try {
    if (slclient != slClientInvalid) {
      if (desktopsession != slSessionInvalid) {
        slsdkService.slsdkEngine.destroyClientSession(slclient, desktopsession);
        desktopsession = slSessionInvalid;
      }
      desktopsession = slsdkService.slsdkEngine.createClientSession(
        slclient,
        0
      );
      if (desktopsession != slSessionInvalid) {
        if (
          slsdkService.slsdkEngine.setClientSessionOpt(
            slclient,
            desktopsession,
            2,
            slclientDesktopSessionCallback,
            0
          )
        ) {
          var session = slsdkService.slsdkEngine.getClientSessionName(
            slclient,
            desktopsession
          );
          sendMsgEvent(RemoteMsgType.notic, {
            code: RemoteControlMsgCodeType.CreateRemoteSessionSuccess,
            msg: '创建远程会话成功',
          });
          sendMsgEvent(RemoteMsgType.session, {
            code: RemoteControlMsgCodeType.GetSessionSuccess,
            msg: '获取session成功',
            session: session,
          });
          // if (clientAddress != '') {
          //   sendMsgEvent(RemoteMsgType.address, {
          //     code: RemoteControlMsgCodeType.GetClientAddress,
          //     msg: '获取客户端地址',
          //     address: clientAddress,
          //   });
          // }
          return session;
        } else {
          sendMsgEvent(RemoteMsgType.error, {
            code: RemoteControlMsgCodeType.SetRemoteSessionCallbackFailed,
            msg: '设置远程会话回调失败',
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
  } catch (error) {
    console.log('createDesktopsession error:', error);
  }
}

/**
 * master client destroy Desktop session
 *
 */
function destroyDesktopsession() {
  if (slclient != slClientInvalid) {
    if (desktopsession != slSessionInvalid) {
      slsdkService.slsdkEngine.destroyClientSession(slclient, desktopsession);
      desktopsession = slSessionInvalid;
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.DestoryRemoteSessionSuccess,
        msg: '销毁远程会话成功',
      });
      sendMsgEvent(RemoteMsgType.session, {
        code: RemoteControlMsgCodeType.ResetSession,
        msg: '重置session code',
        session: '',
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
 * 被控端事件回调
 *
 * @param {*} client
 * @param {*} event
 */
function slclientCallback(client: any, event: any) {
  if (client == slclient) {
    if (event == 0) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.ServerConnectSuccess,
        msg: '连接服务器成功',
      });
    } else if (event == 1) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.ServerDisConnect,
        msg: '与服务器断开连接',
      });
    } else if (event == 2) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.ServerLoginSuccess,
        msg: '登录服务器成功',
      });
      clientAddress = slsdkService.slsdkEngine.getClientAddress(slclient);
      sendMsgEvent(RemoteMsgType.address, {
        code: RemoteControlMsgCodeType.GetClientAddress,
        msg: '获取客户端地址',
        address: clientAddress,
      });
    } else if (event == 3) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.ServerLoginFailed,
        msg: '登录服务器失败',
      });
    } else if (event == 4) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.ServerPiplineRunOut,
        msg: '通道数已用完',
      });
    } else if (event == 5) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.ServerCheckPiplineFaile,
        msg: '服务器检查通道数失败',
      });
    }
  }
}

/**
 * 远程连接会话回调
 *
 * @param {*} session
 * @param {*} event
 * @param {*} data
 */
function slclientDesktopSessionCallback(session: any, event: any, data: any) {
  if (session == desktopsession) {
    if (event == 1) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.DesktopSessionConnectSuccess,
        msg: '桌面会话已连接',
      });
      slsdkService.slsdkEngine.clientStartChat(slclient, desktopsession, 0);
    } else if (event == 2) {
      sendMsgEvent(RemoteMsgType.notic, {
        code: RemoteControlMsgCodeType.DesktopSessionDisconnect,
        msg: '桌面会话已断开',
      });
    }
  }
}
const slsdkClientService = {
  setMainWindow,
  init,
  destroy,
  login,
  createDesktopsession,
  destroyDesktopsession,
};
export default slsdkClientService;
