/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-09 17:47:21
 * @LastEditTime: 2021-10-21 13:37:15
 * @LastEditors: Yandong Hu
 * @Description: 
 */

import { sdk_build_config } from "hrtc-sdk-services/build";
import { getBjySdk, RemoteControlService, RemoteType, RtcService, RtmService } from "hrtc-sdk-services";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MainBoards } from "../../components/classroom/main-boards/main-boards";
import { StudentList } from "../../components/classroom/student-list/student-list";
import { ToolsBar } from "../../components/classroom/tools-bar/tools-bar";
import { UserLists } from "../../components/classroom/user-lists/user-lists";
import { controlCreateSession, controlSDKInit, controlSDKLogin, leaveRoom, muteAudio, muteVideo, renderLocalVideo, renderRemoteVideo, sendControlEnd, sendControlReady } from "../../services/classroom.service";
import { ClassroomPagePropsTypes } from "../../services/interfaces/page-types.service"
import { messageFloat, messageFloatError, messageFloatSuccess, MessageType } from "../../services/message/message-float.service";
import { ControlUserIdState, RemoteScreenShareListState, RoomNameState, UserListState } from "../../services/state-manager/classroom-state.service";
import { LoadingMainState, LoadingMainTextState } from "../../services/state-manager/loading-state.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
import './classroom.scss';
import { RTCEventType } from "hrtc-sdk-services/dist/abstract/rtc.abstract";
import _ from "lodash";
import { msgType } from "hrtc-sdk-services/dist/bjysdk/bjysdk.service";
import { rtmTextMessageCategory } from "hrtc-sdk-services/dist/abstract/rtm.abstract";

const REACT_APP_AGORA_RTC_APPID = process.env.REACT_APP_AGORA_RTC_APPID;
const REACT_APP_CONTROL_ACCOUNT = process.env.REACT_APP_CONTROL_ACCOUNT;
const REACT_APP_CONTROL_PASS = process.env.REACT_APP_CONTROL_PASS;

const REACT_APP_HUAWEI_RTC_APPID = process.env.REACT_APP_HUAWEI_RTC_APPID;
const REACT_APP_HUAWEI_DOMAIN = process.env.REACT_APP_HUAWEI_DOMAIN;

