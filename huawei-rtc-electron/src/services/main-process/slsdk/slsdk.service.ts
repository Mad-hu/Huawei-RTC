/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2022-04-08 17:44:52
 * @LastEditTime: 2022-04-11 13:51:40
 * @LastEditors: Yandong Hu
 * @Description:
 */
const slsdkEngine = require('bjysdk');

const RemoteMsgType = {
  notic: 'notic',
  session: 'session',
  address: 'address',
  error: 'error',
  destroy: 'destroy',
};
const RemoteControlMsgCodeType = {
  /**
   * 初始化成功
   */
  InitSuccess: 1000,
  /**
   * 初始化失败
   */
  InitFailed: 1999,
  /**
   * 登录成功
   */
  LoginSuccess: 2000,
  /**
   * 登录失败
   */
  LoginFailed: 2999,
  /**
   * 销毁成功
   */
  DestorySuccess: 9000,
  /**
   * 销毁失败
   */
  DestoryFailed: 9999,
  /**
   * 销毁远程桌面成功
   */
  DestoryRemoteDesktopSuccess: 9100,
  /**
   * 创建远程会话成功
   */
  CreateRemoteSessionSuccess: 3000,
  /**
   * 创建远程会话失败
   */
  CreateRemoteSessionFailed: 3999,
  /**
   * 设置远程会话回调失败
   */
  SetRemoteSessionCallbackFailed: 3199,
  /**
   * 无效的被控端实例
   */
  InvalidSessionInstance: 3299,
  /**
   * 销毁远程会话成功
   */
  DestoryRemoteSessionSuccess: 4000,
  /**
   * 获取客户端地址
   */
  GetClientAddress: 300,
  /**
   * 获取session成功
   */
  GetSessionSuccess: 200,
  /**
   * 重置session code
   */
  ResetSession: 201,
  /**
   * 连接服务器成功
   */
  ServerConnectSuccess: 5000,
  /**
   * 与服务器断开连接
   */
  ServerDisConnect: 5555,
  /**
   * 登录服务器成功
   */
  ServerLoginSuccess: 5100,
  /**
   * 登录服务器失败
   */
  ServerLoginFailed: 5199,
  /**
   * 通道数已用完
   */
  ServerPiplineRunOut: 5299,
  /**
   * 服务器检查通道数失败
   */
  ServerCheckPiplineFaile: 5219,
  /**
   * 桌面会话已连接
   */
  DesktopSessionConnectSuccess: 6000,
  /**
   * 桌面会话已断开
   */
  DesktopSessionDisconnect: 6999,
  /**
   * 连接远程会话成功
   */
  ConnectRemoteSessionSuccess: 7000,
  /**
   * 连接远程会话失败
   */
  DisconnectRemoteSession: 7999,
  /**
   * 设置窗口句柄失败
   */
  SetWindowHandleFailed: 8999,
};

let initState = false;
function init() {
  if (!initState) {
    const res = slsdkEngine.initialize();
    initState = res == 1 ? true : false;
  }
}
function getInitState() {
  return initState;
}

function uninstall() {
  slsdkEngine.uninitialize();
}

const slsdkService = {
  init,
  slsdkEngine,
  getInitState,
  uninstall
};
export default slsdkService;
export { RemoteMsgType, RemoteControlMsgCodeType };
