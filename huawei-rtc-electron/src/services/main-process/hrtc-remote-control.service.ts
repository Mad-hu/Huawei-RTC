/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 11:00:29
 * @LastEditTime: 2021-10-22 11:14:50
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { BrowserWindow, screen } from "electron";
const slsdk = require('bjysdk');
//向日葵sdk的一些变量
const slRemoteInvalid = "0";
const slSessionInvalid = -1;
let slremote = slRemoteInvalid;
let desktopsession = slSessionInvalid;
var initslsdk = false;


let remoteSoundsession          = slSessionInvalid;
let dataStreamsession          = slSessionInvalid;
let fileTranssession          = slSessionInvalid;
let portTransfersession          = slSessionInvalid;

let sfileId;//建议以map管理(Object)
let rfileId;//建议放map管理
let tempMessage;

let fileWin;
let portWin;//ip端口配置对话框窗口
let dataStreamWin;//远程数据

let remoteWin: BrowserWindow | null;
let mainWindow: BrowserWindow | null;
function initRemoteSDK(mWin: BrowserWindow) {
  mainWindow = mWin;
  //初始化向日葵SDK环境
  if(slsdk.initialize()){
    slremote = slsdk.createRemote();
    if(slremote != slRemoteInvalid){
        slsdk.setRemoteCallback(slremote,slremoteCallback);
        slsdk.openRemoteLog(slremote,"./log");
        initslsdk = true;
    }
  }
}
//发起远程连接
function createDesktop(message: any){
  if(slremote != slRemoteInvalid){
      if(desktopsession != slSessionInvalid){
          slsdk.destroyRemoteSession(slremote,desktopsession);
          desktopsession = slSessionInvalid;
      }
      desktopsession = slsdk.createRemoteEmptySession(slremote, 0);
      if(desktopsession != slSessionInvalid){
          var jsonObj = JSON.parse(message);
          var address = jsonObj.address;
          var session = jsonObj.session;
          createRemoteWindows();
          var hwnd = remoteWin!.getNativeWindowHandle();
          if(slsdk.setRemoteSessionOpt(slremote, desktopsession,1,hwnd,hwnd.length)){
              moveDesktopPos();
              if(slsdk.setRemoteSessionOpt(slremote, desktopsession,2,slremoteDesktopSessionCallback,0)){
                  if (slsdk.connectRemoteSession(slremote, desktopsession, address, session)){
                      mainWindow!.webContents.send('controlEvent', "notify", "连接远程会话成功!!!");
                  }else{
                      mainWindow!.webContents.send('controlEvent', "notify", "连接远程会话失败!!!");
                  }
              }else{
                  mainWindow!.webContents.send('controlEvent', "notify", "设置远程会话回调失败!!!");
              }
          }else{
              mainWindow!.webContents.send('controlEvent', "notify", "设置窗口句柄失败!!!");
          }
      }else{
          mainWindow!.webContents.send('controlEvent', "notify", "创建远程会话失败!!!");
      }
  }else{
      mainWindow!.webContents.send('controlEvent', "notify", "无效的被控端实例!!!");
  }
}

//创建远程桌面窗口
function createRemoteWindows(){
  remoteWin = null;
  remoteWin = new BrowserWindow({width:800,height:600});
  remoteWin.setMenu(null);
  remoteWin.setTitle("远程桌面");
  remoteWin.maximize();
  remoteWin.on('close',() => {
      remoteWin = null;
      if(slremote != slRemoteInvalid && desktopsession != slSessionInvalid){
          slsdk.destroyRemoteSession(slremote,desktopsession);
          desktopsession = slSessionInvalid;
          mainWindow!.webContents.send('controlEvent', "destroy", "销毁远程桌面成功!!!");
      }
  });
  remoteWin.on('resize',() => {
      remoteWin!.reload();
      moveDesktopPos();
  });
}

//远程事件回调
function slremoteCallback(remote: any, session: any, event: any){
  if(session == desktopsession){
    if(event == 0) {
      mainWindow!.webContents.send('controlEvent', "notify", "桌面会话已连接!!!" );
    }else {
      mainWindow!.webContents.send('controlEvent', "destroy", "桌面会话已断开!!!");
    }
      if(event == 0){
          var hwnd = remoteWin!.getNativeWindowHandle();
          slsdk.setDesktopSessionVisible(slremote,desktopsession,hwnd);
      }else if(remoteWin){
          remoteWin.close();
      }
  }
}

//远程连接会话回调
function slremoteDesktopSessionCallback(session: any, event: any, data: any){
  if(session == desktopsession){
      if(event == 1){
          mainWindow!.webContents.send('controlEvent', "notify", "桌面会话已连接!!!");
      }else if(event == 2)
          mainWindow!.webContents.send('controlEvent', "notify", "桌面会话已断开!!!");
  }
}

//设置远程桌面相对位置
function moveDesktopPos(){
  var rc = remoteWin!.getContentBounds();
  if (process.platform == "win32"){
      var scaleFactor = screen.getPrimaryDisplay().scaleFactor;
      slsdk.setDesktopSessionPos(slremote,desktopsession,0,0,parseInt(`${rc.width*scaleFactor}`),parseInt(`${rc.height*scaleFactor}`));
  } else {
      slsdk.setDesktopSessionPos(slremote,desktopsession,rc.x,rc.y,rc.width,rc.height);
  }
}
export {
  createDesktop,
  initRemoteSDK
}
