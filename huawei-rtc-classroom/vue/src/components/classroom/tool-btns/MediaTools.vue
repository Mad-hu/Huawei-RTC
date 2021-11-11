<template>
  <div class="media-tool-box" ref="mediaTool">
    <div v-if="tooltype == 'audio'" class="btn" title="声音">
      <div class="icon-img-box" @click="audioAction">
        <div
          v-if="localUser && localUser.audio == 1"
          :class="volumelevel"
          alt=""
        />
        <div v-else class="audio-mute"></div>
      </div>
      <span class="btn-text" @click="audioAction">静音</span>
      <div
        class="set-start-box"
        :class="placement == 'top' ? 'set-box-top' : 'set-box-bottom'"
      >
        <el-dropdown placement="top" trigger="click">
          <!-- 麦克风图标 -->
          <div class="set-start-svg" @click="initAudioSetting($event)">
            &#xe665;
          </div>
          <!-- 下拉栏 -->
          <template #dropdown>
            <div
              class="set-box"
              :class="placement == 'top' ? 'set-box-top' : 'set-box-bottom'"
            >
              <el-dropdown-menu>
                <div class="set-box-title">选择麦克风</div>
                <el-radio-group
                  class="set-radio-group"
                  v-model="audioRecordingDeviceId"
                  @change="changeAudioRecordingDeviceId"
                >
                  <el-dropdown-item
                    v-for="audioRecordingDeviceItem in audioRecordingDeviceList"
                    :key="audioRecordingDeviceItem.deviceId"
                  >
                    <el-radio :label="audioRecordingDeviceItem.deviceId">
                      {{ audioRecordingDeviceItem.deviceName }}
                    </el-radio>
                  </el-dropdown-item>
                </el-radio-group>
                <div class="set-box-title">选择扬声器</div>
                <el-radio-group
                  v-model="audioPlaybackDeviceId"
                  class="set-radio-group"
                  @change="changeAudioPlaybackDeviceId"
                >
                  <el-dropdown-item
                    v-for="audioPlaybackDeviceItem in audioPlaybackDeviceList"
                    :key="audioPlaybackDeviceItem.deviceId"
                  >
                    <el-radio :label="audioPlaybackDeviceItem.deviceId">
                      {{ audioPlaybackDeviceItem.deviceName }}
                    </el-radio>
                  </el-dropdown-item>
                </el-radio-group>
              </el-dropdown-menu>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 视频控制 -->
    <div v-if="tooltype == 'video'" class="btn" title="视频">
      <div class="icon-img-box" @click="videoAction">
        <img
          v-if="localUser && localUser.video"
          class="icon-img"
          src="https://biz-fe.oss-cn-beijing.aliyuncs.com/image/tczx/%E5%BC%80%E5%90%AF%E8%A7%86%E9%A2%91.png"
          alt=""
        />
        <img
          v-else
          class="icon-img"
          src="https://biz-fe.oss-cn-beijing.aliyuncs.com/image/tczx/%E7%BB%93%E6%9D%9F%E8%A7%86%E9%A2%91.png"
          alt=""
        />
      </div>
      <span class="btn-text" @click="videoAction">{{
        localUser && localUser.video == 1 ? "关闭视频" : "开启视频"
      }}</span>
      <div
        class="set-start-box"
        :class="placement == 'top' ? 'set-box-top' : 'set-box-bottom'"
      >
        <el-dropdown placement="top" trigger="click">
          <div class="set-start-svg" @click="initVideoSetting">&#xe665;</div>
          <!-- <arrow-down /> -->
          <template #dropdown>
            <div
              class="set-box"
              :class="placement == 'top' ? 'set-box-top' : 'set-box-bottom'"
            >
              <el-dropdown-menu>
                <el-radio-group
                  v-model="videoDeviceId"
                  class="set-radio-group"
                  @change="changeVideoDeviceId"
                >
                  <el-dropdown-item
                    v-for="videoDeviceItem in videoDeviceList"
                    :key="videoDeviceItem.deviceId"
                  >
                    <el-radio :label="videoDeviceItem.deviceId">
                      {{ videoDeviceItem.deviceName }}
                    </el-radio>
                  </el-dropdown-item>
                </el-radio-group>
              </el-dropdown-menu>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Options, Prop, Vue, Emit } from "vue-property-decorator";
