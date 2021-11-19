<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-19 11:56:24
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="classroom">
    <joiner-index></joiner-index>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import MainBoards from "../../components/classroom/MainBoards.vue";
import StudentList from "../../components/classroom/StudentList.vue";
import ToolsBar from "../../components/classroom/ToolsBar.vue";
import UserListView from "../../components/classroom/UserListView.vue";
import TeacherView from "../../components/classroom/TeacherView.vue";
import CountDown from "../../components/status/CountDown.vue";
import ButtonBar from "../../components/classroom/ButtonBar.vue";
import JoinerIndex from "../../components/joiner/JoinerIndex.vue";
import ShareSelectDialog from "../../components/dialog/ShareSelectDialog.vue"
import {
  leaveRoom,
  renderLocalVideo,
  renderRemoteVideo,
  updateUserInfo,
  getUser,
} from "../../services/classroom.service";
import {
  messageFloat,
  messageFloatError,
  MessageType,
  messageFloatWarning,
} from "../../services/message/message-float.service";
import {
  roomInfo,
  UserListState,
  UserType,
  roomButtonsStatus,
} from "../../services/state-manager/classroom-state.service";
import _ from "lodash";
import {
  UserInfoState,
  UserInfoType,
  UserRole,
} from "../../services/state-manager/user-state.service";
import { RtcService } from "../../services/common/rtc.service";
import { RtmService } from "../../services/common/rtm.service";
import { RTCEventType } from "../../services/common/abstract/rtc.abstract";
import {
  CONTROL_STATUS,
  ON_OFF,
  POWER_TYPE,
  rtmTextMessageCategory,
  SHARE_STATUS,
} from "../../services/common/abstract/rtm.abstract";
import ShareWindow from "../../components/share-window/ShareWindow.vue";
import { windowService } from "../../services/window.service";
import { TitleBarState } from "../../services/state-manager/titlebar-state.service";
import { setStorage } from "../../services/storage.service";
import { getCurrentWindow, getCurrentWindowWebContentsId, getIpcRenderer } from "../../services/common/electron.service";

const VITE_AGORA_RTC_APPID = import.meta.env.VITE_AGORA_RTC_APPID;

