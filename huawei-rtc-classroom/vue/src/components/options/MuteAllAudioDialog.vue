<!--
 * @Description: button for mute audio
-->
<template>
  <el-dialog v-model="dialogFlag" title="提示" width="30%">
    <div>所有人将被静音</div>
    <el-checkbox v-model="status">允许学生自我解除静音</el-checkbox>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">否</el-button>
        <el-button type="primary" @click="handleAll"
          >是</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  msgForMuteAudio,
  updateUsersList
} from "../../services/classroom.service";
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";
import {
  roomButtonsStatus,
  BUTTON_STATUS
} from "../../services/state-manager/classroom-state.service"

@Options({
  components: {},
})
export default class MuteAllAudio  extends Vue {
  dialogFlag:boolean = false
  status:boolean = false
  /**
   * 全体静音，（不包括自己）只需要更新列表状态和发送关播即可
   */
  handleAll() {
    // 更新教室内按钮的状态
      roomButtonsStatus.audioStatus = this.status ? BUTTON_STATUS.AUDIO_STATUS_CHECKED_AGREE: BUTTON_STATUS.AUDIO_STATUS_CHECKED_UNAGREE
      msgForMuteAudio('all', ON_OFF.OFF, roomButtonsStatus.audioStatus);
      updateUsersList('audio',ON_OFF.OFF)
      this.dialogFlag=false;
  }
  handleCancel() {
    this.dialogFlag = false;
    roomButtonsStatus.audioStatus = BUTTON_STATUS.AUDIO_STATUS_UNCHECKED
  }
}
</script>

<style lang="less" scoped>
.mute-all {
  width: 100%;
  height: 100%;
}
</style>
