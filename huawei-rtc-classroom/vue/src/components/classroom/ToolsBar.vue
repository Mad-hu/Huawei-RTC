<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-10-21 14:19:26
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="tools-bar">
    <div class="btn normal" @click="shareScreen()" title="共享屏幕">
      <span>&#xe616;</span>
      共享屏幕
    </div>
    <div
      :class="['btn', localUser.audio ? 'enable' : 'disable']"
      @click="audioAction()"
      title="声音"
    >
      <span>&#xe882;</span>
      声音
    </div>
    <div
      :class="['btn', localUser.video ? 'enable' : 'disable']"
      @click="videoAction()"
      title="摄像头"
    >
      <span>&#xe696;</span>
      摄像头
    </div>

    <div
      class="btn enable invite"
      @click="inviteAction()"
      title="邀请"
    >
      <span>&#xe682;</span>
      邀请
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
  muteAudio,
  muteVideo,
  sendMuteAudio,
  sendMuteVideo,
} from "../../services/classroom.service";
import {
  UserListState,
  UserType,
} from "../../services/state-manager/classroom-state.service";
@Options({
  components: {},
})
export default class ToolsBar extends Vue {
  localUser: UserType | undefined | any = { audio: true, video: true };
  shareScreen() {
    const shareSelectDialog: any = this.$refs["shareSelectDialogRef"];
    shareSelectDialog.dialogVisible = true;
    shareSelectDialog.getScreenList();
  }
  audioAction() {
    this.localUser = UserListState.lists.find((item) => item.isLocal)!;
    this.localUser.audio = !this.localUser.audio;
    muteAudio(this.localUser);
    sendMuteAudio(`${this.localUser.userId}`, this.localUser.audio!);
  }
  videoAction() {
    this.localUser = UserListState.lists.find((item) => item.isLocal)!;
    this.localUser.video = !this.localUser.video;
    muteVideo(this.localUser);
    sendMuteVideo(`${this.localUser.userId}`, this.localUser.video!);
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
  inviteAction() {

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
  height: 40px;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
  margin: 0 5px;
  span {
    font-family: "iconfont" !important;
    margin-right: 8px;
  }
}
.leavebtn {
  background-color: #c50000;
}
.normal {
  background-color: #409eff;
}
.enable {
  background-color: #85ce61;
}
.disable {
  background-color: #f56c6c;
}

.tools-bar {
  position: absolute;
  bottom: 0;
  height: 80px;
  background-color: #000;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #999;
  background-image: linear-gradient(#3a3a41, #252529, #414149);
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