const REACT_APP_NETEASE_SDK_KEY = process.env.REACT_APP_NETEASE_SDK_KEY;
const Classroom: React.FC<ClassroomPagePropsTypes> = (props: ClassroomPagePropsTypes) => {
    const setLoadingMain = useSetRecoilState(LoadingMainState);
    const userList = useRecoilValue(UserListState).lists;
    const setUserList = useSetRecoilState(UserListState);
    const userInfoStore = useRecoilValue(UserInfoState);
    const [remoteScreenShareListState, setRemoteScreenShareListState] = useRecoilState(RemoteScreenShareListState);
    const setloadingMainText = useSetRecoilState(LoadingMainTextState);
    const roomNameState = useRecoilValue(RoomNameState);
    const controlUserIdState = useRecoilValue(ControlUserIdState);
    const channel: string = roomNameState.roomName;
    let control_address: string = "";
    let control_session: string = "";
    useEffect(() => {
        try {
            setLoadingMain(true);
            setloadingMainText("初始化RTC/RTM/Control SDK");
            initRtc();
            initRtm();
            remoteControlEvent();
            setLoadingMain(false);
          } catch (error) {
            setTimeout(() => {
              messageFloat(`rtc: ${error}`, MessageType.error);
              setLoadingMain(false);
            }, 1000 * 2);
          }
        return () => {
            leaveRoom();
        };
    }, []);
    /**
   * initial　rtc sdk
   */
  function initRtc() {
    RtcService().init(REACT_APP_HUAWEI_RTC_APPID, { domain: REACT_APP_HUAWEI_DOMAIN });
    rtcEvent();
    setTimeout(() => {
      RtcService().joinRoom(channel, userInfoStore.userId, {
        userName: userInfoStore.userName,
        role: userInfoStore.role,
      });
    }, 1000);
  }
  /**
   * initial　rtm sdk
   */
  async function initRtm() {
    try {
      if (sdk_build_config.rtm.company == "wangyi") {
        // 在进入之前，需要从后台获取用户的网易云信账户和密码
        const opt = {
          account: "a11111",
          token: "a11111",
          domain: "",
        };
        // await RtmService().init(REACT_APP_NETEASE_SDK_KEY, opt)!.toPromise();
      } else if (sdk_build_config.rtm.company == "agora") {
        RtmService().init(REACT_APP_AGORA_RTC_APPID);
      }

      rtmEvent();
      RtmService().login({
        userId: userInfoStore.userId,
        channel: channel,
      });
    } catch (error) {
      console.log(error);
      messageFloatError("登录失败，请打开控制台，查看详情。");
    }
  }
  /**
   * rtc 音视频监听
   **/
  function rtcEvent() {
    RtcService().on(RTCEventType.error, (err, msg) => {
      console.log("rtcEvent Error:", err, msg);
      messageFloatError(`rtcEvent Error:${err},${msg}`);
    });

    RtcService().on(RTCEventType.joinedRoom, (roomId, userId) => {
      console.log("joinedRoom:", roomId, userId);
      const userInfo = {
        userId: userId,
        userName: userInfoStore.userName,
        power: userList.length,
        video: true,
        audio: true,
        control: true,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      userJoin(userInfo);
    });
    RtcService().on(RTCEventType.userJoined, (roomId, userId, userName) => {
      console.log("userJoined:", roomId, userId, userName);
      const userInfo = {
        userId: userId,
        userName: userName.split("_roletype_")[0],
        power: userList.length,
        video: true,
        audio: true,
        control: true,
        isLocal: userId == RtcService().getUserLocalId(),
      };
      userJoin(userInfo);
    });
    RtcService().on(RTCEventType.userOffline, (roomId, userId, reason) => {
      _.remove(userList, (item) => {
        console.log("item.userId:", item.userId, "userId:", userId);
        return item.userId == userId;
      });
    });

    RtcService().on(RTCEventType.leaveRoom, (roomId, userId, reason) => {
      console.log(roomId, userId, reason);
    });
    RtcService().on(RTCEventType.screenCaptureStarted, () => {
      console.log("screen capture started!");
    });
    RtcService().on(
      RTCEventType.userSubStreamAvailable,
      (roomId, userId, available) => {
        console.log("user sub stream available!", roomId, userId, available);
        if (available) {
          if (userId == RtcService().getUserLocalId()) {
            console.log("local user, can not substream!");
            return;
          }
          remoteScreenShareListState.remoteShareList.push({
            userId: userId,
            available: available,
          });
          setRemoteScreenShareListState({
              remoteShareList: remoteScreenShareListState.remoteShareList
          })
          setTimeout(() => {
            const shareBoxDiv: any = document.getElementById("share-box");
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

            if (renderRemoteScreenShareState == 0) {
              const shareUserInfo = userList.find(
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
          _.remove(remoteScreenShareListState.remoteShareList, (item) => item.userId == userId);
        }
      }
    );
  }
function userJoin(userInfo: any) {
    console.log("joinroom userinfo:", userInfo);
    userList.push(userInfo);
    setUserList({
        lists: userList
    })
    
    setTimeout(() => {
      if (userInfo.isLocal) {
        renderLocalVideo(`user_${userInfo.userId}`);
      } else {
        renderRemoteVideo(`user_${userInfo.userId}`, userInfo.userId);
      }
    //   if (getSetting().base.intoClassAudio) {
    //     playInroomAudio();
    //   }
    }, 500);
  }
  /**
   * 远程控制监听
   **/
  function remoteControlEvent() {
    if (!getBjySdk()) {
      messageFloat(
        `not found bjysdk, please check native preload !`,
        MessageType.error
      );
      return;
    }
    RemoteControlService().on(msgType.notic, (msg) => {
      console.log("RemoteControlService notic:", msg);
    });
    RemoteControlService().on(msgType.session, (session) => {
      console.log("RemoteControlService session:", session);
      control_session = session;
    });
    RemoteControlService().on(msgType.address, (address) => {
      console.log("RemoteControlService address:", address);
      control_address = address;
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
          sendControlEnd(controlUserIdState.userId);
        }
      }
    );
  }
  /**
   * rtm 信令消息监听
   **/
  function rtmEvent() {
    RtmService().on(rtmTextMessageCategory.JOIN_CHANNEL, () => {});
    RtmService().on(rtmTextMessageCategory.MUTE_VIDEO, (data) => {
      const { userId, video } = data;
      userList.map((value) => {
        if (value.userId == userId) {
          value.video = video;
          muteVideo(value);
        }
      });
    });
    RtmService().on(rtmTextMessageCategory.MUTE_AUDIO, (data) => {
      const { userId, audio } = data;
      userList.map((value) => {
        if (value.userId == userId) {
          value.audio = audio;
          muteAudio(value);
        }
      });
    });
    RtmService().on(rtmTextMessageCategory.LEAVE_CHANNEL, (data) => {
      const { userId, exit } = data;
      if (!exit) {
        _.remove(userList, (item) => item.userId == userId);
        setUserList({
            lists: userList
        })
      } else {
        setUserList({
            lists: []
        });
        leaveRoom();
        window.history.back();
      }
    });

    RtmService().on(rtmTextMessageCategory.CONTROL_START, (data) => {
      const { userId } = data;
      if (userId == RtcService().getUserLocalId()) {
        try {
          controlSDKInit(RemoteType.client);
          controlSDKLogin(`${REACT_APP_CONTROL_ACCOUNT}`, `${REACT_APP_CONTROL_PASS}`);
          const loadAddressTimer = setInterval(() => {
            if (control_address != "") {
              // this.control_session = RemoteControlService().createDesktopsession('create');
              control_session = controlCreateSession();
              clearInterval(loadAddressTimer);
              sendControlReady(
                `${RtcService().getUserLocalId()}`,
                control_address,
                control_session
              );
            }
          }, 200);
        } catch (error) {
          messageFloat(`rtc: ${error}`, MessageType.error);
        }
      }
        userList.map((item) => (item.control = false));
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
        setLoadingMain(false);
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
      control_address = "";
      control_session = "";
      userList.map((item) => (item.control = true));
    });
  }
    return (
        <div className="classroom">
            <StudentList></StudentList>
            <div className="middle">
            <MainBoards></MainBoards>
            <div className="right">
                <UserLists></UserLists>
            </div>
            </div>
            <ToolsBar></ToolsBar>
        </div>
    )
}

export {
    Classroom
}