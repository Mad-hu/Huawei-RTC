<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-19 11:59:58
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="container" v-show="!shareState.screenShareLocalState">
    <!-- <div class="classroom" v-show="!modeType">
      <StudentList></StudentList>
      <div class="middle">
        <MainBoards ref="mainBoard"></MainBoards>
        <div class="right" v-if="settingBase.userListVisible">
          <UserListView></UserListView>
        </div>
      </div>
      <ToolsBar></ToolsBar>
    </div>
    <div class="classroom" v-show="modeType">
      <joiner-index></joiner-index>
    </div> -->
    <div class="classroom">
      <div v-show="!modeType">
        <StudentList></StudentList>
        <div class="middle">
          <MainBoards ref="mainBoard"></MainBoards>
          <div class="right" v-if="settingBase.userListVisible">
            <UserListView></UserListView>
          </div>
        </div>
      </div>
      <div class="joiner-wrapper" v-show="modeType">
        <joiner-index></joiner-index>
      </div>
      <ToolsBar></ToolsBar>
    </div>
    <count-down></count-down>
    <button-bar></button-bar>
  </div>
  <ShareWindow v-show="shareState.screenShareLocalState"></ShareWindow>
  <user-list-dialog></user-list-dialog>
  <classroom-info-dialog></classroom-info-dialog>
  <share-select-dialog></share-select-dialog>
  <setting-dialog></setting-dialog>
</template>

<script lang="ts">
import { Options, Provide, Vue, Watch } from "vue-property-decorator";
import MainBoards from "../../components/classroom/MainBoards.vue";
import StudentList from "../../components/classroom/StudentList.vue";
import ToolsBar from "../../components/classroom/ToolsBar.vue";
import UserListView from "../../components/classroom/UserListView.vue";
import TeacherView from "../../components/classroom/TeacherView.vue";
import CountDown from "../../components/status/CountDown.vue";
import ButtonBar from "../../components/classroom/ButtonBar.vue";
import JoinerIndex from "../../components/joiner/JoinerIndex.vue";
import ShareSelectDialog from "../../components/dialog/ShareSelectDialog.vue";
import {
  controlCreateSession,
  controlSDKInit,
  controlSDKLogin,
  leaveRoom,
  renderLocalVideo,
  renderRemoteVideo,
  sendControlEnd,
  sendControlReady,
  updateUserInfo,
  getUser,
  msgForShareScreen,
  msgForControlScreen,
  getUserByKeyStatus,
  fixedWindow,
} from "../../services/classroom.service";
import { loadingHide, loadingShow } from "../../services/loading.service";
import {
  messageFloat,
  messageFloatError,
  messageFloatSuccess,
  MessageType,
  messageFloatWarning,
} from "../../services/message/message-float.service";
import {
  ControlUserIdState,
  ShareState,
  UserListState,
  UserType,
  roomButtonsStatus,
  roomInfo,
  MODE_TYPE,
  channelAttributeState,
  BUTTON_STATUS,
  WHITE_BOARD_MSG_TYPES,
} from "../../services/state-manager/classroom-state.service";
import {
  VoiceLevel,
  Volume,
} from "../../services/state-manager/voice-state.service";
import _ from "lodash";
import {
  UserInfoState,
  UserInfoType,
  UserRole,
} from "../../services/state-manager/user-state.service";
import { RtcService } from "../../services/common/rtc.service";
import { RtmService } from "../../services/common/rtm.service";
import { RTCEventType } from "../../services/common/abstract/rtc.abstract";
import { getBjySdk } from "../../services/common/electron.service";
import {
  RemoteControlService,
  RemoteType,
} from "../../services/common/remote-control.service";
import {
  AttributesMap,
  ChannelAttributes,
  CONTROL_STATUS,
  ON_OFF,
  POWER_TYPE,
  rtmTextMessageCategory,
  SHARE_STATUS,
} from "../../services/common/abstract/rtm.abstract";
import {
  RemoteMsgType,
  RemoteControlEventMsgType,
} from "../../services/common/bjysdk/bjysdk.service";
import { getSetting } from "../../services/setting/setting-service";
import { playInroomAudio } from "../../services/music/inroom.service";
import { ElMessageBox } from "element-plus";
import ShareWindow from "../../components/share-window/ShareWindow.vue";
import {
  checkShareStatus,
  openVideoListWindow,
  startShareScreen,
  stopScreenShare,
  stopScreenShareDelegate,
} from "../../services/share-window.service";
import { DialogState } from "../../services/state-manager/dialog-state.service";

const VITE_AGORA_RTC_APPID = import.meta.env.VITE_AGORA_RTC_APPID;
const VITE_CONTROL_ACCOUNT = import.meta.env.VITE_CONTROL_ACCOUNT;
const VITE_CONTROL_PASS = import.meta.env.VITE_CONTROL_PASS;

