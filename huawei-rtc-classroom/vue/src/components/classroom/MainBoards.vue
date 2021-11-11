<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-10 14:13:35
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="main-boards" id="board">
    <!-- <ShareWindowTopBar></ShareWindowTopBar> -->
    <ShareRenderRemoteTopBar v-if="shareState.screenShareLocalState"></ShareRenderRemoteTopBar>
    <div v-if="shareState.remoteShareList.length != 0" id="share-box" class="share-box"></div>
  </div>
  <focus-view></focus-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import { messageFloatError } from '../../services/message/message-float.service';
import { stopScreenShare } from '../../services/share-window.service';
import { roomButtonsStatus, SCREEN_TYPE, ShareState } from '../../services/state-manager/classroom-state.service';
import FocusView from "./FocusView.vue"

@Options({
  components: {
    FocusView
  },
})
export default class MainBoards extends Vue {
  full = false;
  shareState = ShareState;
  roomButtonsStatus = roomButtonsStatus;
  screenType = SCREEN_TYPE;
  stopScreenShare() {
    const res = stopScreenShare();
    if(res != 0) {
      messageFloatError('停止共享失败' + res);
    }
  }
}
</script>

<style lang="less" scoped>
  .main-boards {
    height: calc(~"100vh - 188px");
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .main-boards-max {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999999;
    background: #333;
    height: 100%;
  }
  .share-box {
    width: 100%;
    height: 100%;
  }
  .share-msg {
    color: #fff;
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: space-between;
  }
  .share-msg-enable {
    display: block;
  }
  .share-msg-disable {
    display: none;
  }
</style>