import {
  updateUserInfo,
  leaveClassroom,
} from "../../../services/classroom.service";
import { RTCDeviceInfo } from "../../../services/common/abstract/rtc.abstract";
import {
  getVideoDevices,
  getCurrentVideoDevice,
  setVideoDevice,
  localVolumeChanged,
  getAudioRecordingDevices,
  getCurrentAudioRecordingDevice,
  setAudioRecordingDevice,
  getCurrentAudioPlaybackDevice,
  getAudioPlaybackDevices,
  setAudioPlaybackDevice,
  enableLocalAudio,
  enableLocalVideo,
  getUserLocalId,
} from "../../../services/setting/setting-service";

import { ON_OFF } from "../../../services/common/abstract/rtm.abstract";
import {
  messageFloatError,
  messageFloatSuccess,
} from "../../../services/message/message-float.service";
import {
  setShareWindowStateControl,
  startShareScreen,
} from "../../../services/share-window.service";
import { UserType } from "../../../services/state-manager/classroom-state.service";
import { UserInfoState } from "../../../services/state-manager/user-state.service";
import { DialogState } from "../../../services/state-manager/dialog-state.service";
export default class MediaTools extends Vue {
  @Prop({ type: String, required: true }) readonly tooltype: string | undefined;
  @Prop({ type: String, default: "top" }) placement!: string;
  localUser: UserType | undefined | any = {
    audio: ON_OFF.ON,
    video: ON_OFF.ON,
  };
  videoDeviceList: RTCDeviceInfo[] | undefined = [];
  videoDeviceId: string = getCurrentVideoDevice();
  audioDeviceList: RTCDeviceInfo[] | undefined = [];
  audioRecordingDeviceList: RTCDeviceInfo[] | undefined = [];
  audioRecordingDeviceId: string = getCurrentAudioRecordingDevice();
  audioPlaybackDeviceId: string = getCurrentAudioPlaybackDevice();
  audioPlaybackDeviceList: RTCDeviceInfo[] | undefined = [];
  setBoxType: string = ""; //设置小弹框类型
  volumelevel: string = "sound";
  svgclass: string = "svgtop";
  created() {
    // this.localUser = getUser(getUserLocalId())
  }
  mounted() {
    this.listenLocalAudio();
  }
  initVideoSetting() {
    this.videoDeviceList = getVideoDevices();
    this.videoDeviceId = getCurrentVideoDevice();

    if (this.setBoxType == "video") {
      this.setBoxType = "";
    } else {
      this.setBoxType = "video";
    }
  }
  initAudioSetting(target: any) {
    this.audioRecordingDeviceList = getAudioRecordingDevices();
    this.audioRecordingDeviceId = getCurrentAudioRecordingDevice();
    this.audioPlaybackDeviceList = getAudioPlaybackDevices();
    this.audioPlaybackDeviceId = getCurrentAudioPlaybackDevice();

    // if(this.setBoxType == 'audio'){
    //     this.setBoxType = ''
    // }else{
    //     this.setBoxType = 'audio'
    // }
  }
  changeAudioRecordingDeviceId(id: string) {
    setAudioRecordingDevice(id);
  }
  changeAudioPlaybackDeviceId(id: string) {
    setAudioPlaybackDevice(id);
  }
  changeVideoDeviceId(id: string) {
    setVideoDevice(id);
  }
  listenLocalAudio() {
    localVolumeChanged((volume, muted) => {
      this.volumelevel = this.formateSound(volume);
    });
  }
  formateSound(volume: number) {
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
  shareScreen() {
    if (UserInfoState.role == "teacher") {
      DialogState.shareSelectVisible = true;
      return;
    }
    if (UserInfoState.role == "student") {
      const shareRes = startShareScreen();
      if (shareRes.code == 0) {
        setShareWindowStateControl(true);
      } else {
        messageFloatError("共享失败了:" + shareRes.type + shareRes.code);
      }
    }
  }
  audioAction() {
    this.localUser.audio = !this.localUser.audio;
    enableLocalAudio(this.localUser.audio);
    updateUserInfo(
      getUserLocalId(),
      "audio",
      this.localUser.audio ? ON_OFF.ON : ON_OFF.OFF
    );
  }
  videoAction() {
    this.localUser.video = !this.localUser.video;
    enableLocalVideo(this.localUser.video);
    updateUserInfo(
      getUserLocalId(),
      "video",
      this.localUser.video ? ON_OFF.ON : ON_OFF.OFF
    );
  }
  async leave() {
    leaveClassroom();
  }
  settingAction() {
    console.log("open setting action!");
    const settingDrawer: any = this.$refs["settingDrawerRef"];
    settingDrawer.visible = true;
  }
}
</script>
<style  lang='scss'>
.media-tool-box {
  .el-popper__arrow::before {
    background: red !important;
  }
}
</style>
<style lang="scss" scoped>
.set-radio-group {
  display: flex;
  flex-direction: column;
}
.set-box-title {
  font-size: 16px;
  text-align: left;
}
.set-box {
  // position: absolute;
  // left: 0px;
  // background: rgb(36, 36, 36);
  // border: 1px solid rgb(85, 85, 85);
  padding: 10px;

  .set-item {
    .set-device-box {
      white-space: nowrap;
      display: flex;
      height: 22px;
      .set-device-name {
        font-size: 12px;
        line-height: 22px;
        text-align: left;
      }
    }
  }
}
.set-box-top {
  bottom: 30px;
}
.set-box-bottom {
  top: 30px;
}
.media-tool-box {
  .btn {
    height: 56px;
    min-width: 84px;
    padding: 12px 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    cursor: pointer;
    font-size: 17px;
    margin: 0 5px;
    box-sizing: border-box;
    color: white;
    span {
      font-family: "iconfont" !important;
      font-size: 12px;
    }
    .set-start-box {
      width: 18px;
      height: 24px;
      line-height: 24px;
      position: absolute;
      right: 0px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: rgb(64, 64, 64);
      }
      .arrow-down-box {
        width: 18px;
        height: 24px;
      }
      .set-start-svg {
        font-family: "iconfont" !important;
        color: white;
        font-size: 10px;
        transform: rotate(180deg);
      }
    }
    .svgtop {
      top: 0;
    }
    .svgbottom {
      bottom: 0;
    }
    &:hover {
      background: rgb(46, 46, 46);
    }
    .icon-img-box {
      .icon-img {
        width: 32px;
      }
      .audio-mute {
        width: 32px;
        height: 32px;
        background: url("https://biz-fe.oss-cn-beijing.aliyuncs.com/image/tczx/%E8%A7%A3%E9%99%A4%E9%9D%99%E9%9F%B3.png")
          no-repeat center;
        background-size: 100% 100%;
      }
      width: 32px;
      height: 32px;
      box-sizing: border-box;
      .sound {
        background: url("@/assets/classroom/icons/sound.png") no-repeat center;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
      }
      .sound1 {
        background: url("@/assets/classroom/icons/sound1.png") no-repeat center;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
      }
      .sound2 {
        background: url("@/assets/classroom/icons/sound2.png") no-repeat center;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
      }
      .sound3 {
        background: url("@/assets/classroom/icons/sound3.png") no-repeat center;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
      }
      .sound4 {
        background: url("@/assets/classroom/icons/sound4.png") no-repeat center;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
