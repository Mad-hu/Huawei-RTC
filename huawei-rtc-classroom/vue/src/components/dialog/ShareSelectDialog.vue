<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-15 17:37:27
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-dialog title="请选择共享" v-model="dialogState.shareSelectVisible" width="835px">
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
import { BrowserWindow } from "electron";
import { Options, Vue, Watch } from "vue-property-decorator";
import { getOSType } from "../../services/common/electron.service";
import { RtcService } from "../../services/common/rtc.service";
import { messageFloatError } from "../../services/message/message-float.service";
import { checkShareStatus, startShareScreen } from "../../services/share-window.service";
import { ShareState } from "../../services/state-manager/classroom-state.service";
import { DialogState } from "../../services/state-manager/dialog-state.service";
import { windowService } from "../../services/window.service";

@Options({
  components: {},
})
export default class ShareSelectDialog extends Vue {
  windowLists: any = [];
  dialogState = DialogState;
  selectIndex = 0;
  screens: any;
  shareWindow!: BrowserWindow;
  @Watch('dialogState.shareSelectVisible')
  onDialogVisibileChange(newV: boolean, oldV: boolean) {
    console.log('dialogState.shareSelectVisible onDialogVisibileChange:', newV, oldV);
    if(newV) {
      this.getScreenList();
    }
    if(ShareState.screenShareLocalState == false) {
      return;
    }
    if(newV) {
      windowService().setIgnoreMouseEvents(false);
    } else {
      windowService().setIgnoreMouseEvents(true);
    }
  }

  getScreenList() {
    this.windowLists = [];
    this.screens = RtcService().getScreenSources().sourceInfos;
    console.log(this.screens);
    if(getOSType() == 'darwin') {
      this.windowLists.push({
        id: 0,
        base64Data: "data:image/jpg;base64,",
        sourceId: '',
        sourceName: 'Monitor_1',
        type: '',
        icon: '',
      })
    }
    this.screens.map((item: any, index: number) => {
      const base64Data = btoa(String.fromCharCode.apply(null, item.icon));
      this.windowLists.push({
        id: getOSType() == 'darwin'? index + 1: index,
        base64Data: "data:image/jpg;base64," + base64Data,
        sourceId: item.sourceId,
        sourceName: item.sourceName,
        type: item.type,
        icon: item.icon,
      });
    });
  }
  async shareSubmitAction() {
    const status = await checkShareStatus();
    if(!status) {
      return;
    }
    const shareRes = startShareScreen(this.screens[this.selectIndex]);
    console.log('share state:', shareRes);
    if(shareRes.code == 0) {
      this.dialogState.shareSelectVisible = false;
    } else {
      messageFloatError('共享失败了:' + shareRes.type + shareRes.code);
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
