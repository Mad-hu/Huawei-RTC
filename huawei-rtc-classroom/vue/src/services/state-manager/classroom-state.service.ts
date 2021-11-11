/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-09 17:25:55
 * @LastEditTime: 2021-11-11 21:21:11
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { reactive } from "vue";

interface UserType {
  /**
   * 用户的id
   *
   * @type {number}
   */
  userId: number;
  /**
   * 用户的昵称
   *
   * @type {string}
   */
  userName: string;
  /**
   * 用户的权限。
   * 0 主持人，只能是一个人
   * 1 联席主持人，可多人
   * 2 普通观众
   * @type {number}
   */
  power: number;
  video: number;
  audio: number;
  share: number;
  control: number;
  isLocal?: boolean;
  focus:number; // 是否是焦点（展示在中间）
  [key: string]: any,
  /**
   * 本地是否共享声音
   *
   * @type {boolean}
   * @memberof UserType
   */
  shareLocalVoice?: boolean;
}
interface UserListType {
  lists: UserType[];
}

const userList: UserListType = {
  lists: []
}
const UserListState = reactive(userList);

interface RemoteShareType {
  /**
   * 用户id
   */
  userId: string,
  /**
   * true表示远端开启屏幕共享，false表示远端停止屏幕共享
   */
  available: boolean
}
interface ShareStateValueType {
  /**
   * 多人/单人屏幕共享控制状态
   *
   * @type {(0 | 1)} 0 多人共享   1 单人共享
   * @memberof ShareStateValueType
   */
  shareControlStaus: 0 | 1,
  /**
   * 本机真正共享状态
   *
   * @type {boolean} true 正在共享  false 未共享
   * @memberof ShareStateValueType
   */
  screenShareLocalState: boolean,
  /**
   * 本机虚拟共享状态 用于解决多人共享问题
   *
   * @type {boolean}
   * @memberof ShareStateValueType
   */
  screenShareLocalVRState: boolean,
  /**
   * 远端共享列表
   *
   * @type {RemoteShareType[]}
   * @memberof ShareStateValueType
   */
  remoteShareList: RemoteShareType[]
}
const shareStateValue: ShareStateValueType = {
  shareControlStaus: 1,
  screenShareLocalVRState: false,
  screenShareLocalState: false,
  remoteShareList: []
}
const ShareState = reactive(shareStateValue);

const ControlUserIdState = reactive({
  userId: ''
})

const RoomNameState = reactive({
  roomName: ''
})
/**
 * 教室内的按钮状态的记录
 *
 */
 enum BUTTON_STATUS {
  AUDIO_STATUS_CHECKED_AGREE=1, // 允许学生解除
  AUDIO_STATUS_CHECKED_UNAGREE = 0, // 不允许学生操作
  AUDIO_STATUS_UNCHECKED = 2, // 全体静音未选中
  SHARE_CONTROL_ONLY_ONE = 1, // 只允许单人共享
  SHARE_CONTROL_MUL = 0, // 允许多人共享
}

enum LOCK_STATUS {
  LOCK = 1, // 锁定
  UNLOCK = 0, // 未锁定
}

enum MODE_TYPE {
  FLAT = 0,
  FOCUS = 1
}

enum SCREEN_TYPE {
  FULL = 0,
  SHRINK  =1,
  ENLARGE = 2,
  NORMAL = 3
}

const roomButtonsStatus = reactive({
  audioStatus: BUTTON_STATUS.AUDIO_STATUS_UNCHECKED, // 全体静音
  shareControlStaus: BUTTON_STATUS.SHARE_CONTROL_ONLY_ONE, // 屏幕分享
  superPower: "", // 超级主持人的userid
  lockStatus:LOCK_STATUS.UNLOCK,
  mode: MODE_TYPE.FLAT , // 当前模式是画廊模式还是焦点模式
  screen: SCREEN_TYPE.NORMAL ,// 当前的显示模式，正常窗口

})
// 教室信息存储，可以继续追加
const roomInfo = reactive({
  startTime: 0,
  endTime: 0
})
export {
  UserListType,
  UserType,
  UserListState,
  ShareState,
  ControlUserIdState,
  RoomNameState,
  roomButtonsStatus,
  BUTTON_STATUS,
  roomInfo,
  MODE_TYPE,
  SCREEN_TYPE
}
