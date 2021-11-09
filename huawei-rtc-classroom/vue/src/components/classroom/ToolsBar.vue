<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-09 18:44:56
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="tools-bar">
    <!-- 音频控制 -->
    <div
      class="btn"
      title="声音"
    >
      <div class="icon-img-box" @click="audioAction">
        <div v-if="localUser&&localUser.audio==1" :class="volumelevel" alt=""/>
        <div v-else class="audio-mute"></div>
      </div>
      <span class="btn-text" @click="audioAction">静音{{}}</span>
      <div class="set-start-box">
        <div class="set-start-svg"  @click="initAudioSetting">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"></path></svg>
        </div>
        <div class="set-box" v-if="setBoxType == 'audio'">
          <div class="set-box-title">
            选择麦克风
          </div>
          <el-radio-group v-model="audioRecordingDeviceId" class="set-radio-group" @change='changeAudioRecordingDeviceId'>
            <el-radio :label="audioRecordingDeviceItem.deviceId"  v-for="audioRecordingDeviceItem in audioRecordingDeviceList" :key="audioRecordingDeviceItem.deviceId">
               {{audioRecordingDeviceItem.deviceName}}
            </el-radio>
          </el-radio-group>
          <div class="set-box-title">
            选择扬声器
          </div>
          <el-radio-group v-model="audioPlaybackDeviceId" class="set-radio-group" @change='changeAudioPlaybackDeviceId'>
            <el-radio :label="audioPlaybackDeviceItem.deviceId"  v-for="audioPlaybackDeviceItem in audioPlaybackDeviceList" :key="audioPlaybackDeviceItem.deviceId">
               {{audioPlaybackDeviceItem.deviceName}}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 视频控制 -->
    <div
      class="btn"
      title="视频"
    >
      <div class="icon-img-box" @click="videoAction">
        <img v-if="localUser&&localUser.video" class="icon-img" src="https://biz-fe.oss-cn-beijing.aliyuncs.com/image/tczx/%E5%BC%80%E5%90%AF%E8%A7%86%E9%A2%91.png" alt="">
        <img v-else class="icon-img" src="https://biz-fe.oss-cn-beijing.aliyuncs.com/image/tczx/%E7%BB%93%E6%9D%9F%E8%A7%86%E9%A2%91.png" alt="">
      </div>
      <span class="btn-text"  @click="videoAction">{{localUser&&localUser.video==1?'关闭视频':'开启视频'}}</span>
      <div class="set-start-box">
        <div class="set-start-svg" @click="initVideoSetting">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"></path></svg>
        </div>
        <div class="set-box" v-if="setBoxType == 'video'">
          <el-radio-group v-model="videoDeviceId" class="set-radio-group" @change='changeVideoDeviceId'>
            <el-radio :label="videoDeviceItem.deviceId"  v-for="videoDeviceItem in videoDeviceList" :key="videoDeviceItem.deviceId">
               {{videoDeviceItem.deviceName}}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 共享屏幕 -->
    <div class="btn normal" @click="shareScreen()" title="共享屏幕">
      <span>&#xe616;</span>
      共享屏幕
    </div>
    <div class="btn leavebtn" @click="leave()">离开教室</div>
    <div class="setting" @click="settingAction()" title="设置">
      <span>&#xe892;</span>
    </div>
  </div>
  <share-select-dialog ref="shareSelectDialogRef"></share-select-dialog>
  <setting-drawer ref="settingDrawerRef"></setting-drawer>
</template>

<script lang="ts">
import { ElMessageBox } from "element-plus";
import _ from "lodash";
import { Options, Vue } from "vue-property-decorator";
import {
  leaveRoom,
  updateUserInfo,
  getUser,
} from "../../services/classroom.service";
import { RTCDeviceInfo } from "../../services/common/abstract/rtc.abstract";
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
} from "../../services/setting/setting-service"

