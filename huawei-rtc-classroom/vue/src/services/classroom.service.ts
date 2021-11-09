/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 11:01:44
 * @LastEditTime: 2021-11-02 11:20:33
 * @LastEditors: Yandong Hu
 * @Description: code wiki  https://wiki.tctm.life/pages/viewpage.action?pageId=15908409
 */

import { ON_OFF, POWER_TYPE, rtmTextMessageCategory } from "./common/abstract/rtm.abstract";
// import { RemoteControlService, RemoteType, RtcService } from "hrtc-sdk-services";
// import { RtmService } from "hrtc-sdk-services";
// import { rtmTextMessageCategory } from "hrtc-sdk-services/dist/abstract/rtm.abstract";
import { RTCDisplayMode } from "./common/abstract/rtc.abstract";
import { RemoteControlService, RemoteType } from "./common/remote-control.service";
import { RtcService } from "./common/rtc.service";
import { RtmService } from "./common/rtm.service";
import { roomButtonsStatus, UserListState, UserType } from "./state-manager/classroom-state.service";

function controlSDKInit(type: RemoteType) {
  if(type == RemoteType.client) {
    return RemoteControlService().bjysdkClientInit();
  } else {
    return RemoteControlService().bjysdkRemoteInit();
  }
}
function controlSDKLogin(openid: string, openkey: string) {
  RemoteControlService().login(openid, openkey);
}
function controlCreateSession() {
  return RemoteControlService().createDesktopsession('create');
}
function controlDestroySession() {
  RemoteControlService().destroyDesktopsession('delete');
}
/**
 * 通知远端,有一个人在共享屏幕
 *
 * @param {string} shareId 屏幕流id
 */
function sendReadyShareScreen(shareId: string) {
  const msg = {
    command: rtmTextMessageCategory.READY_SHARE_SCREEN,
    shareId: shareId
  };
  RtmService().sendMsg(msg);
}
/**
 * 通知远端,停止拉取共享屏幕。
 *
 * @param {string} shareId 屏幕流id
 */
function sendStopShareScreen(shareId: string) {
  const msg = {
    command: rtmTextMessageCategory.STOP_SHARE_SCREEN,
    shareId: shareId
  };
  RtmService().sendMsg(msg);
}

/**
 * 用户退出房间
 *
 * @param {string} userId
 * @param {boolean} [exit=false] 是否全体退出
 */
function leaveChannel(userId: string, exit: boolean = false) {
  const msg = {
    command: rtmTextMessageCategory.LEAVE_CHANNEL,
    userId: userId,
    exit: exit
  };
  RtmService().sendMsg(msg);
}

/**
 * 通知远端id，要被控制，其他人屏蔽控制按钮功能。
 *
 * @param {string} userId 被控人id
 */
function sendControlStart(userId: string) {
  // const {address, session} =
  const msg = {
    command: rtmTextMessageCategory.CONTROL_START,
    userId: userId,
  };
  RtmService().sendMsg(msg);
}

/**
 * 告诉
 *
 * @param {string} userId
 */
function sendControlReady(userId: string, address: string, session: string) {
  const msg = {
    command: rtmTextMessageCategory.CONTROL_READY,
    userId: userId,
    server_address: address,
    server_session: session
  };
  RtmService().sendMsg(msg);
}
function sendControlEnd(userId: string) {
  const msg = {
    command: rtmTextMessageCategory.CONTROL_END,
    userId: userId,
  };
  RtmService().sendMsg(msg);
}

async function getStuCourseNow () {

}
async function getTeaCourseNow () {

}
function renderLocalVideo (element: string) {
  const board = <HTMLDivElement>document.getElementById(element);
  console.log('renderLocalVideo', element, board)
  RtcService().renderLocalVideo(board, RTCDisplayMode.HRTC_VIDEO_DISPLAY_MODE_FIT);
}
function clearLocalView (element: string) {
  const board = <HTMLDivElement>document.getElementById(element);
  RtcService().stopLocalPreviewAndClear(board);
}
function renderTeacherLocalVideo () {
  renderLocalVideo('teacher-board');
}
function renderRemoteVideo (element: string, userId: number) {
  const board = <HTMLDivElement>document.getElementById(element);
  RtcService().startRemoteStreamView(`${userId}`, board);
}



function rtcEvent() {

}
function rtmEvent() {

}
function controlEvent() {

}

