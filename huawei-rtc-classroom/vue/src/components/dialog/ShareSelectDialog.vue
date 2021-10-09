<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-10-09 15:58:50
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-dialog title="请选择共享" v-model="dialogVisible" width="835px">
    <div class="dialog-box">
      <div class="content">
        <div
          class="window-item"
          :key="item.id"
          v-for="item in windowLists"
          :class="[item.id == selectIndex ? 'window-item-select' : '']"
          @click="selectIndex = item.id"
        >
          <img :src="item.base64Data" />
          <div class="sourse-name">
            {{ item.sourceName == "Monitor_1" ? "桌面" : item.sourceName }}
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" @click="shareSubmitAction()"
          >开始共享</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Ref, Vue } from "vue-property-decorator";
import { messageFloatError, messageFloatSuccess } from "../../services/message/message-float.service";
import { RtcService } from "hrtc-sdk-services";
import { ShareState } from "../../services/state-manager/classroom-state.service";

@Options({
  components: {},
})
export default class ShareSelectDialog extends Vue {
  windowLists: any = [];
  dialogVisible = false;
  selectIndex = 0;
  screens: any;
  getScreenList() {
    this.windowLists = [];
    this.screens = RtcService().getScreenSources().sourceInfos;
    this.screens.map((item: any, index: number) => {
      const base64Data = btoa(String.fromCharCode.apply(null, item.icon));
      this.windowLists.push({
        id: index,
        base64Data: "data:image/jpg;base64," + base64Data,
        sourceId: item.sourceId,
        sourceName: item.sourceName,
        type: item.type,
        icon: item.icon,
      });
    });
  }
  shareSubmitAction() {
    if (ShareState.remoteShareList.length != 0) {
      messageFloatError("多人共享正在开发，后续更新。");
      return;
    }
    const selectState = RtcService().selectScreenShare(
      this.screens[this.selectIndex]
    );
    if (selectState == 0) {
      const shareState = RtcService().startScreenShare();
      console.log('share state:', shareState);
      messageFloatSuccess('开始共享');
      ShareState.screenShareState = shareState == 0 ? true : false;
      this.dialogVisible = false;
    } else {
      messageFloatError("share error code" + selectState);
    }
  }
}
</script>
<style lang="less" scoped>
.share-select {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: transparent;
}
.dialog-box {
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content {
  display: flex;
  flex-wrap: wrap;
  height: 300px;
  overflow-y: auto;
  width: 830px;
  margin-bottom: 25px;
}
.btns {
}
.window-item {
  width: 192px;
  height: 108px;
  background-color: #eee;
  border: 2px solid #eee;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border: 2px solid #00ffff;
  }
  img {
    height: 100%;
  }
  .sourse-name {
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #666;
  }
}
.window-item-select {
  border: 2px solid #00ffff;
}
</style>