import { ON_OFF } from "../../services/common/abstract/rtm.abstract";
import { messageFloatError, messageFloatSuccess } from "../../services/message/message-float.service";
import { setShareWindowStateControl, startShareScreen } from "../../services/share-window.service";
import {
  UserType,
} from "../../services/state-manager/classroom-state.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
@Options({
  components: {},
})
export default class ToolsBar extends Vue {
  localUser: UserType | undefined | any = { audio: ON_OFF.ON, video: ON_OFF.ON };
  videoDeviceList: RTCDeviceInfo[] | undefined = [];
  videoDeviceId: string = getCurrentVideoDevice();
  audioDeviceList: RTCDeviceInfo[] | undefined = []
  audioRecordingDeviceList: RTCDeviceInfo[] | undefined = []
  audioRecordingDeviceId: string = getCurrentAudioRecordingDevice();
  audioPlaybackDeviceId: string = getCurrentAudioPlaybackDevice()
  audioPlaybackDeviceList: RTCDeviceInfo[] | undefined = []
  setBoxType: string = ''//设置小弹框类型
  volumelevel: string = 'sound'
  created(){
      // this.localUser = getUser(getUserLocalId())
  }
  mounted(){
    this.listenLocalAudio()
  }
  initVideoSetting(){
    this.videoDeviceList = getVideoDevices()
    this.videoDeviceId = getCurrentVideoDevice()

    if(this.setBoxType == 'video'){
      this.setBoxType = ''
    }else{
      this.setBoxType = 'video'
    }
  }
  initAudioSetting(){
    this.audioRecordingDeviceList = getAudioRecordingDevices()
    this.audioRecordingDeviceId = getCurrentAudioRecordingDevice()
    this.audioPlaybackDeviceList = getAudioPlaybackDevices()
    this.audioPlaybackDeviceId = getCurrentAudioPlaybackDevice()

    if(this.setBoxType == 'audio'){
      this.setBoxType = ''
    }else{
      this.setBoxType = 'audio'
    }
  }
  changeAudioRecordingDeviceId(id: string){
    setAudioRecordingDevice(id)
    this.setBoxType = ''
  }
  changeAudioPlaybackDeviceId(id: string){
    setAudioPlaybackDevice(id)
    this.setBoxType = ''
  }
  changeVideoDeviceId(id: string){
    setVideoDevice(id)
    this.setBoxType = ''
  }
  listenLocalAudio(){
    localVolumeChanged((volume,muted)=>{
      this.volumelevel = this.formateSound(volume)
    })
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
    if(UserInfoState.role == 'teacher') {
      const shareSelectDialog: any = this.$refs["shareSelectDialogRef"];
      shareSelectDialog.dialogVisible = true;
      shareSelectDialog.getScreenList();
      return;
    }
    if(UserInfoState.role == 'student') {
      const shareRes = startShareScreen();
      if(shareRes.code == 0) {
        setShareWindowStateControl(true);
      } else {
        messageFloatError('共享失败了:' + shareRes.type + shareRes.code);
      }
    }
  }
  audioAction() {
    this.localUser.audio = !this.localUser.audio
    enableLocalAudio(this.localUser.audio)
    updateUserInfo(getUserLocalId(), 'audio', this.localUser.audio? ON_OFF.ON: ON_OFF.OFF )
  }
  videoAction() {
    this.localUser.video = !this.localUser.video
    enableLocalVideo(this.localUser.video)
    updateUserInfo(getUserLocalId(), 'video', this.localUser.video? ON_OFF.ON: ON_OFF.OFF )
  }
  async leave() {
    try {
      const res = await ElMessageBox.confirm("是否退出教室?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (res == "confirm") {
        leaveRoom();
        history.back();
      }
    } catch (error) {
      console.log("leave room cannle!", error);
    }
  }
  settingAction() {
    console.log("open setting action!");
    const settingDrawer: any = this.$refs["settingDrawerRef"];
    settingDrawer.visible = true;
  }
}
</script>

<style lang="less" scoped>
.btn {
  height: 100%;
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
  span {
    font-family: "iconfont" !important;
    font-size: 12px;
  }
  .set-start-box{
    width: 18px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    right: 0px;
    top: 0px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
      background: rgb(64, 64, 64);
    }
    .set-start-svg{
      width: 10px;
    }
    .set-box{
      position: absolute;
      bottom: 30px;
      left: 0px;
      background: rgb(36, 36, 36);
      border: 1px solid rgb(85, 85, 85);
      padding: 10px;
      .set-box-title{
        font-size: 16px;
        text-align: left;
      }
      .set-radio-group{
        display: flex;
        flex-direction: column;
      }
      .set-item{
        .set-device-box{
            white-space: nowrap;
          display: flex;
          height: 22px;
          .set-device-name{
            font-size: 12px;
            line-height: 22px;
            text-align: left;
          }
        }
      }
    }
  }
  &:hover{
    background: rgb(46, 46, 46);
  }
}
.icon-img-box{
  .icon-img{
    width: 24px;
  }
  .audio-mute{
    width: 24px;
    height: 24px;
    background: url('https://biz-fe.oss-cn-beijing.aliyuncs.com/image/tczx/%E8%A7%A3%E9%99%A4%E9%9D%99%E9%9F%B3.png') no-repeat center ;
    background-size: 100% 100%;
  }
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  .sound {
    background: url('@/assets/classroom/icons/sound.png') no-repeat center ;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .sound1 {
    background: url('@/assets/classroom/icons/sound1.png') no-repeat center ;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .sound2 {
    background: url('@/assets/classroom/icons/sound2.png') no-repeat center ;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .sound3 {
    background: url('@/assets/classroom/icons/sound3.png') no-repeat center ;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .sound4 {
    background: url('@/assets/classroom/icons/sound4.png') no-repeat center ;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
}
.btn-text{
  // text-align: center;
}

.leavebtn {
  // background-color: #c50000;
}
.normal {
  background-color: #409eff;
}
.enable {
  // background-color: #85ce61;
}
.disable {
  background-color: #f56c6c;
}

.tools-bar {
  position: absolute;
  bottom: 0;
  height: 56px;
  background-color: #000;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #999;
  // background-image: linear-gradient(#3a3a41, #252529, #414149);
  background: rgb(26, 26, 26);

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.setting {
  position: absolute;
  right: 10px;
  height: 40px;
  width: 40px;
  border-radius: 3px;
  background-color: #e6a23c;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    color: #fff;
    font-family: "iconfont" !important;
    font-size: 25px;
  }
}
.invite {
  span {
    font-size: 20px;
  }
}
</style>
