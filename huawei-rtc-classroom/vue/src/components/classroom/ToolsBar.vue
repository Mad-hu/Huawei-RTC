<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-15 17:57:37
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="tools-bar">
    <div class="left">
      <media-tools tooltype="audio"></media-tools>
      <media-tools tooltype="video"></media-tools>
      <!-- 共享屏幕 -->
      <share-tools-btn titleText="屏幕共享"></share-tools-btn>
    </div>
    <div class="right">
      <div class="btn leavebtn" @click="leave()" title="离开教室">离开教室</div>
     <div class="mr10" v-if="showEndClass">
        <btn-end-class></btn-end-class>
     </div>
      <div class="setting" @click="settingAction()" title="设置">
        <span>&#xe892;</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Options, Vue } from "vue-property-decorator";
import {
  getUserByKeyStatus,
  leaveClassroom,
} from "../../services/classroom.service";
import { messageFloatError } from "../../services/message/message-float.service";
import { checkShareStatus, setShareWindowStateControl, startShareScreen } from "../../services/share-window.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
import { DialogState } from "../../services/state-manager/dialog-state.service";
import BtnEndClass from "../options/BtnEndClass.vue"
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
@Options({
  components: {
    BtnEndClass
  }
})
export default class ToolsBar extends Vue {
  get showEndClass() {
    const user = getUserByKeyStatus('isLocal', true) || {power: POWER_TYPE.STUDENT}
    return user.power != POWER_TYPE.STUDENT
  }
  async shareScreen() {
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
  leave() {
    leaveClassroom();
  }
  settingAction() {
    DialogState.settingVisible = true;
  }
}
</script>

<style lang="less" scoped>
.leavebtn {
  height: 100%;
  min-width: 84px;
  padding: 12px 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  font-size: 17px;
  margin: 0 5px;
  color: #ff4242;
  cursor: pointer;
  &:hover{
    background: rgb(46, 46, 46);
  }
}
.normal {
  background-color: #409eff;
}
.enable {
  // background-color: #85ce61;
}
.disable {
  background-color: #f56c6c;
}
 .mr10 {
    margin-right: 10px;
  }

.tools-bar {
  position: absolute;
  bottom: 0;
  height: 56px;
  background-color: #000;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #999;
  background: rgb(26, 26, 26);
  .left {
    display: flex;
  }
  .right {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
.setting {
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
