<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-09 19:33:59
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
      <div class="bar-item">
        <div class="btn" @click="studentManageAction()" title="学员管理">
          <div class="video video-mute-false"></div>
          学员管理
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
          :title="share.screenShareState ? '停止共享' : '继续共享'"
        >
          <div class="stop-share-icon"></div>
          <div>{{ share.screenShareState ? "停止共享" : "继续共享" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { messageFloatError } from "../../services/message/message-float.service";
import { stopScreenShare } from "../../services/share-window.service";
import { ShareState } from "../../services/state-manager/classroom-state.service";
import { windowService } from "../../services/window.service";
@Options({
  components: {},
})
export default class ShareWindowTopBar extends Vue {
  muteAudio = false;
  muteVideo = false;
  share = ShareState;
  shareWindowContentId!: number;
  mouseInOut = false;
  leaveBar() {
    console.log('leaveBar');
    this.mouseInOut = false;
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
  }
  shareControlAction() {
    console.log('shareControlAction', this.share.screenShareState);
    if(this.share.screenShareState) {
      this.stopScreenShare();
    } else {
      messageFloatError('没有共享');
      // this.share.screenShareState = !this.share;
    }
  }
  stopScreenShare() {

    const res = stopScreenShare();
    if(res != 0) {
      messageFloatError('停止共享失败' + res);
    }
  }
  mounted() {
    // this.shareWindowContentId = getStorage("shareWindowContentId");
    console.log('鼠标点击穿透');
    const ele = <HTMLDivElement>document.getElementById('share-window');
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
  .video {
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
</style>
