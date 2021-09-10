/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 09:37:35
 * @LastEditTime: 2021-08-10 12:04:32
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { ipcRenderer } from "electron"
import React, { Fragment } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { logoutState, titleVisibleState } from "../../services/state-manage/base.state.service"
import { LogoutView } from "../logout/logout"

export const TitleBar = () => {
  let openDevToolsClickCounts = 0;
  const setVisible = useSetRecoilState(logoutState);
  const titleVisible = useRecoilValue(titleVisibleState);
  const onCloseAction = () => {
    setVisible(true);
  }
  const refreshAction = () => {
    const webv: any = document.getElementById('webview-0');
    webv.reload();
  }
  const backAction = () => {
    const webv: any = document.getElementById('webview-0');
    webv.goBack();
  }
  const openDevTools = () => {
    if(openDevToolsClickCounts++ > 4) {
      const webv: any = document.getElementById('webview-0');
      webv.openDevTools();
      ipcRenderer.send('openDevTools');
    }
  }
  return(
    <Fragment>
      {titleVisible?
        <div className="title-bar">
          <div className="title-left">
            <div className="title-bar-logo" onClick={openDevTools}>&#xe71d;</div>
            <span>RTC And RemoteControl Demo Project.</span>
          </div>
          <div className="title-bar-btns">
            <div className="title-bar-btn bar-refresh" onClick={backAction}>&#xe6ba;</div>
            <div className="title-bar-btn bar-refresh" onClick={refreshAction}>&#xe687;</div>
            <div className="title-bar-btn bar-min" onClick={() => ipcRenderer.send('min')}>&#xe60c;</div>
            <div className="title-bar-btn bar-max" onClick={() => ipcRenderer.send('max')}>&#xe64c;</div>
            <div className="title-bar-btn bar-close" onClick={onCloseAction}>&#xe695;</div>
          </div>
        </div>: null
      }

      <LogoutView></LogoutView>
    </Fragment>

  )
}
