<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-09-13 17:40:02
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="classroom">
    <StudentList></StudentList>
    <div class="middle">
      <MainBoards></MainBoards>
      <div class="right">
        <UserListView></UserListView>
      </div>
    </div>
    <ToolsBar></ToolsBar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import MainBoards from "../../components/classroom/MainBoards.vue";
import StudentList from "../../components/classroom/StudentList.vue";
import ToolsBar from "../../components/classroom/ToolsBar.vue";
import UserListView from "../../components/classroom/UserListView.vue";
import TeacherView from "../../components/classroom/TeacherView.vue";
import {
  controlCreateSession,
  controlSDKInit,
  controlSDKLogin,
  leaveRoom,
  muteAudio,
  muteVideo,
  renderLocalVideo,
  renderRemoteVideo,
  sendControlEnd,
  sendControlReady,
} from "../../services/classroom.service";
import { loadingHide, loadingShow } from "../../services/loading.service";
import {
  messageFloat,
  messageFloatError,
  MessageType,
} from "../../services/message/message-float.service";
import { RtcService } from "../../services/rtc.service";
import {
  ControlUserIdState,
  RoomNameState,
  UserListState,
} from "../../services/state-manager/classroom-state.service";
import { RtmService } from "../../services/rtm.service";
import { rtmTextMessageCategory } from "../../services/abstract/rtm.abstract";
import {
  RemoteControlService,
  RemoteType,
} from "../../services/remote-control.service";
import { msgType } from "../../services/bjysdk/bjysdk.service";
import _ from "lodash";
import { RTCEventType } from "../../services/abstract/rtc.abstract";
import { getBjySdk } from "../../services/electron.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";

@Options({
  components: {
    StudentList,
    MainBoards,
    ToolsBar,
    UserListView,
    TeacherView,
  },
})
export default class Classroom extends Vue {
  userList = UserListState.lists;
  userInfoStore: any;
  channel = RoomNameState.roomName;
  control_address = "";
  control_session = "";
  mounted() {
    this.userInfoStore = UserInfoState;
    console.log('this.userInfoStore:', this.userInfoStore);
    try {
      loadingShow("初始化RTC/RTM/Control SDK");
      this.initRtc();
      this.initRtm();
      this.remoteControlEvent();
      loadingHide();
    } catch (error) {
      setTimeout(() => {
        messageFloat(`rtc: ${error}`, MessageType.error);
        loadingHide();
      }, 1000 * 2);
    }
  }
  unmounted() {
    leaveRoom();
  }
  /**
   * initial　rtc sdk
   */
  initRtc() {
    RtcService().init();
    this.rtcEvent();
    RtcService().joinRoom(this.channel, this.userInfoStore.userId, {
      userName: this.userInfoStore.userName,
      role: this.userInfoStore.role,
    });
  }
  /**
   * initial　rtm sdk
   */
  initRtm() {
    RtmService().init();
    this.rtmEvent();
    RtmService().login({
      userId: this.userInfoStore.userId,
      channel: this.channel,
    });
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
        power: this.userList.length,
        video: true,
        audio: true,
        control: true,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      this.userJoin(userInfo);
    });
    RtcService().on(RTCEventType.userJoined, (roomId, userId, userName) => {
      console.log("userJoined:", roomId, userId, userName);
      const userInfo = {
        userId: userId,
        userName: userName.split("_roletype_")[0],
        power: this.userList.length,
        video: true,
        audio: true,
        control: true,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      this.userJoin(userInfo);
    });
    RtcService().on(RTCEventType.userOffline, (roomId, userId, reason) => {
      _.remove(this.userList, (item) => {
        console.log("item.userId:", item.userId, "userId:", userId);
        return item.userId == userId;
      });
    });

    RtcService().on(RTCEventType.leaveRoom, (roomId, userId, reason) => {
      console.log(roomId, userId, reason);
    });
  }
  userJoin(userInfo: any) {
    console.log("joinroom userinfo:", userInfo);
    this.userList.push(userInfo);
    setTimeout(() => {
      if (userInfo.isLocal) {
        renderLocalVideo(`user_${userInfo.userId}`);
      } else {
        renderRemoteVideo(`user_${userInfo.userId}`, userInfo.userId);
      }
    }, 500);

  }
  /**
   * 远程控制监听
   **/
  remoteControlEvent() {
    if(!getBjySdk()) {
      messageFloat(`not found bjysdk, please check native preload !`, MessageType.error);
      return;
    }
    RemoteControlService().on(msgType.notic, (msg) => {
      console.log("RemoteControlService notic:", msg);
    });
    RemoteControlService().on(msgType.session, (session) => {
      console.log("RemoteControlService session:", session);
      this.control_session = session;
    });
    RemoteControlService().on(msgType.address, (address) => {
      console.log("RemoteControlService address:", address);
      this.control_address = address;
    });
    RemoteControlService().on(msgType.error, (error) => {
      messageFloatError(error);
    });
    electron_render().ipcRenderer.send("controlRemote", "init");
    electron_render().ipcRenderer.on(
      "controlEvent",
      (event: any, type: any, msg: any) => {
        console.log("controlEvent::", type, msg);
        if (type == "destroy") {
          sendControlEnd(ControlUserIdState.userId);
        }
      }
    );
  }
  /**
   * rtm 信令消息监听
   **/
  rtmEvent() {
    RtmService().on(rtmTextMessageCategory.JOIN_CHANNEL, () => {});
    RtmService().on(rtmTextMessageCategory.MUTE_VIDEO, (data) => {
      const { userId, video } = data;
      this.userList.map((value) => {
        if (value.userId == userId) {
          value.video = video;
          muteVideo(value);
        }
      });
    });
    RtmService().on(rtmTextMessageCategory.MUTE_AUDIO, (data) => {
      const { userId, audio } = data;
      this.userList.map((value) => {
        if (value.userId == userId) {
          value.audio = audio;
          muteAudio(value);
        }
      });
    });
    RtmService().on(rtmTextMessageCategory.LEAVE_CHANNEL, (data) => {
      const { userId, exit } = data;
      if (!exit) {
        _.remove(this.userList, (item) => item.userId == userId);
      } else {
        leaveRoom();
        history.back();
      }
    });

    RtmService().on(rtmTextMessageCategory.CONTROL_START, (data) => {
      const { userId } = data;
      if (userId == RtcService().getUserLocalId()) {
        try {
          controlSDKInit(RemoteType.client);
          controlSDKLogin();
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
      this.userList.map((item) => (item.control = false));
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
        // RemoteControlService().createDesktop(msg);
      } catch (error) {
        console.log(rtmTextMessageCategory.CONTROL_READY + "error:", error);
      }
    });
    RtmService().on(rtmTextMessageCategory.CONTROL_END, (data) => {
      const { userId } = data;
      if (userId == RtcService().getUserLocalId()) {
        RemoteControlService().destroyDesktopsession("delete");
      }
      this.control_address = '';
      this.control_session = '';
      this.userList.map((item) => (item.control = true));
    });
  }
}
</script>

<style lang="less" scoped>
.classroom {
  background-color: #999;
  width: 100vw;
  height: 100vh;
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
