/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-04 09:24:41
 * @LastEditTime: 2021-11-09 18:15:34
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { BrowserWindow, BrowserWindowProxy } from "electron";
import EventEmitter from "events";
import { Lazy } from "../service-provider/lazy.service.provider";
import { getBrowserWindow, getCurrentWindow, getIpcRenderer } from "./common/electron.service";


class WindowService extends EventEmitter {
  browserWindowProxy!: BrowserWindowProxy;
  browserWindow = getBrowserWindow();
  userWindow!: BrowserWindow;
  isMaxWindow = false;
  constructor() {
    super();

  }
  /**
   * 创建渲染视频单独窗口
   *
   * @param {string} url
   * @return {*}
   * @memberof WindowService
   */
  createUserWindow(url: string) {
    this.userWindow = new this.browserWindow({
      show: false,
      frame: false,
      resizable: false,
      hasShadow: false,
      transparent: true,
      backgroundColor: '#00000000',
      alwaysOnTop: true,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        nodeIntegrationInSubFrames: true,
        allowRunningInsecureContent: true
      },
    });
    return this.userWindow;
  }

  show() {
    getCurrentWindow().show();
  }
  hide() {
    getCurrentWindow().hide();
  }
  /**
   * 更改当前窗口大小
   *
   * @param {number} width
   * @param {number} height
   * @memberof WindowService
   */
  setSize(width: number, height: number) {
    getCurrentWindow().setSize(width, height);
  }
  /**
   * 当前窗口居中
   *
   * @memberof WindowService
   */
  center() {
    getCurrentWindow().center();
  }
  /**
   * 关闭当前窗口
   *
   * @memberof WindowService
   */
  close() {
    getCurrentWindow().close();
  }

  /**
   * 当前窗口最大化
   *
   * @memberof WindowService
   */
  maximize() {
    getCurrentWindow().maximize();
  }
  /**
   * 取消最大化
   *
   * @memberof WindowService
   */
  unmaximize() {
    getCurrentWindow().unmaximize();
  }
  isMaximized() {
    return getCurrentWindow().isMaximized();
  }
  /**
   * 最小化当前窗口
   *
   * @memberof WindowService
   */
  minimize() {
    getCurrentWindow().minimize();
  }
  restore() {
    getCurrentWindow().restore();
  }

  restoreWindow() {
    if(this.isMaxWindow) {
      this.unmaximize();
      this.isMaxWindow = false;
    } else {
      if(this.isMaximized()) {
        this.unmaximize();
        this.isMaxWindow = false;
        return;
      }
      this.maximize();
      this.isMaxWindow = true;
    }
  }
  /**
   * 当前窗口全屏显示
   *
   * @memberof WindowService
   */
  setFullScreen(flag: boolean) {
    if (process.platform === 'darwin') {
      getCurrentWindow().setFullScreen(flag);
      getCurrentWindow().setSimpleFullScreen(flag);
    } else {
      getCurrentWindow().setFullScreen(flag);
    }
  }
  setAlwaysOnTop(flag: boolean) {
    getCurrentWindow().setAlwaysOnTop(flag);
  }


  setIgnoreMouseEvents(flg: boolean) {
    try {
      const win = getCurrentWindow();
      if(flg) {
        win.setIgnoreMouseEvents(true, { forward: true });
        // win.setIgnoreMouseEvents(true);
      }else {
        win.setIgnoreMouseEvents(false);
      }
    } catch (error) {

    }
  }
  /**
   * 用于透明位置鼠标穿透
   *
   * @param {string} [id='toolbar']
   * @memberof FloatingWindowService
   */
  clickThroughDom(el: HTMLDivElement) {
    el.addEventListener('mouseenter', () => {
      this.setIgnoreMouseEvents(false);
    });
  }
}

const lazyWindowService = new Lazy(() => {
  return new WindowService();
});
const windowService = () => {
  return lazyWindowService.instance;
}
export {
  windowService
}
