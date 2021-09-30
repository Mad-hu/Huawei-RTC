/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:08:31
 * @LastEditTime: 2021-09-30 11:43:02
 * @LastEditors: Yandong Hu
 * @Description: 百家云sdk
 */


import { EventEmitter } from 'events';
import { getBjySdk, getBrowserWindow, getCurrentWindow, getScreen } from "../electron.service";
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


export const msgType: ControlEventType = {
  notic: 'notic',
  session: 'session',
  address: 'address',
  error: 'error'
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
  sendMsgEvent = (eventName: string, msg: string) => {
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
      this.sendMsgEvent(msgType.notic, '初始化成功');
      return true;
    } else {
      this.sendMsgEvent(msgType.error, '初始化失败');
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
      this.sendMsgEvent(msgType.notic, '销毁成功');
      return true;
    } catch (error) {
      this.sendMsgEvent(msgType.error, '销毁失败');
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
      this.sendMsgEvent(msgType.notic, '登录成功');
      return;
    }
    this.sendMsgEvent(msgType.error, '登录失败');
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
          this.sendMsgEvent(msgType.notic, '创建远程会话成功');
          this.sendMsgEvent(msgType.session, session);
          return session;
        } else {
          this.sendMsgEvent(msgType.error, '设置远程会话回调失败');
          throw new Error('设置远程会话回调失败')
        }
      } else {
        this.sendMsgEvent(msgType.error, '创建远程会话失败');
        throw new Error('创建远程会话失败');
      }
    } else {
      this.sendMsgEvent(msgType.error, '无效的被控端实例');
      throw new Error('无效的被控端实例');
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
        this.sendMsgEvent(msgType.notic, '销毁远程会话成功');
        this.sendMsgEvent(msgType.session, '');
      }
    } else {
      this.sendMsgEvent(msgType.error, '无效的被控端实例');
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
        this.sendMsgEvent(msgType.notic, '连接服务器成功');
      } else if (event == 1) {
        this.sendMsgEvent(msgType.notic, '与服务器断开连接');
      } else if (event == 2) {
        this.sendMsgEvent(msgType.notic, '登录服务器成功');
        var address = bjysdk.getClientAddress(slclient);
        this.sendMsgEvent(msgType.address, address);
      } else if (event == 3) {
        this.sendMsgEvent(msgType.notic, '登录服务器失败');
      } else if (event == 4) {
        this.sendMsgEvent(msgType.notic, '通道数已用完');
      } else if (event == 5) {
        this.sendMsgEvent(msgType.notic, '服务器检查通道数失败');
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
        this.sendMsgEvent(msgType.notic, '桌面会话已连接');
        bjysdk.clientStartChat(slclient, desktopsession, false);
      } else if (event == 2) {
        this.sendMsgEvent(msgType.notic, '桌面会话已断开');
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
      this.sendMsgEvent(msgType.notic, '初始化成功');
    } else {
      this.sendMsgEvent(msgType.error, '初始化失败');
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
      this.sendMsgEvent(msgType.notic, '销毁成功');
    } catch (error) {
      this.sendMsgEvent(msgType.error, '销毁失败');
    }
  }

  /**
   * 发起远程连接
   *
   * @param {*} message
   */
  public createDesktop = (message: any) => {
    if (slremote != slRemoteInvalid) {
      if (desktopsession != slSessionInvalid) {
        bjysdk.destroyRemoteSession(slremote, desktopsession);
        desktopsession = slSessionInvalid;
      }
      desktopsession = bjysdk.createRemoteEmptySession(slremote, 0);
      if (desktopsession != slSessionInvalid) {
        var jsonObj = JSON.parse(message);
        var address = jsonObj.address;
        var session = jsonObj.session;
        this.createRemoteWindows();
        var hwnd = remoteWin!.getNativeWindowHandle();
        if (bjysdk.setRemoteSessionOpt(slremote, desktopsession, 1, hwnd, hwnd.length)) {
          this.moveDesktopPos();
          if (bjysdk.setRemoteSessionOpt(slremote, desktopsession, 2, this.slremoteDesktopSessionCallback.bind(this), 0)) {
            if (bjysdk.connectRemoteSession(slremote, desktopsession, address, session)) {
              this.sendMsgEvent(msgType.notic, '连接远程会话成功');
            } else {
              this.sendMsgEvent(msgType.error, '连接远程会话失败');
            }
          } else {
            this.sendMsgEvent(msgType.error, '设置远程会话回调失败');
          }
        } else {
          this.sendMsgEvent(msgType.error, '设置窗口句柄失败');
        }
      } else {
        this.sendMsgEvent(msgType.error, '创建远程会话失败');
      }
    } else {
      this.sendMsgEvent(msgType.error, '无效的被控端实例');
    }
  }

  /**
   * 创建远程桌面窗口
   *
   */
  private createRemoteWindows() {
    remoteWin = null;
    const BrowserWindow = getBrowserWindow();
    remoteWin = new BrowserWindow({ width: 866, height: 600 });
    remoteWin.setMenu(null);
    remoteWin.setTitle("远程桌面");
    remoteWin.on('close', () => {
      remoteWin = null;
      if (slremote != slRemoteInvalid && desktopsession != slSessionInvalid) {
        bjysdk.destroyRemoteSession(slremote, desktopsession);
        desktopsession = slSessionInvalid;
        this.sendMsgEvent(msgType.notic, '销毁远程桌面成功');
      }
    });
    remoteWin.on('resize', () => {
      remoteWin!.reload();
      this.moveDesktopPos();
    });
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
      this.sendMsgEvent(msgType.notic, event == 0 ? "桌面会话已连接" : "桌面会话已断开");
      if (event == 0) {
        var hwnd = remoteWin!.getNativeWindowHandle();
        bjysdk.setDesktopSessionVisible(slremote, desktopsession, hwnd);
      } else if (remoteWin) {
        remoteWin.close();
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
  private slremoteDesktopSessionCallback(session: any, event: any, data: any) {
    if (session == desktopsession) {
      if (event == 1) {
        this.sendMsgEvent(msgType.notic, '桌面会话已连接');
      } else if (event == 2) {
        this.sendMsgEvent(msgType.notic, '桌面会话已断开');
      }
    }
  }

  /**
   * 设置远程桌面相对位置
   *
   */
  private moveDesktopPos() {
    var rc = remoteWin!.getContentBounds();
    if (process.platform == "win32") {
      var scaleFactor = getScreen().getPrimaryDisplay().scaleFactor;
      bjysdk.setDesktopSessionPos(slremote, desktopsession, 0, 0, parseInt(rc.width * scaleFactor + ''), parseInt(rc.height * scaleFactor + ''));
    } else {
      bjysdk.setDesktopSessionPos(slremote, desktopsession, rc.x, rc.y, rc.width, rc.height);
    }
  }
}
