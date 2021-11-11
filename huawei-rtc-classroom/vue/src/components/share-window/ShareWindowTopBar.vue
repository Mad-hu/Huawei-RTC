<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-11 17:15:19
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div
    id="share-window"
    :class="mouseInOut? 'share-topbar-mouseIn' : '' "
    class="share-topbar"
    @mouseleave="leaveBar()"
  >
    <div class="bar-items">
      <div class="bar-item">
        <div class="btn" @click="audioAction()" title="静音">
          <div
            :class="[
              'audio',
              !muteAudio ? 'audio-mute-false' : 'audio-mute-true',
            ]"
          ></div>
          静音
        </div>
      </div>
      <div class="bar-item">
        <div class="btn" @click="videoAction()" title="停止视频">
          <div
            :class="[
              'video',
              !muteVideo ? 'video-mute-false' : 'video-mute-true',
            ]"
          ></div>
          停止视频
        </div>
      </div>
      <div class="bar-item" v-if="userInfoState.role == 'teacher'">
        <div class="btn" @click="studentManageAction()" title="学员管理">
          <div class="stu-manager"></div>
          学员管理
        </div>
      </div>
      <div class="bar-item">
        <div class="btn" title="更多" @click="moreAction()">
          <div class="more-icon">&#xe73a;</div>
          更多
        </div>
        <div class="more-list" v-if="showMore"  @mouseleave="showMore = false">
          <div class="item" @click="classroomInfoDialogAction()">教室信息</div>
          <div class="item" :class="shareLocalVoice ?'select': ''" @click="shareVoiceAction()">
            共享声音
          </div>
          <div class="item" @click="leaverommAction()">离开</div>
        </div>
      </div>
    </div>
    <div class="bar-bottom">
      <div class="bottom sharing">
        <div class="left" @mouseenter="enterBar()">
          <span>你正在共享屏幕</span>
        </div>
        <div
          class="right share-stop"
          @click="shareControlAction()"
          :title="share.screenShareLocalState ? '停止共享' : '继续共享'"
        >
          <div class="stop-share-icon"></div>
          <div>{{ share.screenShareLocalState ? "停止共享" : "继续共享" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { leaveClassroom, updateUserInfo } from "../../services/classroom.service";
import { RtcService } from "../../services/common/rtc.service";
import { messageFloatError } from "../../services/message/message-float.service";
import { stopScreenShare } from "../../services/share-window.service";
import { ShareState } from "../../services/state-manager/classroom-state.service";
import { DialogState } from "../../services/state-manager/dialog-state.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
import { windowService } from "../../services/window.service";
@Options({
  components: {},
})
export default class ShareWindowTopBar extends Vue {
  userInfoState = UserInfoState;
  showMore = false;
  muteAudio = false;
  muteVideo = false;
  share = ShareState;
  shareWindowContentId!: number;
  mouseInOut = false;
  shareLocalVoice = false;
  leaverommAction() {
    leaveClassroom();
  }
  shareVoiceAction() {
    this.shareLocalVoice = !this.shareLocalVoice;
    const resCode = RtcService().setShareComputerSound(this.shareLocalVoice);
    if(resCode != 0) {
      this.shareLocalVoice = false;
      messageFloatError('共享声音失败:' + resCode);
    }
    updateUserInfo(this.userInfoState.userId, "shareLocalVoice", this.shareLocalVoice);
  }
  classroomInfoDialogAction() {
    DialogState.classroomInfoVisible = true;
  }
  moreAction() {
    this.showMore = !this.showMore;
  }
  leaveBar() {
    console.log('leaveBar');
    // 打开用户列表或者教室信息弹窗
    if(DialogState.userListVisible || DialogState.classroomInfoVisible) {
      return;
    }
    this.mouseInOut = false;
    this.showMore = false;
    if(!ShareState.screenShareLocalState) {
      windowService().setIgnoreMouseEvents(false);
    } else {
      windowService().setIgnoreMouseEvents(true);
    }
  }
  enterBar() {
    console.log('enterBar');
    this.mouseInOut = true;
  }
  audioAction() {
    this.muteAudio = !this.muteAudio;
  }
  videoAction() {
    this.muteVideo = !this.muteVideo;
  }
  studentManageAction() {
    console.log("studentManageAction");
    DialogState.userListVisible = true;
  }
  shareControlAction() {
    console.log('shareControlAction', this.share.screenShareLocalState);
    if(this.share.screenShareLocalState) {
      this.stopScreenShare();
    } else {
      messageFloatError('没有共享');
    }
  }
  stopScreenShare() {
    const res = stopScreenShare();
    if(res != 0) {
      messageFloatError('停止共享失败' + res);
    }
  }
  mounted() {
    const ele = <HTMLDivElement>document.getElementById('share-window');
    console.log('鼠标点击穿透', ele);
    windowService().clickThroughDom(ele);
  }
}
</script>
<style lang="less" scoped>
.sharing {
  background-color: #4dc800;
}
.share-pause {
  background-color: #ffc80f;
}
.share-stop {
  background-color: #e02828;
}
.share-topbar-mouseIn {
 top: -4px !important;
}

.share-topbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 55px;
  background-image: linear-gradient(#26282a, #222426, #1c1e20);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  top: -59px;
  transition: 0.3s ease-in-out;
  // &:hover {
  //   top: -4px;
  // }
  .bar-items {
    display: flex;
    align-items: center;
  }
  .bar-item {
  }
  .btn {
    cursor: pointer;
    font-size: 12px;
    color: #dcdcdc;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .audio,
  .video, .stu-manager {
    width: 32px;
    height: 32px;
  }
  .audio-mute-false {
    background: url("../../assets/classroom/icons/sound.png") no-repeat 100% /
      100%;
  }
  .audio-mute-true {
    background: url("../../assets/classroom/icons/audio_disable.png") no-repeat
      100% / 100%;
  }
  .video-mute-false {
    background: url("../../assets/classroom/icons/video_enable.png") no-repeat
      100% / 100%;
  }
  .video-mute-true {
    background: url("../../assets/classroom/icons/video_disable.png") no-repeat
      100% / 100%;
  }
  .stu-manager {
    background: url("../../assets/classroom/icons/stu_list_gray.png") no-repeat
      100% / 100%;
  }
  .bar-bottom {
    display: flex;
    justify-content: center;
    width: 100%;
    .bottom {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      height: 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      font-size: 12px;
      position: absolute;
      bottom: -20px;
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      color: #322333;
      padding: 0 10px;
    }
    .right {
      display: flex;
      width: 88px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #fff;
      .stop-share-icon {
        width: 9px;
        height: 9px;
        background-color: #fff;
        margin: 0 6px 2px 0;
      }
    }
  }
}
.more-icon {
  width: 32px;
  height: 32px;
  font-family: "iconfont" !important;
  margin-left: 5px;
  line-height: 32px;
}
.more-list {
  background-color: rgba(55, 56, 60, 0.9);
  position: absolute;
  z-index: 1;
  padding: 5px;
  border-radius: 5px;
  width: 100px;
  .select {
    &::before {
      content: ' ';
      display: block;
      background: #4dc800;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 5px;
      border-radius: 5px;
    }
  }
  .item {
    font-size: 13px;
    line-height: 23px;
    color: #fff;
    height: 23px;
    cursor: pointer;
    position: relative;
    &:hover {
      background: #999;
    }
  }
}
.ant-dropdown-menu {
  background-color: rgba(55, 56, 60, 0.9);
}
:deep(.ant-dropdown-menu-item){
  font-size: 13px;
  line-height: 13px;
  color: #fff;
}
:deep(.ant-dropdown-menu-item:hover){
  background: #999;
}
</style>
