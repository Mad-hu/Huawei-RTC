<!--
 * @Description: button for change nick name
-->
<template>
  <div class="user-item-buttons">
    <el-dropdown trigger="click" size="mini">
      <el-button type="primary" size="mini">更多</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <!-- 全体静音 -->
            <div @click="handleMute">全体静音</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 全体解除静音 -->
            <mute-all-audio-resume></mute-all-audio-resume>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 全体屏幕共享 -->
            <btn-all-share></btn-all-share>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 收回讲师权限 -->
            <role-retrieve></role-retrieve>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 关闭全体共享 -->
            <btn-all-share-off></btn-all-share-off>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 锁定、解锁教室 -->
            <btn-lock></btn-lock>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <mute-all-audio-dialog ref="dialogRef"></mute-all-audio-dialog>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import MuteAllAudioDialog from "./MuteAllAudioDialog.vue";
import BtnLock from "./BtnLock.vue";
import BtnAllShare from "./BtnAllShare.vue";
import BtnAllShareOff from "./BtnAllShareOff.vue";
import RoleRetrieve from "./RoleRetrieve.vue";
import MuteAllAudioResume from "./MuteAllAudioResume.vue"

@Options({
  components: {
    MuteAllAudioDialog,
    BtnAllShare,
    BtnAllShareOff,
    BtnLock,
    RoleRetrieve,
    MuteAllAudioResume
  },
})
export default class RoomBottomButtons extends Vue {
  handleMute() {
    const dialog: any = this.$refs["dialogRef"];
    dialog.dialogFlag = true;
  }
}
</script>

<style lang="scss" scoped>
.user-item-buttons {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
}
</style>
