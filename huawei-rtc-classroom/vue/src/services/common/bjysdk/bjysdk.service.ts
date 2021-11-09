/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:08:31
 * @LastEditTime: 2021-11-04 15:11:38
 * @LastEditors: Yandong Hu
 * @Description: 百家云sdk
 */


import { EventEmitter } from 'events';
import { getBjySdk, getCurrentWindow } from "../electron.service";
import { ControlEventType } from './bjysdk.service.interface';

let win: any;
let bjysdk: any;
// 百家云sdk的一些变量
const slClientInvalid = "0"; // 创建以后返回成功标识 ‘0’ 失败
const slSessionInvalid = -1;
let slclient = slClientInvalid;
let desktopsession = slSessionInvalid;
var initbjysdk = false;
const slRemoteInvalid = "0";
let slremote = slRemoteInvalid;
var initbjysdk = false;
let remoteWin: any;


export const RemoteMsgType: ControlEventType = {
  notic: 'notic',
  session: 'session',
  address: 'address',
  error: 'error',
  destroy: 'destroy'
}

/**
 * 远程控制SDK消息回调类型
 *
 * @enum {number}
 */
enum RemoteControlMsgCodeType {
  /**
   * 初始化成功
   */
  InitSuccess = 1000,
  /**
   * 初始化失败
   */
  InitFailed = 1999,
  /**
   * 登录成功
   */
  LoginSuccess = 2000,
  /**
   * 登录失败
   */
  LoginFailed = 2999,
  /**
   * 销毁成功
   */
  DestorySuccess = 9000,
  /**
   * 销毁失败
   */
  DestoryFailed = 9999,
  /**
   * 销毁远程桌面成功
   */
  DestoryRemoteDesktopSuccess = 9100,
  /**
   * 创建远程会话成功
   */
  CreateRemoteSessionSuccess = 3000,
  /**
   * 创建远程会话失败
   */
  CreateRemoteSessionFailed = 3999,
  /**
   * 设置远程会话回调失败
   */
  SetRemoteSessionCallbackFailed = 3199,
  /**
   * 无效的被控端实例
   */
  InvalidSessionInstance = 3299,
  /**
   * 销毁远程会话成功
   */
  DestoryRemoteSessionSuccess = 4000,
  /**
   * 获取客户端地址
   */
  GetClientAddress = 300,
  /**
   * 获取session成功
   */
  GetSessionSuccess = 200,
  /**
   * 重置session code
   */
  ResetSession = 201,
  /**
   * 连接服务器成功
   */
  ServerConnectSuccess = 5000,
  /**
   * 与服务器断开连接
   */
  ServerDisConnect = 5555,
  /**
   * 登录服务器成功
   */
  ServerLoginSuccess = 5100,
  /**
   * 登录服务器失败
   */
  ServerLoginFailed = 5199,
  /**
   * 通道数已用完
   */
  ServerPiplineRunOut = 5299,
  /**
   * 服务器检查通道数失败
   */
  ServerCheckPiplineFaile = 5219,
  /**
   * 桌面会话已连接
   */
  DesktopSessionConnectSuccess = 6000,
  /**
   * 桌面会话已断开
   */
  DesktopSessionDisconnect = 6999,
  /**
   * 连接远程会话成功
   */
  ConnectRemoteSessionSuccess = 7000,
  /**
   * 连接远程会话失败
   */
  DisconnectRemoteSession = 7999,
  /**
   * 设置窗口句柄失败
   */
  SetWindowHandleFailed = 8999,
}
export interface RemoteControlEventMsgType {
  code: RemoteControlMsgCodeType,
  msg: string,
  session?: string,
  address?: string
}
/**
 * 百家云 远程控制sdk
 *
 * @export
 * @class BjyRemoteControlSDKService
 * @extends {EventEmitter}
 */
