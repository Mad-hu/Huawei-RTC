/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 09:37:35
 * @LastEditTime: 2021-12-02 16:19:28
 * @LastEditors: Yandong Hu
 * @Description:
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { app, BrowserWindow, ipcMain, Menu, screen, shell } from 'electron';
import './node/ipc-main';
import { createBrowserWindow, getTargetWindow } from './services/main-process/browser-window.services';
import { closeRemoteWindow, createDesktop, initRemoteSDK, setRemoteSDKRenderMainWindow } from './services/main-process/hrtc-remote-control.service';

let mainWindow: BrowserWindow | null = null;


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}
const PROTOCOL = 'tczx'; // 用户自定义

// 浏览器访问 tczx://tczx.aicoders.cn/join?action=join&shareId==123&name=test&type=chrome
// if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
//   console.log('process.argv[1]:', process.argv[1]);
//   // 设置electron.exe 和 app的路径
//   app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
//     path.resolve(process.argv[1]),
//   ])
// } else {
  app.setAsDefaultProtocolClient(PROTOCOL)
// }


// window 系统中执行网页调起应用时，处理协议传入的参数
const handleArgvFromWeb = (argv: any[]) => {
  const prefix = `${PROTOCOL}:`;
  const url = argv.find((arg: string) => arg.startsWith(prefix));
  if (url) handleUrlFromWeb(url);
};
// win网页进行应用的调起后，会触发该事件
app.on('second-instance', async (event, argv) => {
  if (process.platform === 'win32') {
    console.log("window 准备执行网页端调起客户端逻辑", argv);
    handleArgvFromWeb(argv);
  }
});
// mac网页进行应用的调起后，会触发该事件
app.on('open-url', (event, urlStr) => {
  console.log("mac 准备执行网页端调起客户端逻辑");
  handleUrlFromWeb(urlStr); // 对 url 执行的处理逻辑
});
const handleUrlFromWeb = (urlStr: string) => {
  const urlObj = new URL(urlStr);
  const { searchParams } = urlObj;
  const shareId = searchParams.get('shareId');
  const name = searchParams.get('name');
  const type = searchParams.get('type');
  // tczx://tczx.aicoders.cn/join?action=join&shareId=123&name=test&type=chrome
  console.log('handleUrlFromWeb:', shareId, name, type);
};

const createWindow = async () => {
  mainWindow = createBrowserWindow();
  // mainWindow.setSize(1121, 882);
  // mainWindow.center();
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`http://localhost:8088`);
  if(process.env.NODE_ENV != 'development') {
    mainWindow!.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow && mainWindow.show();
    mainWindow && mainWindow.focus();
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });

  // Open urls in the user's browser
  mainWindow!.webContents.on('new-window', (event, url) => {
    // event.preventDefault();
    // shell.openExternal(url);
  });
  Menu.setApplicationMenu(null);

  ipcMain.on('close', () => {
    mainWindow?.close();
    //回收BrowserWindow对象
    mainWindow = null;
  });
  ipcMain.on('min', () => {
    mainWindow?.minimize();
  });
  ipcMain.on('max', () => {
    if (mainWindow?.isMaximized()) {
        mainWindow?.unmaximize()
    } else {
        mainWindow?.maximize()
    }
  });
  ipcMain.on('openDevTools', () => {
    mainWindow?.webContents.openDevTools();
  });
  ipcMain.on('RemoteWindow', (_event: any, args: { type?: any; message: any; }) => {
    try {
      const {type, message} = args;
    switch(type) {
      case 'close':
        closeRemoteWindow();
        break;
      case 'init':
        const hrtcWindow = getTargetWindow('HrtcClassroom');
        if(hrtcWindow) {
          setRemoteSDKRenderMainWindow(hrtcWindow);
        } else {
          setRemoteSDKRenderMainWindow(mainWindow!);
        }
        initRemoteSDK();
        break;
      case 'desktop':
        const { message} = args;
        console.log(message);
        createDesktop(message);
        break;
    }
    } catch (error) {
      console.log(error)
    }
  });

  ipcMain.on('createBrowserWindow', (event: any, args: any) => {
    const {options, webPreferences, url} = args;
    console.log('createBrowserWindow', options, webPreferences, url);
    createBrowserWindow(options, webPreferences, url);
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  createWindow();
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
//只允许运行一个实例(单例)
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  // logger.debug("single")
  // if (mainWindow) {
  //   if (mainWindow.isMinimized())
  //     mainWindow.restore()
  //   mainWindow.focus()
  // }
}

