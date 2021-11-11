<template>
  <div class="media-tool-box" ref="mediaTool">
    <div class="btn" title="屏幕共享" @click="shareScreen()">
      <div class="icon-img-box"></div>
      <span class="btn-text">屏幕共享</span>
    </div>
    <div class="set-start-box">
      <el-dropdown placement="top" trigger="click">
        <div class="set-start-svg">&#xe665;</div>
        <!-- <arrow-down /> -->
        <template #dropdown>
          <el-dropdown-menu class="drop-hook">
            <div class="share-btns">
              <div
                class="item"
                :class="shareOnlyState ? 'select' : ''"
                @click="shareOnlyAction()"
              >
                每次只有一位参会者可以共享
              </div>
              <div
                class="item"
                :class="shareAllState ? 'select' : ''"
                @click="shareAllAction()"
              >
                多位参会者可以同时共享
              </div>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Prop, Vue } from "vue-property-decorator";
import { messageFloatError } from "../../../services/message/message-float.service";
import {
  setShareWindowStateControl,
  startShareScreen,
} from "../../../services/share-window.service";
import { UserInfoState } from "../../../services/state-manager/user-state.service";
import { DialogState } from "../../../services/state-manager/dialog-state.service";
export default class ShareToolsBtn extends Vue {
  @Prop({ type: String, required: true }) readonly tooltype: string | undefined;
  @Prop({ type: String, default: "top" }) placement!: string;

  shareOnlyState = false;
  shareAllState = false;
  shareOnlyAction() {
    this.shareOnlyState = !this.shareOnlyState;
  }
  shareAllAction() {
    this.shareAllState = !this.shareAllState;
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
}
</script>
<style  lang='less'>
.drop-hook {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.media-tool-box {
  position: relative;
  margin: 0 5px;
  .btn {
    height: 56px;
    min-width: 84px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    cursor: pointer;
    font-size: 17px;
    box-sizing: border-box;
    color: white;
    span {
      font-family: "iconfont" !important;
      font-size: 12px;
    }
    &:hover {
      background: rgb(46, 46, 46);
    }
    .icon-img-box {
      width: 32px;
      height: 32px;
      background: url("@/assets/classroom/icons/share-green.png") no-repeat 100% /
        100%;
    }
  }
}
.set-start-box {
  position: absolute;
  right: 0px;
  bottom: 30px;
  border-radius: 8px;
  cursor: pointer;
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
    width: 18px;
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.share-btns {
  background-color: rgba(55, 56, 60, 0.9);
  padding: 5px;
  border-radius: 5px;
  width: 210px;
  .select {
    &::before {
      content: " ";
      display: block;
      background: #4dc800;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      margin-right: 5px;
      position: absolute;
      left: 0px;
    }
  }
  .item {
    font-size: 13px;
    line-height: 23px;
    color: #fff;
    height: 23px;
    cursor: pointer;
    position: relative;
    padding: 0 0 0 15px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    &:hover {
      background: rgb(64, 64, 64);
    }
  }
}
</style>
