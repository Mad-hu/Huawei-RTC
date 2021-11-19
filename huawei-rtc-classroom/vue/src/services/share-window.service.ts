/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-09 14:03:23
 * @LastEditTime: 2021-11-19 11:24:07
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { msgForShareScreen, sendStopShareScreen, updateUsersList } from "./classroom.service";
import { SHARE_STATUS } from "./common/abstract/rtm.abstract";
import { getIpcRenderer, getOSType } from "./common/electron.service";
import { RtcService } from "./common/rtc.service";
import { RtmService } from "./common/rtm.service";
import { confirm } from "./modal.service";
import { BUTTON_STATUS, channelAttributeState, roomButtonsStatus, roomInfo, SCREEN_TYPE, ShareState, UserListState } from "./state-manager/classroom-state.service";
import { TitleBarState } from "./state-manager/titlebar-state.service";
import { UserInfoState, UserRole } from "./state-manager/user-state.service";
import { getStorage } from "./storage.service";
import { windowService } from "./window.service";
export const getShareScreenSourceInfo = () => {
  const screens = RtcService().getScreenSources().sourceInfos;
  const screenItem = screens.find((item: any) => item.sourceName == 'Monitor_1');
  return screenItem;
}

/**
 * 根据状态更改UI
 *
 * @param {boolean} flag true 本地正在共享，改变UI  false 还原UI
 */
export const setShareWindowStateControl = (flag: boolean) => {
  if (flag) {
    roomButtonsStatus.screen = SCREEN_TYPE.FULL;
    TitleBarState.visible = false;

    if(getOSType() == 'darwin') {
      windowService().maximize();
    } else {
      windowService().setFullScreen(true);
    }
    windowService().setResizable(false);
    windowService().setMinimizable(false);
    windowService().setAlwaysOnTop(true);
    windowService().setIgnoreMouseEvents(true);
    ShareState.screenShareLocalState = true;
  } else {
    TitleBarState.visible = true;
    ShareState.screenShareLocalState = false;
    roomButtonsStatus.screen = SCREEN_TYPE.NORMAL;
    if(getOSType() == 'darwin') {
      windowService().restore();
    } else {
      windowService().setFullScreen(false);
    }
    windowService().setMinimizable(false);
    windowService().setIgnoreMouseEvents(false);
    windowService().setAlwaysOnTop(false);
    windowService().setResizable(true);
    windowService().center();
  }
}

function rtcStartShareScreen() {
  let shareState = 0;
  if (channelAttributeState.shareControlStaus == BUTTON_STATUS.SHARE_CONTROL_MUL) {
    const sharing = ShareState.remoteShareList.findIndex(item => item.available == true);
    // 多人共享，并且有人已经共享，只改变UI，不进行真实共享，通知远端同意共享
    if(sharing == -1) {
      shareState = RtcService().startScreenShare();
    }
  } else {
    shareState = RtcService().startScreenShare();
  }
  msgForShareScreen(UserInfoState.userId, SHARE_STATUS.SHAREING,'正在共享');
  if (shareState == 0) {
    // 停止本地拉取所有远端视频流，视频流在小窗口拉取
    RtcService().muteAllRemoteVideoStreams(true);
    setShareWindowStateControl(true);

    const wbData = getStorage('videoListWindow');
    if(wbData) {
      getIpcRenderer().sendTo(wbData.webContentId, 'msgToVideo', {type: 'show', roomName: roomInfo.roomName});
    }
  }
  return shareState;
}
export function openVideoListWindow() {
  // 老师打开小窗口
  if (UserInfoState.role == UserRole.teacher) {
    console.log('create video list window');
    const videoListWindowURI = location.origin + '/#/video-list-window';
    windowService().createWindow(videoListWindowURI);
  }
}

export function stopScreenShareDelegate() {
  // 直接关闭视频窗口
  const wbData = getStorage('videoListWindow');
  if(wbData) {
    getIpcRenderer().sendTo(wbData.webContentId, 'msgToVideo', {type: 'hide'})
  }

  setShareWindowStateControl(false);
  // 开启本地拉取远端流，还原视频状态
  UserListState.lists.map(item => {
    if (item.video != 0) {
      RtcService().muteRemoteVideoStream(`${item.userId}`, false);
    }
  });
  setTimeout(() => {
    windowService().setIgnoreMouseEvents(false);
  }, 100);
}
export const stopScreenShare = () => {
  console.log('stopScreenShare');
  try {
    const stopState = RtcService().stopScreenShare();
    stopScreenShareDelegate();
    return stopState;
  } catch (error) {
    stopScreenShareDelegate();
    return -1;
  }
}
async function queryCurrentRemoteShare() {
  return new Promise<boolean>((resolve, reject) => {
    const timer = setInterval(() => {
      if(ShareState.remoteShareList.length == 0) {
        clearInterval(timer)
        resolve(true);
      } else {
        const shareCurrent = ShareState.remoteShareList.find(item => item.available == true);
        if(!shareCurrent) {
          clearInterval(timer)
          resolve(true);
        }
      }
    }, 200);
  });
}
/**
 * 检查屏幕共享状态
 *
 * @return {*}
 */
export const checkShareStatus = async () => {
  if (channelAttributeState.shareControlStaus == BUTTON_STATUS.SHARE_CONTROL_ONLY_ONE && ShareState.remoteShareList.length != 0) {
    const onRes = await confirm('其他人在共享，继续共享？');
    // 停止远端共享
    if(onRes == 'ok') {
      sendStopShareScreen(ShareState.remoteShareList[0].userId);
      await queryCurrentRemoteShare();
      // msgForShareScreen(ShareState.remoteShareList[0].userId, SHARE_STATUS.SHARE_END,'结束屏幕共享' );
    }
    return onRes == 'ok'? true: false;
  }
  // if(channelAttributeState.shareControlStaus == BUTTON_STATUS.SHARE_CONTROL_MUL &&  ShareState.remoteShareList.length != 0) {
  //   await queryCurrentRemoteShare();
  // }
  return true;
}
/**
 * 不传参数，默认共享屏幕。 传参数共享传入的
 *
 * @param {*} [screenItem] 默认共享桌面
 * @return {*}  {boolean} 共享成功或失败
 */
export const startShareScreen = (screenItem?: any) => {
  if(ShareState.screenShareLocalState) {
    RtcService().stopScreenShare();
  }
  if (getOSType() == 'win32') {
    const sourceInfo = screenItem || getShareScreenSourceInfo();
    const selectState = RtcService().selectScreenShare(sourceInfo);
    if (selectState == 0) {
      const shareState = rtcStartShareScreen();
      console.log('share state:', shareState);
      return {
        code: shareState,
        type: '开始共享'
      };
    } else {
      return {
        code: selectState,
        type: '设置共享'
      };
    }
  } else if (getOSType() == 'darwin') {
    const shareState = rtcStartShareScreen();
    console.log('share state:', shareState);
    return {
      code: shareState,
      type: '开始共享'
    };
  } else {
    return {
      code: 9999,
      type: '未知平台'
    };
  }
}

export function startShareScreenAll () {
  if(channelAttributeState.shareControlStaus == BUTTON_STATUS.SHARE_CONTROL_ONLY_ONE) {
    RtmService().setChannelAttributes(roomInfo.roomName, {shareControlStaus: `${BUTTON_STATUS.SHARE_CONTROL_MUL}`}, { enableNotificationToChannelMembers: true});
  }
  updateUsersList('share', SHARE_STATUS.SHARE_ASK);
  msgForShareScreen('all', SHARE_STATUS.SHARE_ASK,'请求屏幕共享' );
}
