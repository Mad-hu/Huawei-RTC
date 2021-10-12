<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-10-12 16:21:21
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="main-boards" id="board">
    <div v-if="shareState.remoteShareList.length != 0" id="share-box" class="share-box"></div>
    <div class="share-msg" v-if="shareState.screenShareState">
      <span>正在共享屏幕...</span>
      <el-button type="primary" size="small" @click="stopScreenShare()">结束共享</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import { RtcService } from '../../services/common/rtc.service';
// import { RtcService } from 'hrtc-sdk-services';
import { ShareState } from '../../services/state-manager/classroom-state.service';

@Options({
  components: {
  },
})
export default class MainBoards extends Vue {
  shareState = ShareState;
  stopScreenShare() {
    const stopState = RtcService().stopScreenShare();
    this.shareState.screenShareState = stopState == 0 ? false : true;
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