const VITE_HUAWEI_RTC_APPID = import.meta.env.VITE_HUAWEI_RTC_APPID;
const VITE_HUAWEI_DOMAIN = import.meta.env.VITE_HUAWEI_DOMAIN;

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
export default class VideoListWindow extends Vue {
  userList: UserType[] = UserListState.lists;
  userInfoStore: UserInfoType = UserInfoState;
  channel: string = '123';
  control_address: string = "";
  control_session: string = "";
  titleBarState = TitleBarState;
  sdkInit = false;
  mounted() {
    // this.saveWebContentId();
    // this.messageEvent();
  }
  sdkMounted(roomName: string) {
    try {
      // const randStr = (Math.random() * 10000).toFixed(0);
      // this.userInfoStore.userName = 'videoList';
      // this.userInfoStore.userId = 'videoList' + randStr;
      roomInfo.roomName = roomName;
      this.initRtc();
      this.initRtm();
      this.sdkInit = true;
    } catch (error) {
      setTimeout(() => {
        messageFloat(`rtc: ${error}`, MessageType.error);
      }, 1000 * 2);
    }
    this.titleBarState.text = '视频列表';
  }
  /**
   * 保存本窗口webContentID，用于窗口间通信
   */
  saveWebContentId() {
    const cwwcId = getCurrentWindowWebContentsId();
    setStorage('videoListWindow', {
      webContentId: cwwcId
    });
  }
  messageEvent() {
    getIpcRenderer().on('msgToVideo', (e: any, args: any) =>{
      const {type, msg} = args;
      switch(type) {
        case 'close':
          windowService().close();
          break;
        case 'show':
          // sdk在显示的时候初始化并加载
          if(!this.sdkInit) {
            const roomName = args.roomName;
            this.sdkMounted(roomName || '');
          }
          windowService().show();
          break;
        case 'hide':
          windowService().hide();
          break;
      }
    });
  }
  unmounted() {
    leaveRoom();
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
      RtmService().init(VITE_AGORA_RTC_APPID);
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
    });

    RtcService().on(RTCEventType.joinedRoom, (roomId, userId) => {
      console.log("joinedRoom:", roomId, userId);
      const userInfo = {
        userId: userId,
        userName: this.userInfoStore.userName,
        power: this.setPower(userId, userId == RtcService().getUserLocalId(),this.userInfoStore.role),
        video: ON_OFF.ON,
        audio: ON_OFF.ON,
        focus: ON_OFF.OFF,
        control: CONTROL_STATUS.NO_CONTROL_RECORD,
        share: SHARE_STATUS.NO_SHARE_RECORD,
        isLocal: userId == RtcService().getUserLocalId(),
      };

      this.userJoin(userInfo);
    });
    RtcService().on(RTCEventType.userJoined, (roomId, userId, userName) => {
      console.log("userJoined:", roomId, userId, userName);
      const userInfo = {
        userId: userId,
        userName: userName.split("_roletype_")[0],
        power: this.setPower(userId,userId == RtcService().getUserLocalId(),''),
        video: ON_OFF.ON,
        audio: ON_OFF.ON,
        focus: ON_OFF.OFF,
        control: CONTROL_STATUS.NO_CONTROL_RECORD,
        share: SHARE_STATUS.NO_SHARE_RECORD,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      this.userJoin(userInfo);
    });
    RtcService().on(RTCEventType.userOffline, (_roomId, userId, _reason) => {
      _.remove(this.userList, (item) => {
        console.log("item.userId:", item.userId, "userId:", userId);
        return item.userId == userId;
      });
    });

    RtcService().on(RTCEventType.leaveRoom, (roomId, userId, reason) => {
      console.log(roomId, userId, reason);
    });
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
           updateUserInfo(userId, 'audio', state)
        }
      }
    );
    // 监听远端用户的音频设备
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
          updateUserInfo(userId, 'video', state)
        }
      }
    );
  }

  setPower(_userId:number, _isLocal: boolean, role:string) {
    if(role == UserRole.student) return POWER_TYPE.STUDENT;
    if(role == UserRole.teacher) return POWER_TYPE.MAIN_TEACHER;
    return POWER_TYPE.STUDENT
  }

  userJoin(userInfo: any) {
    console.log("joinroom userinfo:", userInfo);
    this.userList.push(userInfo);
    setTimeout(() => {
      let prefix = 'joiner_one';
      if (userInfo.isLocal) {
        renderLocalVideo(`${prefix}${userInfo.userId}`);
      } else {
        renderRemoteVideo(`${prefix}${userInfo.userId}`, userInfo.userId);
      }
    }, 500);
  }

  /**
   * rtm 信令消息监听
   **/
  rtmEvent() {
    RtmService().on(rtmTextMessageCategory.LEAVE_CHANNEL, (_data) => {
      window.close();
    });
    // 监听更改昵称，更新用户列表的展示
    RtmService().on(rtmTextMessageCategory.NICKNAME_CHANGE, (data) => {
      const { targetUserId, nickName } = data;
      updateUserInfo(targetUserId, "userName", nickName);
    });
    // 收到静音指令 只需要提示就可以，具体的更新状态在 audio 状态回调中执行
    RtmService().on(rtmTextMessageCategory.MUTE_AUDIO, (data) => {
      const { targetUserId, status, audioStatus } = data;
      if (targetUserId == "all" && status) {
        // 如果收到全体静音时,要更新教室按钮的状态
        roomButtonsStatus.audioStatus = audioStatus;
      }
      const user = getUser(targetUserId);
      if(targetUserId =='all') {
         messageFloatWarning(
          status ? ON_OFF.AUDIO_ON_TIP : ON_OFF.AUDIO_OFF_TIP
        );
        //  updateUsersList('audio', status)
        //  updateUserInfo(this.localRoomUserId,'audio',status)
         RtcService().enableLocalAudio(status == ON_OFF.ON ? true: false);
      }else {
          if(user && user.isLocal) {
            messageFloatWarning(
          status ? ON_OFF.AUDIO_ON_TIP : ON_OFF.AUDIO_OFF_TIP
          );
          updateUserInfo(user.userId,'audio',status)
          RtcService().enableLocalAudio(status == ON_OFF.ON  ? true: false);
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
         updateUserInfo(user.userId,'video',status)
      }
    });
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  flex-grow: 1;
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
    min-width: 192px;
    height: calc(100vh - 188px);
    border-left: 1px solid #fff;
    display: flex;
    flex-direction: column;
  }
}
</style>
