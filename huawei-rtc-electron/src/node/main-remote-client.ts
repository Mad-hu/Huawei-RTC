// import { BrowserWindow, ipcMain, screen } from "electron";
// import { getMainWindow, sendMsgToMainWindow } from "./create-window";

// let win: BrowserWindow | null = null;
// const bjysdkPath = process.env.NODE_ENV === 'development' ? '../sdk/bjysdk/platform/win32/bjysdk' : './sdk/bjysdk/platform/win32/bjysdk';
// let bjysdk = require(bjysdkPath);


// //百家云sdk的一些变量
// const slClientInvalid = "0"; // 创建以后返回成功标识 ‘0’ 失败
// const slSessionInvalid = -1;
// let slclient = slClientInvalid;
// let desktopsession = slSessionInvalid;
// var initbjysdk = false;

// //百家云sdk的一些变量
// const slRemoteInvalid = "0";
// let slremote = slRemoteInvalid;
// var initbjysdk = false;

// let ipcRemoteMsgInit = false;
// let ipcClientMsgInit = false;

// let remoteWin: BrowserWindow | null;

// const controlEventName = 'ControlEvent';
// interface ControlEventType {
//   notic: string,
//   session: string,
//   address: string,
//   error: string,
// }
// const msgType: ControlEventType = {
//   notic: 'notic',
//   session: 'session',
//   address: 'address',
//   error: 'error'
// }

// //初始化百家云SDK环境
// export const bjysdkClientInit = () => {
//   if(bjysdk.initialize()){
//     slclient = bjysdk.createClient();
//     if(slclient != slClientInvalid){
//       bjysdk.setClientCallback(slclient, slclientCallback);
//       bjysdk.openClientLog(slclient,"./log");
//       initbjysdk = true;
//       win = getMainWindow();
//       ipcClientMsg();
//     }
//   }
//   if(initbjysdk) {
//     sendMsgToMainWindow(controlEventName, msgType.notic, '初始化成功');
//   }else {
//     sendMsgToMainWindow(controlEventName, msgType.error, '初始化失败');
//   }
// }
// export const destoryClientBjysdk = () => {
//   // 销毁百家云SDK环境
//   try {
//     if(slclient != slClientInvalid){
//       if(desktopsession != slSessionInvalid){
//         bjysdk.destroyClientSession(slclient, desktopsession);
//         desktopsession = slSessionInvalid;
//       }
//       bjysdk.destroyClient(slclient);
//       slclient = slClientInvalid;
//     }
//     bjysdk.uninitialize();
//     initbjysdk = false;
//     sendMsgToMainWindow(controlEventName, msgType.notic, '销毁成功');
//   } catch (error) {
//     sendMsgToMainWindow(controlEventName, msgType.error, '销毁失败');
//   }
// }
// const ipcClientMsg = () => {
//   if(ipcClientMsgInit) {
//     return;
//   }
//   ipcClientMsgInit = true;
//   //ipc通信部分
//   ipcMain.on('mainEvent', (event: any, type: any, message: any) => {
//     switch(type){
//       case "login":login(message);break;
//       case "createDesktopsession":message == "create"?createDesktopsession(message):destroyDesktopsession(message);break;
//     }
//   });
// }

// //登陆
// function login(message: any){
//   if(slclient != slClientInvalid){
//     var jsonObj = JSON.parse(message);
//     var openid = jsonObj.openid;
//     var openkey = jsonObj.openkey;
//     bjysdk.clientLoginWithLicense(slclient,openid,openkey);
//     sendMsgToMainWindow(controlEventName, msgType.notic, '登录成功');
//     return;
//   }
//   sendMsgToMainWindow(controlEventName, msgType.error, '登录失败');
// }

// function createDesktopsession(message: any){
//   if(slclient != slClientInvalid){
//       if(desktopsession != slSessionInvalid){
//         bjysdk.destroyClientSession(slclient,desktopsession);
//         desktopsession = slSessionInvalid;
//       }
//       desktopsession = bjysdk.createClientSession(slclient, 0);
//       if(desktopsession != slSessionInvalid){
//         if(bjysdk.setClientSessionOpt(slclient, desktopsession,2,slclientDesktopSessionCallback,0)){
//           var session = bjysdk.getClientSessionName(slclient, desktopsession);
//           sendMsgToMainWindow(controlEventName, msgType.notic, '创建远程会话成功');
//           sendMsgToMainWindow(controlEventName, msgType.session, session);
//         }else{
//           sendMsgToMainWindow(controlEventName, msgType.error, '设置远程会话回调失败');
//         }
//       }else{
//         sendMsgToMainWindow(controlEventName, msgType.error, '创建远程会话失败');
//       }
//   }else{
//     sendMsgToMainWindow(controlEventName, msgType.error, '无效的被控端实例');
//   }
// }

