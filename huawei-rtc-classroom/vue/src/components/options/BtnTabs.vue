<!--
 * @Description: user list fro bottom tab buttons
-->
<template>
  <div class="btn-tabs">
    <div class="wrapper">
      <el-button type="primary" size="mini">
        <role-retrieve></role-retrieve>
         </el-button>
      <room-bottom-buttons></room-bottom-buttons>
    </div>
    <div class="wrapper">
      <el-button type="primary" size="mini" @click="handleMute">全体静音</el-button>
      <el-button type="primary" size="mini">
        <mute-all-audio-resume></mute-all-audio-resume>
         </el-button>
    </div>
  </div>
  <mute-all-audio-dialog ref="audioDialogRef"></mute-all-audio-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { roomButtonsStatus } from "../../services/state-manager/classroom-state.service";
import MuteAllAudioDialog from "./MuteAllAudioDialog.vue";
import RoomBottomButtons from "./RoomBottomButtons.vue";
import RoleRetrieve from "./RoleRetrieve.vue";
import MuteAllAudioResume from "./MuteAllAudioResume.vue"

@Options({
  components: {
    MuteAllAudioDialog,
    RoomBottomButtons,
    RoleRetrieve,
    MuteAllAudioResume
  },
})
export default class BtnTabs extends Vue {
  get audioStatus() {
    return roomButtonsStatus.audioStatus != 2;
  }
  handleMute() {
    const dialog: any = this.$refs["audioDialogRef"];
    dialog.dialogFlag = true;
  }
}
</script>

<style lang="scss" scoped>
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
  }
}
</style>