function leaveRoom() {
  console.log("leave room and channel!");
  roomButtonsStatus.superPower = ""
  leaveChannel(`${RtcService().getUserLocalId()}`);
  RtcService().removeAllListeners();
  RemoteControlService().removeAllListeners();
  RtcService().leaveRoom();
  RtmService().removeAllListeners();
  RtmService().leaveChannel();
  UserListState.lists = [];

}

// //////////  新增活整改 /////////////////////
/**
 * 更改昵称的广播
 */
function msgForChangeNickName(targetUserId: number, nickName: string) {
  const msg ={
    code: rtmTextMessageCategory.NICKNAME_CHANGE,
    targetUserId: targetUserId,
    nickName: nickName
  }
  RtmService().sendMsg(msg)
}
/**
 * 发送广播 for 静音、解除静音
 * @param targetUserId
 * @param audio
 * @param option :
 */
function msgForMuteAudio(targetUserId: string, audio: number, audioStatus?:number) {
  const msg ={
    code: rtmTextMessageCategory.MUTE_AUDIO,
    targetUserId: targetUserId,
    status: audio,
    audioStatus: audioStatus
  }
  RtmService().sendMsg(msg)
}

/**
 * 发送广播 for 开启关闭视频
 * @param targetUserId
 * @param audio
 */
 function msgForMuteVideo(targetUserId: number, video: number) {
  const msg ={
    code: rtmTextMessageCategory.MUTE_VIDEO,
    targetUserId: targetUserId,
    status: video
  }
  RtmService().sendMsg(msg)
}
/***
 * 发送广播通知设为焦点，当是设置的时候，streamId 必传，所有人拉这路流放在中间
 */
function msgForMuteFocus(targetUserId: number, focus: number) {
  const msg ={
    code: rtmTextMessageCategory.MUTE_FOCUS,
    targetUserId: targetUserId,
    status: focus
  }
  RtmService().sendMsg(msg)
}

/***
 * 发送广播通知设为切换角色
 */
 function msgForPowerChange(targetUserId: number, power: number, powerName: string) {
  const msg ={
    code: rtmTextMessageCategory.POWER_CHANGE,
    targetUserId: targetUserId,
    status: power,
    statusName: powerName
  }
  RtmService().sendMsg(msg)
}

/***
 * 发送广播通知请求共享
 */
 function msgForShareScreen(targetUserId: number| string, share: number, shareName: string) {
  const msg ={
    code: rtmTextMessageCategory.SHARE_SCREEN,
    targetUserId: targetUserId,
    status: share,
    statusName: shareName
  }
  RtmService().sendMsg(msg)
}

/***
 * 发送广播通知请求远程控制
 */
 function msgForControlScreen(targetUserId: number, control: number, controlName: string, address?:string, session?:string ) {
  const msg ={
    code: rtmTextMessageCategory.CONTROL_SCREEN,
    targetUserId: targetUserId,
    status: control,
    statusName: controlName,
    server_address: address,
    server_session: session
  }
  RtmService().sendMsg(msg)
}

/**
 * 获取指定用户id 的用户信息
 * @param userId
 * @returns
 */
function getUser(userId:number) {
  console.log(UserListState,'99')
  return UserListState.lists.find(item => item.userId == userId)
}

function getUserByKeyStatus(key: string, status: number| boolean) {
  return UserListState.lists.find(item => item[key] == status)
}


/**
 * 更新用户信息
 * @param userId
 * @param key
 * @param value
 */
function updateUserInfo(userId:number, key: string, value: number |string | boolean) {
  const user = getUser(userId);
  if(user) {
    user[key] = value
  }
}
/**
 * 更新其他人的用户信息
 * @param key
 * @param value
 */
function updateUsersList(key: string, value: number |string | boolean) {
  UserListState.lists.forEach(item => {
    console.log("power", item.userId + ":"+ item.power)
    if(item.power == POWER_TYPE.STUDENT ) {
      item[key] = value
    }
    // item[key] = value
  })
}

export {
  controlCreateSession,
  controlDestroySession,
  controlSDKInit,
  controlSDKLogin,
  leaveChannel,
  renderRemoteVideo,
  renderLocalVideo,
  clearLocalView,
  renderTeacherLocalVideo,
  getStuCourseNow,
  getTeaCourseNow,
  leaveRoom,
  sendControlEnd,
  sendControlStart,
  sendControlReady,
  msgForChangeNickName,
  updateUserInfo,
  msgForMuteAudio,
  getUser,
  msgForMuteVideo,
  msgForMuteFocus,
  updateUsersList,
  msgForPowerChange,
  msgForShareScreen,
  msgForControlScreen,
  getUserByKeyStatus
}