// function destroyDesktopsession(message: any){
//   if(slclient != slClientInvalid){
//       if(desktopsession != slSessionInvalid){
//         bjysdk.destroyClientSession(slclient,desktopsession);
//         desktopsession = slSessionInvalid;
//         sendMsgToMainWindow(controlEventName, msgType.notic, '销毁远程会话成功');
//         sendMsgToMainWindow(controlEventName, msgType.session, '');
//       }
//   }else{
//     sendMsgToMainWindow(controlEventName, msgType.error, '无效的被控端实例');
//   }
// }

// //被控端事件回调
// function slclientCallback(client: any, event: any){
//   if(client == slclient){
//       if(event == 0){
//         sendMsgToMainWindow(controlEventName, msgType.notic, '连接服务器成功');
//       }else if(event == 1){
//         sendMsgToMainWindow(controlEventName, msgType.notic, '与服务器断开连接');
//       }else if(event == 2){
//         sendMsgToMainWindow(controlEventName, msgType.notic, '登陆服务器成功');
//           var address = bjysdk.getClientAddress(slclient);
//         sendMsgToMainWindow(controlEventName, msgType.address, address);
//       }else if(event == 3){
//         sendMsgToMainWindow(controlEventName, msgType.notic, '登陆服务器失败');
//       }else if(event == 4){
//         sendMsgToMainWindow(controlEventName, msgType.notic, '通道数已用完');
//       }else if(event == 5){
//         sendMsgToMainWindow(controlEventName, msgType.notic, '服务器检查通道数失败');
//       }
//   }
// }

// //远程连接会话回调
// function slclientDesktopSessionCallback(session: any, event: any, data: any){
//   if(session == desktopsession){
//     if(event == 1){
//       sendMsgToMainWindow(controlEventName, msgType.notic, '桌面会话已连接');
//       bjysdk.clientStartChat(slclient, desktopsession, false);
//     }else if(event == 2) {
//       sendMsgToMainWindow(controlEventName, msgType.notic, '桌面会话已断开');
//     }

//   }
// }

// const bjysdkRemoteInit = () => {
//   //初始化百家云SDK环境
//   if(bjysdk.initialize()){
//     slremote = bjysdk.createRemote();
//     if(slremote != slRemoteInvalid){
//         bjysdk.setRemoteCallback(slremote,slremoteCallback);
//         bjysdk.openRemoteLog(slremote,"./log");
//         initbjysdk = true;
//         win = getMainWindow();
//         ipcMsgRemote();
//     }
//   }
//   if(initbjysdk) {
//     sendMsgToMainWindow(controlEventName, msgType.notic, '初始化成功');
//   }else {
//     sendMsgToMainWindow(controlEventName, msgType.error, '初始化失败');
//   }
// }
// const destoryRemoteBjysdk = () => {
//   try {
//     //销毁百家云SDK环境
//     if(slremote != slRemoteInvalid){
//       if(desktopsession != slSessionInvalid){
//           bjysdk.destroyRemoteSession(slremote, desktopsession);
//           desktopsession = slSessionInvalid;
//       }
//       bjysdk.destroyRemote(slremote);
//       slremote = slRemoteInvalid;
//     }
//     bjysdk.uninitialize();
//     initbjysdk = false;
//     sendMsgToMainWindow(controlEventName, msgType.notic, '销毁成功');
//   } catch (error) {
//     sendMsgToMainWindow(controlEventName, msgType.error, '销毁失败');
//   }
// }

// const ipcMsgRemote = () => {
//   if(ipcRemoteMsgInit) {
//     return;
//   }
//   ipcRemoteMsgInit = true;
//   //ipc通信部分
//   ipcMain.on('mainEvent', (event: any, type: any, message: any) => {
//     createDesktop(message)
//   });
// }


