/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-09 14:03:23
 * @LastEditTime: 2021-11-12 10:37:17
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { BrowserWindowProxy } from "electron";
import { getOSType } from "./common/electron.service";
import { RtcService } from "./common/rtc.service";
import { roomButtonsStatus, SCREEN_TYPE, ShareState, UserListState } from "./state-manager/classroom-state.service";
import { TitleBarState } from "./state-manager/titlebar-state.service";
import { UserInfoState, UserRole } from "./state-manager/user-state.service";
import { windowService } from "./window.service";
let videoListWindow!: BrowserWindowProxy;
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
  if(flag) {
    roomButtonsStatus.screen = SCREEN_TYPE.FULL;
    TitleBarState.visible = false;
    windowService().setFullScreen(true);
    windowService().setIgnoreMouseEvents(true);
    windowService().setAlwaysOnTop(true);
    windowService().setResizable(false);
    ShareState.screenShareLocalState = true;
  } else {
    TitleBarState.visible = true;
    ShareState.screenShareLocalState = false;
    roomButtonsStatus.screen = SCREEN_TYPE.NORMAL;
    windowService().setFullScreen(false);
    windowService().setIgnoreMouseEvents(false);
    windowService().setAlwaysOnTop(false);
    windowService().setResizable(true);
    windowService().center();
  }
}

function rtcStartShareScreen() {
  const shareState = RtcService().startScreenShare();
  if(shareState == 0) {
    // 停止本地拉取所有远端视频流，视频流在小窗口拉取
    RtcService().muteAllRemoteVideoStreams(true);
    setShareWindowStateControl(true);
    // 老师打开小窗口
    if(UserInfoState.role == UserRole.teacher) {
      const videoListWindowURI = location.origin + '/#/video-list-window';
      videoListWindow = <BrowserWindowProxy><unknown>window.open(videoListWindowURI);
    }
  }
  return shareState;
}

export function stopScreenShareDelegate() {
  // 直接关闭视频窗口
  videoListWindow.close();
  setShareWindowStateControl(false);
  // 开启本地拉取远端流，还原视频状态
  UserListState.lists.map(item => {
    if(item.video != 0) {
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
/**
 * 不传参数，默认共享屏幕。 传参数共享传入的
 *
 * @param {*} [screenItem] 默认共享桌面
 * @return {*}  {boolean} 共享成功或失败
 */
 export const startShareScreen = (screenItem?: any) => {
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

