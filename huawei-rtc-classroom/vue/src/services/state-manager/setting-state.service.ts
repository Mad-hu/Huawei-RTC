/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-19 09:52:18
 * @LastEditTime: 2021-10-19 13:35:38
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { reactive } from "vue";
/**
 * setting 接口
 * @interface SettingType
 */
interface SettingType {
  /**
   * 常规设置列表
   */
  base: {
    /**
     * 进入教室是否播放提示音
     */
    intoClassAudio: boolean;
    /**
     * 是否显示邀请连接
     * @type {boolean} true 显示  false 隐藏
     */
    inviteLinkVisible: boolean;
    /**
     * 是否显示教室人员列表
     * @type {boolean} true 显示  false 隐藏
     */
    userListVisible: boolean;
    /**
     * 是否显示设置按钮开关
     * @type {boolean} true 显示  false 隐藏
     */
    settingBtnVisible: boolean;
    /**
     * 是否显示分组讨论开关
     * @type {boolean} true 显示  false 隐藏
     */
    webinarBtnVisible: boolean;
    /**
     * 教室是否已锁定
     *
     * @type {boolean} true 已锁定  false 未锁定 默认false
     */
    lock: boolean;
    /**
     * 是否显示教室基本信息
     *
     * @type {boolean} true 显示 false 不显示
     */
    info: boolean;
    /**
     * 设置菜单是否显示
     *
     * @type {boolean} true 显示 false 不显示
     */
    visible: boolean;
  }
  /**
   * 视频设置
   */
  video: {
    /**
     * 是否显示视频开关
     * @type {boolean} true 显示  false 隐藏
     */
    videoInputBtnVisible: boolean;
    /**
     * 全体视频状态
     *
     * @type {boolean} false 开启  true 关闭
     */
    allMuteVideo: boolean;
    /**
     * 是否显示全体视频按钮
     * @type {boolean} true 显示  false 隐藏
     */
    allMuteVideoBtnVisible: boolean;
    videoDevice: {
      /**
       * 设备名称
       */
      name: string;
      /**
       * 设备ID
       */
      id: string;
      /**
       * 是否开启
       */
      open: boolean;
      /**
       * 设备状态
       *
       * @type {(0 | 1)} 0 未知或被禁用 1 正常
       */
      status: 0 | 1;
    };
    /**
     * 设置菜单是否显示
     *
     * @type {boolean} true 显示 false 不显示
     */
    visible: boolean;

    /**
     * 默认视频开启状态
     *
     * @type {boolean} true 关闭  false 开启
     */
    muteVideo: boolean;
  }
  /**
   * 音频设置
   */
  audio: {
    /**
     * 是否显示音频开关
     * @type {boolean} true 显示  false 隐藏
     */
    audioOutputBtnVisible: boolean;
    /**
     * 是否显示麦克风开关
     * @type {boolean} true 显示  false 隐藏
     */
    audioInputBtnVisible: boolean;
    /**
     * 默认全体静音状态
     *
     * @type {boolean} false 不静音  true 静音
     */
    allMuteAudio: boolean;
    /**
     * 是否显示全体静音按钮
     * @type {boolean} true 显示  false 隐藏
     */
    allMuteAudioBtnVisible: boolean;
    /**
     * 是否允许参会者自己解除静音
     * @type {boolean} true 允许  false 不允许
     */
    muteAudioLock: boolean;
    /**
     * 是否允许参会者自己解除静音按钮显示状态
     * @type {boolean} true 显示  false 隐藏
     */
     muteAudioLockBtnVisible: boolean;
    /**
     * 是否显示静音按钮
     * @type {boolean} true 显示  false 隐藏
     */
    muteAudioBtnVisible: boolean;

    /**
     * 音频输入设备
     */
    audioInputDevice: {
      /**
       * 设备名称
       */
      name: string;
      /**
       * 设备ID
       */
      id: string;
      /**
       * 是否开启
       */
      open: boolean;
      /**
       * 设备状态
       *
       * @type {(0 | 1)} 0 未知或被禁用 1 正常
       */
      status: 0 | 1;
    };
    /**
     * 音频输出设备
     */
    audioOutputDevice: {
      /**
       * 设备名称
       */
      name: string;
      /**
       * 设备ID
       */
      id: string;
      /**
       * 是否开启
       */
      open: boolean;
      /**
       * 设备状态
       *
       * @type {(0 | 1)} 0 未知或被禁用 1 正常
       */
      status: 0 | 1;
    };
    /**
     * 设置菜单是否显示
     *
     * @type {boolean} true 显示 false 不显示
     */
    visible: boolean;

    /**
     * 默认麦克风开启状态
     *
     * @type {boolean} true 关闭  false 开启
     */
     muteInputAudio: boolean;
  }
  /**
   * 分组讨论
   */
  webinar: {
    /**
     * 是否显示讨论组按钮
     *
     * @type {boolean} true 显示 false 不显示
     */
    webinarBtnVisible: boolean;
    /**
     * 设置菜单是否显示
     *
     * @type {boolean} true 显示 false 不显示
     */
    visible: boolean;
  }
  chat: {
    /**
     * 教室是否显示聊天
     * @type {boolean} true 显示  false 隐藏
     */
    chatVisible: boolean;
    /**
     * 设置菜单是否显示
     *
     * @type {boolean} true 显示 false 不显示
     */
    visible: boolean;
  }
  /**
   * 屏幕共享
   */
  screen: {
    /**
     * 是否显示共享按钮
     *
     * @type {boolean} true 显示 false 不显示
     */
    screenShareBtnVisible: boolean;
    /**
     * 是否允许所有人共享屏幕
     *
     * @type {boolean} true 允许 false 不允许
     */
    allShareScreen: boolean;
    /**
     * 允许共享的人员ID列表
     *
     * @type {Array<string>} 用户ID列表
     */
    allowShareList: Array<string>;
    /**
     * 设置菜单是否显示
     *
     * @type {boolean} true 显示 false 不显示
     */
    visible: boolean;
  }
}


/**
 * 默认设置
 **/
const SettingConfig: SettingType = {
  base: {
    intoClassAudio: true,
    inviteLinkVisible: true,
    userListVisible: true,
    settingBtnVisible: true,
    webinarBtnVisible: true,
    lock: false,
    info: true,
    visible: true
  },
  video: {
    videoInputBtnVisible: true,
    allMuteVideo: false,
    allMuteVideoBtnVisible: true,
    videoDevice: {
      name: '',
      id: '',
      open: true,
      status: 0
    },
    visible: true,
    muteVideo: true
  },
  audio: {
    audioOutputBtnVisible: true,
    audioInputBtnVisible: true,
    allMuteAudio: false,
    allMuteAudioBtnVisible: true,
    muteAudioLock: true,
    muteAudioLockBtnVisible: true,
    muteAudioBtnVisible: true,
    audioInputDevice: {
      name: '',
      id: '',
      open: true,
      status: 0,
    },
    audioOutputDevice: {
      name: '',
      id: '',
      open: true,
      status: 0,
    },
    visible: true,
    muteInputAudio: true
  },
  chat: {
    chatVisible: true,
    visible: true
  },
  webinar: {
    webinarBtnVisible: true,
    visible: true
  },
  screen: {
    screenShareBtnVisible: false,
    allShareScreen: false,
    allowShareList: [],
    visible: true
  }
}
const SettingState = (setting: SettingType | undefined = undefined) => {
  return reactive(setting || SettingConfig);
}

export {
  SettingState,
  SettingType
}
