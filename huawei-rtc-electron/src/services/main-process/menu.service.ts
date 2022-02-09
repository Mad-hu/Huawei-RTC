/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-12-23 11:55:04
 * @LastEditTime: 2022-02-09 14:21:38
 * @LastEditors: Yandong Hu
 * @Description:
 */
import {
  Menu,
  globalShortcut,
  ipcMain,
  webContents,
  app
} from 'electron';

/**
 * 创建macos菜单和快捷键
 *
 * @return {*}
 */
function drawMenu() {
  const template: any = [{
      label: "Application",
      submenu: [{
        label: "退出",
        accelerator: "Command+Q",
        click: function () {
          app.quit();
        }
      }]
    },
    {
      label: "编辑",
      submenu: [{
          label: "撤销",
          accelerator: "CommandOrControl+Z",
          selector: "undo:"
        },
        {
          label: "恢复",
          accelerator: "Shift+CommandOrControl+Z",
          selector: "redo:"
        },
        {
          type: "separator"
        },
        {
          label: "剪切",
          accelerator: "CommandOrControl+X",
          selector: "cut:"
        },
        {
          label: "复制",
          accelerator: "CommandOrControl+C",
          selector: "copy:"
        },
        {
          label: "粘贴",
          accelerator: "CommandOrControl+V",
          selector: "paste:"
        },
        {
          label: "全选",
          accelerator: "CommandOrControl+A",
          selector: "selectAll:"
        }
      ]
    }
  ];
  return Menu.buildFromTemplate(template);
}

/**
 * 创建windows菜单和快捷键
 *
 *
 * （Alt+Q）将我静音/解除静音

   （Alt+W）除讲师以外所有人静音/解除静音按默认状态决定是否解除

   （Alt+S）开始/停止屏幕共享

   （Alt+X）共享屏幕时，学生不能最小化教室窗口（一次设置，二次解除，老师学生都有提示）

   （Alt+C）向全体发送屏幕共享请求

   （Alt+V）对当前正在屏幕共享的学生申请远程协助
 *
 * @return {*}
 */
function winMenu() {
  // const menu = new Menu()
  // menu.append(new MenuItem({
  //   label: 'Print',
  //   accelerator: 'Alt+Q',
  //   click: () => {
  //     console.log('time to print stuff')
  //   }
  // }))
  // menu.append(new MenuItem({
  //   label: 'Print',
  //   accelerator: 'Alt+Q',
  //   click: () => {
  //     console.log('time to print stuff')
  //   }
  // }))
  // return menu;

  return null;
}

/**
 * 创建本地菜单和快捷键
 *
 */
function createMenu() {
  const buildMenu = process.platform === 'darwin' ? drawMenu() : winMenu()
  Menu.setApplicationMenu(buildMenu);
}

/**
 * 创建系统快捷键
 *
 */
function createSystemShortcut() {
  ipcMain.on('uninstallSystemShortcut',(event: any, args: any) => {
    const {accelerator} = args;
    if(accelerator) {
      globalShortcut.unregister(accelerator);
    } else {
      // 注销所有快捷键
      globalShortcut.unregisterAll();
    }
  })
  ipcMain.on('createSystemShortcut', async (event: any, args: any) => {
    const {
      accelerator,
      fromId
    } = args;
    if(!accelerator) {
      return;
    }
    const ret = globalShortcut.register(accelerator, () => {
      if (fromId) {
        const webC = webContents.fromId(fromId);
        if (webC) {
          webC.send('SystemShortcut', {accelerator: accelerator, onPress: true})
        }
        console.log(accelerator + ' is pressed');
      }
    })
    const webC = webContents.fromId(fromId);
    if (webC) {
      webC.send('SystemShortcut', {accelerator: accelerator, registerRes: ret})
    }
  });
}
export {
  createMenu,
  createSystemShortcut
}