export default class BjyRemoteControlSDKService extends EventEmitter {
  /**
   * sdk 状态发送
   *
   * @param {string} eventName
   * @param {string} msg
   */
  sendMsgEvent = (eventName: string, msg: RemoteControlEventMsgType) => {
    console.log('BjyRemoteControlSDKService event:', msg);
    this.emit(eventName, msg);
  }

  /**
   * 百家云sdk控制端初始化
   *
   * @return {*} true success, false failed
   */
  public bjysdkClientInit() {
    bjysdk = getBjySdk();
    if(!bjysdk) {
      throw new Error('not found bjysdk, please check native preload !');
    }
    if (bjysdk.initialize()) {
      slclient = bjysdk.createClient();
      if (slclient != slClientInvalid) {
        bjysdk.setClientCallback(slclient, this.slclientCallback.bind(this));
        bjysdk.openClientLog(slclient, "./log");
        initbjysdk = true;
        win = getCurrentWindow();
      }
    }
    if (initbjysdk) {
      this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.InitSuccess, msg:'初始化成功'});
      return true;
    } else {
      this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.InitFailed, msg: '初始化失败'});
      return false;
    }
  }
  /**
   * 销毁百家云SDK控制端环境
   *
   * @return {*} true success, false failed
   */
  public destroyClientBjysdk() {
    try {
      if (slclient != slClientInvalid) {
        if (desktopsession != slSessionInvalid) {
          bjysdk.destroyClientSession(slclient, desktopsession);
          desktopsession = slSessionInvalid;
        }
        bjysdk.destroyClient(slclient);
        slclient = slClientInvalid;
      }
      bjysdk.uninitialize();
      initbjysdk = false;
      this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DestorySuccess, msg: '销毁成功'});
      return true;
    } catch (error) {
      this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.DestoryFailed, msg: '销毁失败'});
      return false;
    }
  }


  /**
   * 登录独立服务器
   *
   * @param {string} message JSON String
   * @return {*}
   */
  public login(openid: string, openkey: string) {
    const mode = '0';
    if (slclient != slClientInvalid) {
      bjysdk.clientLoginWithOpenID(slclient,openid,openkey,"",false);
      // bjysdk.clientLoginWithLicense(slclient, openid, openkey);
      this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.LoginSuccess, msg: '登录成功'});
      return;
    }
    this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.LoginFailed, msg: '登录失败'});
  }

  /**
   * master client create desktop session
   *
   * @param {*} message
   */
  public createDesktopsession = (message: any) => {
    if (slclient != slClientInvalid) {
      if (desktopsession != slSessionInvalid) {
        bjysdk.destroyClientSession(slclient, desktopsession);
        desktopsession = slSessionInvalid;
      }
      desktopsession = bjysdk.createClientSession(slclient, 0);
      if (desktopsession != slSessionInvalid) {
        if (bjysdk.setClientSessionOpt(slclient, desktopsession, 2, this.slclientDesktopSessionCallback.bind(this), 0)) {
          var session = bjysdk.getClientSessionName(slclient, desktopsession);
          this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.CreateRemoteSessionSuccess, msg: '创建远程会话成功'});
          this.sendMsgEvent(RemoteMsgType.session, {code: RemoteControlMsgCodeType.GetSessionSuccess, msg: '获取session成功', session: session});
          return session;
        } else {
          this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.SetRemoteSessionCallbackFailed, msg: '设置远程会话回调失败'});
        }
      } else {
        this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.CreateRemoteSessionFailed, msg: '创建远程会话失败'});
      }
    } else {
      this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.InvalidSessionInstance, msg: '无效的被控端实例'});
    }
  }

  /**
   * master client destroy Desktop session
   *
   * @param {*} message
   */
  public destroyDesktopsession(message: any) {
    if (slclient != slClientInvalid) {
      if (desktopsession != slSessionInvalid) {
        bjysdk.destroyClientSession(slclient, desktopsession);
        desktopsession = slSessionInvalid;
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DestoryRemoteSessionSuccess, msg: '销毁远程会话成功'});
        this.sendMsgEvent(RemoteMsgType.session, {code: RemoteControlMsgCodeType.ResetSession, msg: '重置session code', session: ''});
      }
    } else {
      this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.InvalidSessionInstance, msg: '无效的被控端实例'});
    }
  }

  /**
   * 被控端事件回调
   *
   * @param {*} client
   * @param {*} event
   */
  slclientCallback(client: any, event: any) {
    if (client == slclient) {
      if (event == 0) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.ServerConnectSuccess, msg: '连接服务器成功'});
      } else if (event == 1) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.ServerDisConnect, msg: '与服务器断开连接'});
      } else if (event == 2) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.ServerLoginSuccess, msg: '登录服务器成功'});
        var address = bjysdk.getClientAddress(slclient);
        this.sendMsgEvent(RemoteMsgType.address, {code: RemoteControlMsgCodeType.GetClientAddress,msg: '获取客户端地址', address: address});
      } else if (event == 3) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.ServerLoginFailed, msg: '登录服务器失败'});
      } else if (event == 4) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.ServerPiplineRunOut, msg: '通道数已用完'});
      } else if (event == 5) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.ServerCheckPiplineFaile, msg: '服务器检查通道数失败'});
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
  slclientDesktopSessionCallback(session: any, event: any, data: any) {
    if (session == desktopsession) {
      if (event == 1) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DesktopSessionConnectSuccess, msg: '桌面会话已连接'});
        bjysdk.clientStartChat(slclient, desktopsession, false);
      } else if (event == 2) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DesktopSessionDisconnect, msg: '桌面会话已断开'});
      }

    }
  }
  /**
   * 初始化百家云SDK环境
   *
   */
  public bjysdkRemoteInit() {
    bjysdk = getBjySdk();
    if(!bjysdk) {
      throw new Error('not found bjysdk, please check native preload !');
    }
    if (bjysdk.initialize()) {
      slremote = bjysdk.createRemote();
      if (slremote != slRemoteInvalid) {
        bjysdk.setRemoteCallback(slremote, this.slremoteCallback.bind(this));
        bjysdk.openRemoteLog(slremote, "./log");
        initbjysdk = true;
        // win = getCurrentWindow();
      }
    }
    if (initbjysdk) {
      this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.InitSuccess, msg: '初始化成功'});
    } else {
      this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.InitFailed, msg: '初始化失败'});
    }
  }
  /**
   * 销毁百家云SDK环境
   *
   */
  public destroyRemoteBjysdk = () => {
    try {
      if (slremote != slRemoteInvalid) {
        if (desktopsession != slSessionInvalid) {
          bjysdk.destroyRemoteSession(slremote, desktopsession);
          desktopsession = slSessionInvalid;
        }
        bjysdk.destroyRemote(slremote);
        slremote = slRemoteInvalid;
      }
      bjysdk.uninitialize();
      initbjysdk = false;
      this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DestorySuccess, msg: '销毁成功'});
    } catch (error) {
      this.sendMsgEvent(RemoteMsgType.error, {code: RemoteControlMsgCodeType.DestoryFailed, msg: '销毁失败'});
    }
  }

  /**
   * 远程事件回调
   *
   * @param {*} remote
   * @param {*} session
   * @param {*} event
   */
  private slremoteCallback(remote: any, session: any, event: any) {
    if (session == desktopsession) {
      if(event == 0) {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DesktopSessionConnectSuccess, msg: '桌面会话已连接'});
      } else {
        this.sendMsgEvent(RemoteMsgType.notic, {code: RemoteControlMsgCodeType.DesktopSessionDisconnect, msg: '桌面会话已断开'});
      }

      if (event == 0) {
        var hwnd = remoteWin!.getNativeWindowHandle();
        bjysdk.setDesktopSessionVisible(slremote, desktopsession, hwnd);
      } else if (remoteWin) {
        remoteWin.close();
      }
    }
  }
}
