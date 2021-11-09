/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-09 14:03:23
 * @LastEditTime: 2021-11-09 18:54:18
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { getOSType } from "./common/electron.service";
import { RtcService } from "./common/rtc.service";
import { roomButtonsStatus, SCREEN_TYPE, ShareState } from "./state-manager/classroom-state.service";
import { TitleBarState } from "./state-manager/titlebar-state.service";
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
  if(flag) {
    roomButtonsStatus.screen = SCREEN_TYPE.FULL;
    TitleBarState.visible = false;
    windowService().setFullScreen(true);
    windowService().setIgnoreMouseEvents(true);
    windowService().setAlwaysOnTop(true);
    ShareState.screenShareState = true;
  } else {
    TitleBarState.visible = true;
    ShareState.screenShareState = false;
    roomButtonsStatus.screen = SCREEN_TYPE.NORMAL;
    windowService().setFullScreen(false);
    windowService().setIgnoreMouseEvents(false);
    windowService().setAlwaysOnTop(false);
    windowService().center();
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
      const shareState = RtcService().startScreenShare();
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
    const shareState = RtcService().startScreenShare();
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

export const stopScreenShare = () => {
  const stopState = RtcService().stopScreenShare();
  setShareWindowStateControl(false);
  return stopState;
}
