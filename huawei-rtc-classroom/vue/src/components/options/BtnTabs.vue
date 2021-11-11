<!--
 * @Description: user list fro bottom tab buttons
-->
<template>
  <div class="btn-tabs">
    <div class="wrapper">
      <el-button type="primary" size="mini" v-if="checkSuperPower">
        <role-retrieve :power="power"></role-retrieve>
      </el-button>
      <room-bottom-buttons v-if="!checkLocalUserStudent"></room-bottom-buttons>
    </div>
    <div class="wrapper" v-if="!checkLocalUserStudent">
      <el-button
        class="mute-all"
        :class="audioStatus ? '' : 'checked'"
        type="primary"
        size="mini"
        @click="handleMute"
        >全体静音</el-button
      >
      <el-button type="primary" size="mini">
        <mute-all-audio-resume></mute-all-audio-resume>
      </el-button>
    </div>
  </div>
  <mute-all-audio-dialog ref="audioDialogRef"></mute-all-audio-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  BUTTON_STATUS,
  roomButtonsStatus,
} from "../../services/state-manager/classroom-state.service";
import MuteAllAudioDialog from "./MuteAllAudioDialog.vue";
import RoomBottomButtons from "./RoomBottomButtons.vue";
import RoleRetrieve from "./RoleRetrieve.vue";
import MuteAllAudioResume from "./MuteAllAudioResume.vue";
import { getUserLocalId } from "../../services/setting/setting-service";
import { getUserByKeyStatus } from "../../services/classroom.service";
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";

@Options({
  components: {
    MuteAllAudioDialog,
    RoomBottomButtons,
    RoleRetrieve,
    MuteAllAudioResume,
  },
})
export default class BtnTabs extends Vue {
  get audioStatus() {
    return (
      roomButtonsStatus.audioStatus == BUTTON_STATUS.AUDIO_STATUS_UNCHECKED
    );
  }
  get checkSuperPower() {
    return getUserLocalId() + "" == roomButtonsStatus.superPower;
  }
  get checkLocalUserStudent() {
    const user = getUserByKeyStatus("isLocal", true) || {
      power: POWER_TYPE.STUDENT,
    };
    return user.power == POWER_TYPE.STUDENT;
  }
  get power() {
    return POWER_TYPE.MAIN_TEACHER
  }
  handleMute() {
    const dialog: any = this.$refs["audioDialogRef"];
    dialog.dialogFlag = true;
  }
}
</script>

<style lang="less" scoped>
.btn-tabs {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-left: 3px;
    margin-bottom: 5px;
    .mute-all {
      &.checked {
        background: green;
      }
    }
  }
}
</style>
