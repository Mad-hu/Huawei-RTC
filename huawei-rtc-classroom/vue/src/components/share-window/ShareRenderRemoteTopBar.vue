<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-18 14:57:39
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div id="share-render-window" class="share-topbar">
    <div class="bar-bottom">
      <div class="bottom">
        <div class="left sharing">
          <span>你正在观看{{ shareState.currentShare.userName }}的屏幕</span>
        </div>
        <a-dropdown :trigger="['click']">
          <div class="right more" @click.prevent title="查看选项">
            <div>查看选项</div>
            <div class="more-icon">&#xe665;</div>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <div @click="controlAction()">请求远程控制</div>
              </a-menu-item>
              <a-menu-item key="1">
                <div @click="noteAction()">注释</div>
              </a-menu-item>
              <a-menu-item key="2">
                <div @click="shareScreenAction()">共享屏幕</div>
              </a-menu-item>
              <a-menu-divider v-if="shareModeStatus.shareControlStaus == '0'"/>
              <div class="share-users" v-if="shareModeStatus.shareControlStaus == '0'">
                <a-menu-item :key="item.userId" v-for="item in shareState.remoteShareList">
                  <div class="user" :class="item.available?'select': ''" @click="selectShareAction(item)">
                    {{item.userName}}
                  </div>
                </a-menu-item>
              </div>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import { msgForControlScreen, msgForShareScreen, sendStartShareScreen, sendStopShareScreen, updateUserInfo } from "../../services/classroom.service";
import { CONTROL_STATUS, SHARE_STATUS } from "../../services/common/abstract/rtm.abstract";
import { loadingShow } from "../../services/loading.service";
import { messageFloatError } from "../../services/message/message-float.service";
import { checkShareStatus, setShareWindowStateControl, startShareScreen } from "../../services/share-window.service";
import {
  channelAttributeState,
  RemoteShareType,
  ShareState,
} from "../../services/state-manager/classroom-state.service";
import { DialogState } from "../../services/state-manager/dialog-state.service";
import { NoteState } from "../../services/state-manager/note-state.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
@Options({
  components: {},
})
export default class ShareRenderRemoteTopBar extends Vue {
  shareState = ShareState;
  shareModeStatus = channelAttributeState.shareControlStaus;
  noteAction() {
    NoteState.visible = !NoteState.visible;
  }
  async selectShareAction(item: RemoteShareType) {
    this.shareState.currentShare = item;
    // 当前共享者停止
    sendStopShareScreen(this.shareState.currentShare.userId);
    await checkShareStatus();
    sendStartShareScreen(item.userId, false);
    // 选择者开始共享
    msgForShareScreen(item.userId, SHARE_STATUS.SHARE_ASK, "请求屏幕共享", false);
  }
  controlAction() {
    const userId = parseInt(this.shareState.currentShare.userId)
    updateUserInfo( userId,'control', CONTROL_STATUS.CONTROL_ASK)
    msgForControlScreen( userId, CONTROL_STATUS.CONTROL_ASK,'请求远程控制')
    loadingShow("等待远端响应");
  }
  async shareScreenAction() {
    if(UserInfoState.role == 'teacher') {
      DialogState.shareSelectVisible = true;
      return;
    }
    if(UserInfoState.role == 'student') {
      const status = await checkShareStatus();
      if(!status) {
        return;
      }
      const shareRes = startShareScreen();
      if(shareRes.code == 0) {
        setShareWindowStateControl(true);
      } else {
        messageFloatError('共享失败了:' + shareRes.type + shareRes.code);
      }
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
.share-users {
  max-height: 200px;
  overflow-y: auto;
  .user {
    // height: 20px;
    padding-left: 16px;
  }
  .select {
    position: relative;
    &::before {
      content: " ";
      display: block;
      background: #4dc800;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 2px;
      left: 0px;
      border-radius: 5px;
    }
  }
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
  z-index: 999;
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
    height: 20px;
    // position: absolute;
    // bottom: -20px;
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
:deep(.ant-dropdown-menu-item) {
  font-size: 13px;
  line-height: 13px;
  color: #fff;
}
:deep(.ant-dropdown-menu-item:hover) {
  background: #999;
}
</style>