const VITE_HUAWEI_RTC_APPID = import.meta.env.VITE_HUAWEI_RTC_APPID;
const VITE_HUAWEI_DOMAIN = import.meta.env.VITE_HUAWEI_DOMAIN;

const VITE_NETEASE_SDK_KEY = import.meta.env.VITE_NETEASE_SDK_KEY;
@Options({
  components: {
    StudentList,
    MainBoards,
    ToolsBar,
    UserListView,
    TeacherView,
    CountDown,
    ButtonBar,
    JoinerIndex,
    ShareSelectDialog,
    ShareWindow
  },
})
export default class Classroom extends Vue {
  userList: UserType[] = UserListState.lists;
  userInfoStore: UserInfoType = UserInfoState;
  channel: string = roomInfo.roomName;
  control_address: string = "";
  control_session: string = "";

  voiceObj: Volume = VoiceLevel;
  settingBase = getSetting().base;
  shareState = ShareState;
  get modeType() {
    return roomButtonsStatus.mode == MODE_TYPE.FLAT;
  }

  get localPower() {
    const user = getUserByKeyStatus('isLocal', true) || {power: POWER_TYPE.STUDENT}
    return user.power == POWER_TYPE.STUDENT
  }
  // @Provide({
  //   to: 'roomContext',
  //   reactive: true
  // }) foo: any = null;

  @Watch("modeType")
  onModeTypeChange(newV: boolean, oldV: boolean) {
    if (!newV) {
      // 这是焦点模式
      console.log("onModeTypeChange->", this.userList);
      this.userList.forEach((item) => {
        console.log(
          "onModeTypeChange->item",
          item.focus,
          item.focus == ON_OFF.ON
        );
        if (item.isLocal) {
          if (item.focus == ON_OFF.ON) {
            renderLocalVideo(`focus_${item.userId}`);
          } else {
            renderLocalVideo(`user_${item.userId}`);
          }
        } else {
          if (item.focus == ON_OFF.ON) {
            renderRemoteVideo(`focus_${item.userId}`, item.userId);
          } else {
            renderRemoteVideo(`user_${item.userId}`, item.userId);
          }
        }
      });
    }
  }

  get localRoomUserId() {
    const user = getUserByKeyStatus("isLocal", true);
    if (user) return user.userId;
    return this.userInfoStore.userId;
  }
  mounted() {
    try {
      loadingShow("初始化RTC/RTM/Control SDK");
      this.initRtc();
      this.initRtm();
      this.remoteControlEvent();
      loadingHide();
      // this.foo = this.$refs['shareSelectDialogRef1']
    } catch (error) {
      setTimeout(() => {
        messageFloat(`rtc: ${error}`, MessageType.error);
        loadingHide();
      }, 1000 * 2);
    }
    // 进入教室1.5秒后，静默启动videoListWindow
    setTimeout(() => {
      // openVideoListWindow();
    }, 1500);
  }
  unmounted() {
    leaveRoom();
  }