// //发起远程连接
// function createDesktop(message: any){
//   if(slremote != slRemoteInvalid){
//       if(desktopsession != slSessionInvalid){
//           bjysdk.destroyRemoteSession(slremote,desktopsession);
//           desktopsession = slSessionInvalid;
//       }
//       desktopsession = bjysdk.createRemoteEmptySession(slremote, 0);
//       if(desktopsession != slSessionInvalid){
//           var jsonObj = JSON.parse(message);
//           var address = jsonObj.address;
//           var session = jsonObj.session;
//           createRemoteWindows();
//           var hwnd = remoteWin!.getNativeWindowHandle();
//           if(bjysdk.setRemoteSessionOpt(slremote, desktopsession,1,hwnd,hwnd.length)){
//               moveDesktopPos();
//               if(bjysdk.setRemoteSessionOpt(slremote, desktopsession,2,slremoteDesktopSessionCallback,0)){
//                   if (bjysdk.connectRemoteSession(slremote, desktopsession, address, session)){
//                     sendMsgToMainWindow(controlEventName, msgType.notic, '连接远程会话成功');
//                   }else{
//                     sendMsgToMainWindow(controlEventName, msgType.error, '连接远程会话失败');
//                   }
//               }else{
//                 sendMsgToMainWindow(controlEventName, msgType.error, '设置远程会话回调失败');
//               }
//           }else{
//             sendMsgToMainWindow(controlEventName, msgType.error, '设置窗口句柄失败');
//           }
//       }else{
//         sendMsgToMainWindow(controlEventName, msgType.error, '创建远程会话失败');
//       }
//   }else{
//     sendMsgToMainWindow(controlEventName, msgType.error, '无效的被控端实例');
//   }
// }

// //创建远程桌面窗口
// function createRemoteWindows(){
//   remoteWin = null;
//   remoteWin = new BrowserWindow({width: 1280,height: 720});
//   remoteWin.setMenu(null);
//   remoteWin.setTitle("远程桌面");
//   remoteWin.on('close',() => {
//     remoteWin = null;
//     if(slremote != slRemoteInvalid && desktopsession != slSessionInvalid){
//       bjysdk.destroyRemoteSession(slremote,desktopsession);
//       desktopsession = slSessionInvalid;
//       sendMsgToMainWindow(controlEventName, msgType.notic, '销毁远程桌面成功');
//     }
//   });
//   remoteWin.on('resize',() => {
//       remoteWin!.reload();
//       moveDesktopPos();
//   });
// }

// //远程事件回调
// function slremoteCallback(remote: any, session: any, event: any){
//   if(session == desktopsession){
//     sendMsgToMainWindow(controlEventName, msgType.notic, event == 0 ? "桌面会话已连接" : "桌面会话已断开");
//     if(event == 0){
//         var hwnd = remoteWin!.getNativeWindowHandle();
//         bjysdk.setDesktopSessionVisible(slremote,desktopsession,hwnd);
//     }else if(remoteWin){
//         remoteWin.close();
//     }
//   }
// }

// //远程连接会话回调
// function slremoteDesktopSessionCallback(session: any, event: any, data: any){
//   if(session == desktopsession){
//     if(event == 1){
//       sendMsgToMainWindow(controlEventName, msgType.notic, '桌面会话已连接');
//     }else if(event == 2) {
//       sendMsgToMainWindow(controlEventName, msgType.notic, '桌面会话已断开');
//     }
//   }
// }

// //设置远程桌面相对位置
// function moveDesktopPos(){
//   var rc = remoteWin!.getContentBounds();
//   if (process.platform == "win32"){
//       var scaleFactor = screen.getPrimaryDisplay().scaleFactor;
//       bjysdk.setDesktopSessionPos(slremote,desktopsession,0,0,parseInt(rc.width * scaleFactor + ''),parseInt(rc.height * scaleFactor + ''));
//   } else {
//       bjysdk.setDesktopSessionPos(slremote,desktopsession,rc.x,rc.y,rc.width,rc.height);
//   }
// }

// export const remoteControleIpcMainInit = () => {
//   ipcMain.on('initBjySdkClient', () => {
//     bjysdkClientInit();
//   });
//   ipcMain.on('destoryBjySdkClient', () => {
//     destoryClientBjysdk();
//   });

//   ipcMain.on('initBjySdkRemote', () => {
//     bjysdkRemoteInit();
//   })
//   ipcMain.on('destoryBjySdkRemote', () => {
//     destoryRemoteBjysdk();
//   })
// }
