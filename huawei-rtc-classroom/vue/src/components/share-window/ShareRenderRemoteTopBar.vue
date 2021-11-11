<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-10 21:55:02
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div
    id="share-render-window"
    class="share-topbar"
  >
    <div class="bar-bottom">
      <div class="bottom">
        <div class="left sharing">
          <span>你正在观看{{'**'}}的屏幕</span>
        </div>
        <a-dropdown :trigger="['click']">
          <div
            class="right more"
            @click.prevent
            title="查看选项"
          >
            <div>查看选项</div>
            <div class="more-icon">&#xe665;</div>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <div>请求远程控制</div>
              </a-menu-item>
              <a-menu-item key="1">
                <div>共享屏幕</div>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <div>学生1</div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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
export default class ShareRenderRemoteTopBar extends Vue {
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
  background-image: linear-gradient(#26282a, #222426, #1c1e20);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  top: 0;
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
      height: 20px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #fff;
      font-size: 12px;
      .more-icon {
        width: 12px;
        height: 20px;
        font-family: "iconfont" !important;
        margin-left: 5px;
      }
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