  async shareScreen() {
    // 老师选择共享 学生和其他身份直接共享屏幕
    if (UserInfoState.role == UserRole.teacher) {
      DialogState.shareSelectVisible = true;
    } else {
      const status = await checkShareStatus();
      if (!status) {
        return;
      }
      startShareScreen();
    }
  }
  /**
   * initial　rtc sdk
   */
  initRtc() {
    RtcService().init(VITE_HUAWEI_RTC_APPID, { domain: VITE_HUAWEI_DOMAIN });
    this.rtcEvent();
    setTimeout(() => {
      RtcService().joinRoom(this.channel, this.userInfoStore.userId, {
        userName: this.userInfoStore.userName,
        role: this.userInfoStore.role,
      });
    }, 1000);
    // 初始化教室的开始时间，以后从服务器获取赋值
    if (this.userInfoStore.role == UserRole.teacher) {
      roomInfo.startTime = new Date().getTime();
      roomInfo.endTime = roomInfo.startTime + 1 * 60 * 60 * 1000;
    }
  }
  /**
   * initial　rtm sdk
   */
  async initRtm() {
    try {
      // if (sdk_build_config.rtm.company == "wangyi") {
      //   // 在进入之前，需要从后台获取用户的网易云信账户和密码
      //   const opt = {
      //     account: "a11111",
      //     token: "a11111",
      //     domain: "",
      //   };
      //   await RtmService().init(VITE_NETEASE_SDK_KEY, opt)!.toPromise();
      // } else if (sdk_build_config.rtm.company == "agora") {
      RtmService().init(VITE_AGORA_RTC_APPID);
      // }

      this.rtmEvent();
      RtmService().login({
        userId: this.userInfoStore.userId,
        channel: this.channel,
      });
    } catch (error) {
      console.log(error);
      messageFloatError("登录失败，请打开控制台，查看详情。");
    }
  }
  /**
   * rtc 音视频监听
   **/
  rtcEvent() {
    RtcService().on(RTCEventType.error, (err, msg) => {
      console.log("rtcEvent Error:", err, msg);
      messageFloatError(`rtcEvent Error:${err},${msg}`);
      if (err == 90000027) {
        stopScreenShareDelegate();
      }
    });

    RtcService().on(RTCEventType.joinedRoom, (roomId, userId) => {
      const userInfo = {
        userId: userId,
        userName: this.userInfoStore.userName,
        power: this.setPower(
          userId,
          userId == RtcService().getUserLocalId(),
          this.userInfoStore.role
        ),
        video:
          this.userInfoStore.role == UserRole.student ? ON_OFF.ON : ON_OFF.OFF,
        audio:
          this.userInfoStore.role == UserRole.student ? ON_OFF.ON : ON_OFF.OFF,
        focus: ON_OFF.OFF,
        control: CONTROL_STATUS.NO_CONTROL_RECORD,
        share: SHARE_STATUS.NO_SHARE_RECORD,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      console.log("joinedRoom:", userInfo);

      this.userJoin(userInfo);
      RtcService().enableLocalAudio(
        userInfo.audio == ON_OFF.OFF ? false : true
      );
    });
    // 远端用户加入房间
    RtcService().on(RTCEventType.userJoined, (roomId, userId, userName) => {
      console.log(
        "userJoined:",
        roomId,
        userId,
        userName,
        userName.split("_roletype_")[1]
      );
      const userInfo = {
        userId: userId,
        userName: userName.split("_roletype_")[0],
        power: this.setPower(
          userId,
          userId == RtcService().getUserLocalId(),
          userName.split("_roletype_")[1]
        ),
        video: ON_OFF.ON,
        audio: ON_OFF.ON,
        focus: ON_OFF.OFF,
        control: CONTROL_STATUS.NO_CONTROL_RECORD,
        share: SHARE_STATUS.NO_SHARE_RECORD,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      this.userJoin(userInfo);
      if(!this.localPower) messageFloatWarning(userInfo.userName+'进入教室')
    });
    // 远端用户离开教室
    RtcService().on(RTCEventType.userOffline, (roomId, userId, reason) => {
      _.remove(this.userList, (item) => {
        if(item.userId == userId) {
           if(!this.localPower) messageFloatWarning(item.userName+'离开教室')
        }
        return item.userId == userId;
      });
    });
    // 本地用户离开教室
    RtcService().on(RTCEventType.leaveRoom, (roomId, userId, reason) => {
      console.log(roomId, userId, reason);
    });

    // 共享屏幕流开启的事件通知。
    RtcService().on(RTCEventType.screenCaptureStarted, () => {
      console.log("screen callback", RTCEventType.screenCaptureStarted);
      updateUserInfo(this.localRoomUserId, "share", SHARE_STATUS.SHAREING);
    });

    // 共享屏幕流关闭的事件通知。
    RtcService().on(RTCEventType.screenCaptureStoped, () => {
      console.log("screen callback", RTCEventType.screenCaptureStoped);
      updateUserInfo(this.localRoomUserId, "share", SHARE_STATUS.SHARE_END);
      // const user:any = getUserByKeyStatus('share', SHARE_STATUS )
      msgForShareScreen(
        this.localRoomUserId,
        SHARE_STATUS.SHARE_END,
        "结束屏幕共享"
      );
    });

    // 监听本地声音变化
    RtcService().on(RTCEventType.localVolumeChanged, (volume, muted) => {
      this.voiceObj[this.localRoomUserId] = this.formateSound(volume);
    });

    // 监听本地、远端声音变化
    RtcService().on(
      RTCEventType.userVolumeStats,
      (volumes, volumeCounts, totalVolume) => {
        this.initVoiceLevel(volumes);
      }
    );

    //   RtcService().on(RTCEventType.localAudioStateChanged, (state, reason) => {
    //   console.log(RTCEventType.localAudioStateChanged + ':', state, reason);
    // });
    // 监听远端用户的音频设备
    RtcService().on(
      RTCEventType.remoteAudioStateChanged,
      (roomId, userId, state, reason) => {
        console.log(
          RTCEventType.remoteAudioStateChanged + ":",
          roomId + ":" + roomId,
          state,
          reason
        );
        const user = getUser(userId);
        if (user) {
          //根据status完善
          // <华为云api> 0, 音频流停止发送。, 1，音频流发送中。
          updateUserInfo(userId, "audio", state);
        }
      }
    );
    // 监听远端用户的视频设备
    RtcService().on(
      RTCEventType.remoteVideoStateChanged,
      (roomId, userId, state, reason) => {
        console.log(
          RTCEventType.remoteVideoStateChanged + ":",
          roomId + ":" + roomId,
          state,
          reason
        );
        const user = getUser(userId);
        if (user) {
          // 根据status完善
          // <华为云api> 0, 视频流停止发送。, 1，视频流发送中。
          updateUserInfo(userId, "video", state);
        }
      }
    );

    //  远端开启/停止共享流的事件通知。
    RtcService().on(
      RTCEventType.userSubStreamAvailable,
      (roomId, userId, available) => {
        console.log(
          "user sub stream available!",
          `roomId:${roomId}`,
          `userId:${userId}`,
          `available${available}`
        );
        const user = getUser(userId);
        if (user) {
          updateUserInfo(
            userId,
            "share",
            available ? SHARE_STATUS.SHAREING : SHARE_STATUS.SHARE_END
          );
        }
        if (available) {
          if (userId == RtcService().getUserLocalId()) {
            console.log("local user, can not substream!");
            return;
          }
          const user = getUser(userId);
          const remoteShareItem = this.shareState.remoteShareList.findIndex(
            (item) => item.userId == userId
          );
          if (remoteShareItem == -1) {
            const item = {
              userName: user!.userName,
              userId: userId,
              available: available,
            };
            ShareState.remoteShareList.push(item);
            ShareState.currentShare = item;
          } else {
            const item = {
              userName: user!.userName,
              userId: userId,
              available: available,
            };
            ShareState.remoteShareList[remoteShareItem] = item;
            ShareState.currentShare = item;
          }

          setTimeout(() => {
            const shareBoxDiv = <HTMLDivElement>(
              document.getElementById("share-box")
            );
            const shareBoxBodyDiv = document.createElement("div");
            shareBoxBodyDiv.id = `share-${userId}`;
            shareBoxBodyDiv.style.width = "100%";
            shareBoxBodyDiv.style.height = "100%";
            shareBoxDiv.appendChild(shareBoxBodyDiv);
            const renderRemoteScreenShareState =
              RtcService().startRenderRemoteScreenShare(
                userId,
                shareBoxBodyDiv
              );
            setTimeout(() => {
              RtcService().setRemoteSubStreamViewDisplayMode(userId, 0);
            }, 3000);

            if (renderRemoteScreenShareState == 0) {
              const shareUserInfo = this.userList.find(
                (item) => item.userId == userId
              );
              messageFloatSuccess(
                `正在查看${shareUserInfo && shareUserInfo.userName}的共享`
              );
            } else {
              messageFloatError(
                `subscribe remote stream error, code:${renderRemoteScreenShareState}`
              );
            }
          }, 1500);
        } else {
          RtcService().stopRenderRemoteScreenShare(userId);
          if(channelAttributeState.shareControlStaus == BUTTON_STATUS.SHARE_CONTROL_MUL) {
            const userItem = ShareState.remoteShareList.find(item => item.userId == userId);
            userItem && (userItem.available = false);
            return;
          }
          messageFloatSuccess(
            `${ShareState.currentShare.userName}的共享已结束`
          );
          ShareState.currentShare= {
                          userName: "",
                          userId: "",
                          available: false,
          }
          _.remove(ShareState.remoteShareList, (item) => item.userId == userId);

        }
      }
    );
  }

  setPower(userId: number, isLocal: boolean, role: string) {
    // if(roomButtonsStatus.superPower == "") {
    //    msgForPowerChange(userId, POWER_TYPE.MAIN_TEACHER, '讲师' )
    //    return POWER_TYPE.MAIN_TEACHER
    // }else {
    //   return isLocal? this.userInfoStore.role: POWER_TYPE.STUDENT
    // }
    if (role == UserRole.student) return POWER_TYPE.STUDENT;
    if (role == UserRole.teacher) return POWER_TYPE.MAIN_TEACHER;
    return POWER_TYPE.STUDENT;
  }

  userJoin(userInfo: any) {
    console.log("joinroom userinfo:", userInfo);
    // 当前进入教室的角色如果是老师，并且 房间信息里面没有superPower的信息。则将此人设置为超级支持人，并完善存储信息
    if (userInfo.power == POWER_TYPE.MAIN_TEACHER) {
      roomButtonsStatus.superPower = userInfo.userId;
    }
    this.userList.push(userInfo);
    setTimeout(() => {
      let prefix = this.modeType ? "joiner_one" : "user_";
      if (userInfo.isLocal) {
        renderLocalVideo(`${prefix}${userInfo.userId}`);
      } else {
        renderRemoteVideo(`${prefix}${userInfo.userId}`, userInfo.userId);
      }
      if (getSetting().base.intoClassAudio) {
        playInroomAudio();
      }
    }, 500);
  }
  /**
   * 远程控制监听
   **/
  remoteControlEvent() {
    if (!getBjySdk()) {
      messageFloat(
        `not found bjysdk, please check native preload !`,
        MessageType.error
      );
      return;
    }
    RemoteControlService().on(RemoteMsgType.notic, (msg) => {
      console.log("RemoteControlService notic:", msg);
    });
    RemoteControlService().on(
      RemoteMsgType.session,
      (evenMsg: RemoteControlEventMsgType) => {
        console.log("RemoteControlService session:", evenMsg);
        this.control_session = evenMsg.session!;
      }
    );
    RemoteControlService().on(
      RemoteMsgType.address,
      (evenMsg: RemoteControlEventMsgType) => {
        console.log("RemoteControlService address:", evenMsg);
        this.control_address = evenMsg.address!;
      }
    );
    RemoteControlService().on(RemoteMsgType.error, (error) => {
      messageFloatError(error);
    });
    electron_render().ipcRenderer.send("controlRemote", "init");
    electron_render().ipcRenderer.on(
      "controlEvent",
      (event: any, type: string, evenMsg: RemoteControlEventMsgType) => {
        console.log("controlEvent::", type, evenMsg);
        if (type == RemoteMsgType.destroy) {
          sendControlEnd(ControlUserIdState.userId);
          const user: any = getUserByKeyStatus(
            "control",
            CONTROL_STATUS.CONTROL_ING
          );
          if (user) {
            updateUserInfo(user.userId, "control", CONTROL_STATUS.CONTROL_END);
            msgForControlScreen(
              user.userId,
              CONTROL_STATUS.CONTROL_END,
              "结束远程控制"
            );
          }
        }
      }
    );
  }
  /**
   * rtm 信令消息监听
   **/
  rtmEvent() {
    // RtmService().on(rtmTextMessageCategory.JOIN_CHANNEL, () => {});
    // RtmService().on(rtmTextMessageCategory.LEAVE_CHANNEL, (data) => {
    //   const { userId, exit } = data;
    //   if (!exit) {
    //     _.remove(this.userList, (item) => item.userId == userId);
    //   } else {
    //     leaveRoom();
    //     history.back();
    //   }
    // });


    RtmService().on(rtmTextMessageCategory.CONTROL_START, (data) => {
      const { userId } = data;
      if (userId == RtcService().getUserLocalId()) {
        try {
          controlSDKInit(RemoteType.client);
          controlSDKLogin(`${VITE_CONTROL_ACCOUNT}`, `${VITE_CONTROL_PASS}`);
          const loadAddressTimer = setInterval(() => {
            if (this.control_address != "") {
              // this.control_session = RemoteControlService().createDesktopsession('create');
              this.control_session = controlCreateSession();
              clearInterval(loadAddressTimer);
              sendControlReady(
                `${RtcService().getUserLocalId()}`,
                this.control_address,
                this.control_session
              );
            }
          }, 200);
        } catch (error) {
          messageFloat(`rtc: ${error}`, MessageType.error);
        }
      }
      // this.userList.map((item) => (item.control = false));
      this.userList.map((item) => (item.control = CONTROL_STATUS.CONTROL_ING));
    });
    RtmService().on(rtmTextMessageCategory.CONTROL_READY, (data) => {
      try {
        const { userId, server_address, server_session } = data;
        const msg =
          '{"address":"' +
          server_address +
          '","session":"' +
          server_session +
          '"}';
        console.log(rtmTextMessageCategory.CONTROL_READY, msg);
        // controlSDKInit(RemoteType.remote);

        console.log("createDesktop::", msg);
        electron_render().ipcRenderer.send("controlRemote", "desktop", msg);
        loadingHide();
      } catch (error) {
        console.log(rtmTextMessageCategory.CONTROL_READY + "error:", error);
      }
    });
    RtmService().on(rtmTextMessageCategory.CONTROL_END, (data) => {
      const { userId } = data;
      if (userId == RtcService().getUserLocalId()) {
        RemoteControlService().destroyDesktopsession("delete");
      }
      this.control_address = "";
      this.control_session = "";
      // this.userList.map((item) => (item.control = true));
      this.userList.map((item) => (item.control = CONTROL_STATUS.CONTROL_END));
    });

    // 监听更改昵称，更新用户列表的展示
    RtmService().on(rtmTextMessageCategory.NICKNAME_CHANGE, (data) => {
      const { targetUserId, nickName } = data;
      updateUserInfo(targetUserId, "userName", nickName);
    });
    // 收到静音指令 只需要提示就可以，具体的更新状态在 audio 状态回调中执行
    RtmService().on(rtmTextMessageCategory.MUTE_AUDIO, (data) => {
      const { targetUserId, status, audioStatus } = data;
      const user = getUser(targetUserId);
      if (targetUserId == "all") {
        messageFloatWarning(
          status ? ON_OFF.AUDIO_ON_TIP : ON_OFF.AUDIO_OFF_TIP
        );
        // 如果收到全体静音时,要更新教室按钮的状态
        roomButtonsStatus.audioStatus = audioStatus;
        updateUserInfo(this.localRoomUserId, "audio", status);
        RtcService().enableLocalAudio(status == ON_OFF.ON ? true : false);
      } else {
        if (user && user.isLocal) {
          messageFloatWarning(
            status ? ON_OFF.AUDIO_ON_TIP : ON_OFF.AUDIO_OFF_TIP
          );
          updateUserInfo(user.userId, "audio", status);
          RtcService().enableLocalAudio(status == ON_OFF.ON ? true : false);
        }
      }
    });

    // 收到开启视频指令 只需要提示就可以，具体的更新状态在 video 状态回调中执行
    RtmService().on(rtmTextMessageCategory.MUTE_VIDEO, (data) => {
      const { targetUserId, status } = data;
      const user = getUser(targetUserId);
      if (user && user.isLocal) {
        messageFloatWarning(
          status ? ON_OFF.VIDEO_ON_TIP : ON_OFF.VIDEO_OFF_TIP
        );
        updateUserInfo(user.userId, "video", status);
      }
    });

    // 收到将user 设为焦点，同时更新ui, 拉取某路流放在中间
    RtmService().on(rtmTextMessageCategory.MUTE_FOCUS, (data) => {
      const { targetUserId, status } = data;
      const user = getUser(targetUserId);
      if (user) {
        if (user.isLocal) {
          messageFloatWarning(
            status ? ON_OFF.FOCUS_ON_TIP : ON_OFF.FOCUS_OFF_TIP
          );
        }
        // 更新ui,怎么把流放在中间？？？？
        updateUserInfo(targetUserId, "focus", status);
        roomButtonsStatus.mode =
          status == ON_OFF.OFF ? roomButtonsStatus.mode : MODE_TYPE.FOCUS;
        if (status == ON_OFF.OFF) {
          let prefix = this.modeType ? "joiner_one" : "user_";

          if (targetUserId == this.localRoomUserId) {
            renderLocalVideo(`${prefix}${targetUserId}`);
          } else {
            renderRemoteVideo(`${prefix}${targetUserId}`, targetUserId);
          }
        }
      }
    });

    // 收到将user 更换角色 power 变更
    RtmService().on(rtmTextMessageCategory.POWER_CHANGE, (data) => {
      const { targetUserId, status, statusName } = data;
      const user = getUser(targetUserId);
      if (user && user.isLocal) {
        messageFloatWarning(statusName);
        updateUserInfo(targetUserId, "power", status);
      }
    });

    // 收到请求屏幕分享
    RtmService().on(rtmTextMessageCategory.SHARE_SCREEN, (data) => {
      console.log("屏幕分享", data);
      let { targetUserId, status, statusName, ui } = data;
      console.log(
        "targetUserID->1",
        targetUserId == "all",
        this.localRoomUserId
      );
      if (targetUserId == "all") {
        targetUserId = this.localRoomUserId;
      }
      if (status == SHARE_STATUS.SHARE_REFUED) {
        // status : 5 , 拒绝屏幕分享
        messageFloatWarning(statusName);
        updateUserInfo(targetUserId, "share", status);
        return;
      }

      console.log("targetUserID", targetUserId);
      const user = getUser(targetUserId);
      console.log("targetUserID -> user", user);
      if (user!.power == 0 && status == SHARE_STATUS.SHAREING) {
        const remoteShareItem = this.shareState.remoteShareList.findIndex(
          (item) => item.userId == targetUserId
        );
        if (remoteShareItem == -1) {
          this.shareState.remoteShareList.push({
            userName: user!.userName,
            userId: targetUserId,
            available: false,
          });
        }
      }
      if (user && user.isLocal) {
        // status : 4 ,请求屏幕共享，
        if (status == SHARE_STATUS.SHARE_ASK) {
          // share  = 0 未曾共享，则需要弹框提示，是否同意共享
          // share = 3 已经结束共享，则新一轮屏幕分享，需要走1
          if (
            user.share == SHARE_STATUS.NO_SHARE_RECORD ||
            user.share == SHARE_STATUS.SHARE_END
          ) {
            this.shareConfirm(targetUserId);
          } else if (user.share == SHARE_STATUS.SHARE_AGREE) {
            //  share = 2 同意共享，则直接执行屏幕分享，
            this.shareScreen();
          }
        } else if (status == SHARE_STATUS.SHARE_END) {
          // // status: 3 , 请求结束共享，需要执行结束共享的方法
          // const mainBoard: any = this.$refs["mainBoard"];
          // console.log("targetUserID-> close", mainBoard);
          // if (ui) {
          //   mainBoard.stopScreenShare();
          // } else {
          //   RtcService().stopScreenShare();
          // }

          messageFloatWarning(statusName);
          updateUserInfo(targetUserId, "share", status);
        }
        // 如果当前用户的share = 1 屏幕分享中，则不处理
        updateUserInfo(targetUserId, "share", status);
      }
    });

    // 收到请求远程控制
    RtmService().on(rtmTextMessageCategory.CONTROL_SCREEN, (data) => {
      console.log("远程控制", data);
      let { targetUserId, status, statusName, server_address, server_session } =
        data;
      if (status == CONTROL_STATUS.CONTROL_READY) {
        // status: 6  已初始化远程，
        this.controlScreenReady(server_address, server_session);
        updateUserInfo(targetUserId, "control", CONTROL_STATUS.CONTROL_ING);
        return;
      } else if (status == CONTROL_STATUS.CONTROL_REFUED) {
        // status : 5 , 拒绝远程控制
        loadingHide();
        messageFloatWarning(statusName);
        updateUserInfo(targetUserId, "control", CONTROL_STATUS.CONTROL_REFUED);
        return;
      }
      if (targetUserId == "all") {
        targetUserId = this.localRoomUserId;
      }
      const user = getUser(targetUserId);
      if (user && user.isLocal) {
        // status : 4 ,请求远程控制，
        if (status == CONTROL_STATUS.CONTROL_ASK) {
          // control  = 0 未曾控制，则需要弹框提示，是否同意共享
          // control = 3 已经结束控制，则新一轮远程控制，需要走1
          if (
            user.control == CONTROL_STATUS.NO_CONTROL_RECORD ||
            user.control == CONTROL_STATUS.CONTROL_END
          ) {
            this.controlConfirm(targetUserId);
          } else if (user.control == CONTROL_STATUS.CONTROL_AGREE) {
            //  control = 2 同意远程控制，则直接执行远程控制，
            this.controlScreenStart(user.userId);
          }
        } else if (status == CONTROL_STATUS.CONTROL_END) {
          // status: 3 , 请求远程控制，需要执行结束远程控制的方法
          this.controlScreenEnd(user.userId, statusName);
        }
        // 如果当前用户的control = 1 远程控制中，则不处理
        updateUserInfo(targetUserId, "control", status);
      }
    });
    // 点对点消息-带历史记录
    RtmService().on(
      rtmTextMessageCategory.MESSAGE_FROM_PEER,
      (data, peerId, messageProps) => {}
    );
    // 固定学员屏幕
    RtmService().on(rtmTextMessageCategory.FIXED_STUDENT_WINDOW, (data) => {
      if (this.userInfoStore.role == UserRole.student) {
        const { fixed } = data;
        fixedWindow(!fixed ? true : false);
      }
    });
    // 频道属性更新回调。返回所在频道的所有属性。
    RtmService().on(
      rtmTextMessageCategory.ATTRIBUTES_UPDATED,
      (attributes: AttributesMap) => {
        console.log("频道属性更改：", attributes);
        _(attributes).forEach((value: any, key) => {
          channelAttributeState[key] = value.value;
        });
      }
    );

    RtmService().on(
      rtmTextMessageCategory.STOP_SHARE_SCREEN, (data) => {
        const { userId, ui } = data;
        if(parseInt(userId) == this.localRoomUserId || userId == 'all') {
          if(ui) {
            stopScreenShare();
          } else {
            stopScreenShareDelegate();
          }
        } else {
          console.log('STOP_SHARE_SCREEN false');
        }
      }
    );
    RtmService().on(
      rtmTextMessageCategory.START_SHARE_SCREEN, (data) => {
        const { userId, ui } = data;
        if(parseInt(userId) == this.localRoomUserId) {
          if(ui) {
            startShareScreen();
          } else {
            RtcService().startScreenShare();
          }
        } else {
          console.log('START_SHARE_SCREEN false');
        }
      }
    );
  }

  shareConfirm(userId: number) {
    ElMessageBox.confirm("老师向您发起了屏幕共享请求，是否同意？", "info", {
      confirmButtonText: "同意",
      cancelButtonText: "否",
    })
      .then(() => {
        // 同意共享
        updateUserInfo(userId, "share", SHARE_STATUS.SHARE_AGREE);
        // 用法消息给请求者告知吗？
        this.shareScreen();
      })
      .catch(() => {
        // 拒绝共享
        updateUserInfo(userId, "share", SHARE_STATUS.NO_SHARE_RECORD);
        msgForShareScreen(
          userId,
          SHARE_STATUS.SHARE_REFUED,
          this.userInfoStore.userName + "拒绝共享"
        );
      });
  }

  controlConfirm(userId: number) {
    ElMessageBox.confirm("老师向您发起了远程控制请求，是否同意？", "info", {
      confirmButtonText: "同意",
      cancelButtonText: "否",
    })
      .then(() => {
        // 同意远程控制
        updateUserInfo(userId, "control", CONTROL_STATUS.CONTROL_AGREE);
        // 用法消息给请求者告知吗？
        this.controlScreenStart(userId);
      })
      .catch(() => {
        // 拒绝远程控制
        updateUserInfo(userId, "control", CONTROL_STATUS.NO_CONTROL_RECORD);
        msgForControlScreen(
          userId,
          CONTROL_STATUS.CONTROL_REFUED,
          this.userInfoStore.userName + "拒绝远程控制"
        );
      });
  }

  controlScreenStart(userId: number) {
    try {
      controlSDKInit(RemoteType.client);
      controlSDKLogin(`${VITE_CONTROL_ACCOUNT}`, `${VITE_CONTROL_PASS}`);
      const loadAddressTimer = setInterval(() => {
        if (this.control_address != "") {
          // this.control_session = RemoteControlService().createDesktopsession('create');
          this.control_session = controlCreateSession();
          clearInterval(loadAddressTimer);
          // sendControlReady(
          //   `${RtcService().getUserLocalId()}`,
          //   this.control_address,
          //   this.control_session
          // );
          updateUserInfo(userId, "control", CONTROL_STATUS.CONTROL_READY);
          msgForControlScreen(
            userId,
            CONTROL_STATUS.CONTROL_READY,
            "已初试话好远程控制",
            this.control_address,
            this.control_session
          );
        }
      }, 200);
    } catch (error) {
      messageFloat(`rtc: ${error}`, MessageType.error);
    }
  }

  controlScreenReady(server_address: string, server_session: string) {
    try {
      const msg =
        '{"address":"' +
        server_address +
        '","session":"' +
        server_session +
        '"}';
      console.log("createDesktop::", msg);
      electron_render().ipcRenderer.send("controlRemote", "desktop", msg);
      loadingHide();
    } catch (error) {
      console.log(rtmTextMessageCategory.CONTROL_READY + "error:", error);
    }
  }

  controlScreenEnd(userId: number, statusName: string) {
    if (userId == RtcService().getUserLocalId()) {
      RemoteControlService().destroyDesktopsession("delete");
    }
    this.control_address = "";
    this.control_session = "";
    messageFloatWarning(statusName);
  }

  initVoiceLevel(volumes: Array<Volume>) {
    volumes.forEach((item) => {
      this.voiceObj[item.userId] = this.formateSound(item.volume);
    });
  }

  formateSound(volume: number) {
    // if(volume>40) {
    //   return 'sound4'
    // }else if(volume> 20 && volume <41) {
    //   return 'sound3'
    // }else if(volume > 10 && volume < 21) {
    //   return 'sound2'
    // }else if(volume > 0 && volume < 11) {
    //   return 'sound1'
    // }else {
    //   return 'sound'
    // }

    if (
      volume > 94 ||
      (volume > 70 && volume < 75) ||
      (volume > 82 && volume < 87)
    ) {
      return "sound4";
    } else if (
      (volume > 10 && volume < 15) ||
      (volume > 22 && volume < 27) ||
      (volume > 34 && volume < 39) ||
      (volume > 46 && volume < 51) ||
      (volume > 54 && volume < 59) ||
      (volume > 66 && volume < 71) ||
      (volume > 78 && volume < 83) ||
      (volume > 90 && volume < 95)
    ) {
      return "sound3";
    } else if (
      (volume > 6 && volume < 11) ||
      (volume > 18 && volume < 23) ||
      (volume > 30 && volume < 35) ||
      (volume > 42 && volume < 47) ||
      (volume > 50 && volume < 55) ||
      (volume > 62 && volume < 67) ||
      (volume > 74 && volume < 79) ||
      (volume > 86 && volume < 91)
    ) {
      return "sound2";
    } else if (
      (volume > 0 && volume < 5) ||
      (volume > 14 && volume < 19) ||
      (volume > 26 && volume < 31) ||
      (volume > 38 && volume < 43) ||
      (volume > 46 && volume < 51) ||
      (volume > 58 && volume < 63) ||
      (volume > 58 && volume < 63)
    ) {
      return "sound1";
    } else {
      return "sound";
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.classroom {
  background-color: #999;
  flex-grow: 1;
  .middle {
    display: flex;
    height: calc(100vh - 188px);
    width: 100%;
  }
  .right {
    position: relative;
    min-width: 192px;
    height: calc(100vh - 188px);
    border-left: 1px solid #fff;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .joiner-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 80px);
    width: 100%;
  }
}
</style>
