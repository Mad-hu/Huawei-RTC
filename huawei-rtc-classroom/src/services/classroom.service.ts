/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 11:01:44
 * @LastEditTime: 2021-08-18 11:52:31
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { rtmTextMessageCategory } from "./abstract/rtm.abstract";
import { RemoteControlService, RemoteType } from "./remote-control.service";
import { RtcService } from "./rtc.service";
import { RtmService } from "./rtm.service";
import { UserListState, UserType } from "./state-manager/classroom-state.service";

function controlSDKInit(type: RemoteType) {
  if(type == RemoteType.client) {
    return RemoteControlService().bjysdkClientInit();
  } else {
    return RemoteControlService().bjysdkRemoteInit();
  }
}
function controlSDKLogin() {
  RemoteControlService().login();
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

/**
 * 通知所有人，停止订阅对应id音频和显示UI，id自己停止发送音频
 *
 * @param {string} userId
 */
function sendMuteAudio(userId: string, audio: boolean) {
  const msg = {
    command: rtmTextMessageCategory.MUTE_AUDIO,
    userId: userId,
    audio: audio
  };
  RtmService().sendMsg(msg);
}

/**
 * 通知所有人，停止订阅对应id视频和修改显示UI，id自己停止发送视频
 *
 * @param {string} userId
 */
function sendMuteVideo(userId: string, video: boolean) {
  const msg = {
    command: rtmTextMessageCategory.MUTE_VIDEO,
    userId: userId,
    video: video
  };
  RtmService().sendMsg(msg);
}

async function getStuCourseNow () {

}
async function getTeaCourseNow () {

}
function renderLocalVideo (element: string) {
  const board = <HTMLDivElement>document.getElementById(element);
  RtcService().createLocalPreview(board,  0);
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
  RtcService().renderRemoteView(`${userId}`, board);
}

function muteAudio (item: UserType) {
  if (item.audio) {
    if (item.isLocal) {
      RtcService().setLocalAudio(true);
    } else {
      RtcService().muteRemoteVideoStream(`${item.userId}`, false);
    }
  } else {
    if (item.isLocal) {
      RtcService().setLocalAudio(false);
    } else {
      RtcService().muteRemoteVideoStream(`${item.userId}`, true);
    }
  }
}
function muteVideo (item: UserType) {
  if (item.video) {
    if (item.isLocal) {
      RtcService().setLocalVideo(true);
    } else {
      RtcService().muteRemoteVideoStream(`${item.userId}`, false);
    }
  } else {
    if (item.isLocal) {
      RtcService().setLocalVideo(false);
    } else {
      RtcService().muteRemoteVideoStream(`${item.userId}`, true);
    }
  }
}

function rtcEvent() {

}
function rtmEvent() {

}
function controlEvent() {

}

function leaveRoom() {
  console.log("leave room and channel!");
  RtcService().removeAllListeners();
  RtmService().removeAllListeners();
  RemoteControlService().removeAllListeners();
  RtcService().leaveRoom();
  RtmService().leaveChannel();
  leaveChannel(`${RtcService().getUserLocalId()}`);
  UserListState.lists = [];
}


export {
  controlCreateSession,
  controlDestroySession,
  controlSDKInit,
  controlSDKLogin,
  leaveChannel,
  sendMuteVideo,
  sendMuteAudio,
  muteAudio,
  muteVideo,
  renderRemoteVideo,
  renderLocalVideo,
  clearLocalView,
  renderTeacherLocalVideo,
  getStuCourseNow,
  getTeaCourseNow,
  leaveRoom,
  sendControlEnd,
  sendControlStart,
  sendControlReady
}
