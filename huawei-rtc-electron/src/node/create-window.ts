/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 15:19:47
 * @LastEditTime: 2021-10-09 14:29:16
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { BrowserWindow } from "electron";
let mainWindow: BrowserWindow | null = null;

export const buildWindow = (opts: any = {}, webPres: any = {}) => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    frame: false,
    resizable: true,
    transparent: true,
    backgroundColor: '#00000000',
    ...opts,
    webPreferences: {
      plugins: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      ...webPres
    },
  });
  return mainWindow;
}
export const getMainWindow = () => {
  return mainWindow;
}
export const sendMsgToMainWindow = (eventName: string, type: string, params: any) => {
  mainWindow!.webContents.send(eventName, type, params);
}
