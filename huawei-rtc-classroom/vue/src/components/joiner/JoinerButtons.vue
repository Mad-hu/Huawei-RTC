<!--
 * @Description: button for change nick name
-->
<template>
  <div class="user-item-buttons">
    <el-dropdown  trigger ="click" size="mini">
      <el-button type="primary" size="mini">更多</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <!-- 静音、解除静音 -->
            <mute-video :user="user"></mute-video>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 改名 -->
             <div @click="handleNickName">改昵称</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 设为或者取消焦点 -->
            <mute-focus :user="user"></mute-focus>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 回收讲师权限 -->
            <role-retrieve></role-retrieve>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 设为主持人 -->
            <role-change-mteacher :user="user"></role-change-mteacher>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 设为助教 -->
            <role-changer-teacher :user="user"></role-changer-teacher>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 请求屏幕共享 -->
            <btn-share-screen :user="user"></btn-share-screen>
          </el-dropdown-item>
          <el-dropdown-item>
            <!-- 请求远程控制 -->
            <btn-control-screen :user="user"></btn-control-screen>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <btn-nick-name-dialog :user="user"  ref="nickNameDialogRef"></btn-nick-name-dialog>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import MuteVideo from "../options/MuteVideo.vue";
import MuteAudio from "../options/MuteAudio.vue";
import BtnNickName from "../options/BtnNickName.vue";
import BtnNickNameDialog from "../options/BtnNickNameDialog.vue"
import MuteFocus from "../options/MuteFocus.vue";
import RoleRetrieve from "../options/RoleRetrieve.vue";
import RoleChangeMteacher from "../options/RoleChangeMteacher.vue";
import RoleChangerTeacher from "../options/RoleChangerTeacher.vue";
import BtnShareScreen from "../options/BtnShareScreen.vue";
import BtnControlScreen from "../options/BtnControlScreen.vue";
import { UserType } from "../../services/state-manager/classroom-state.service";

@Options({
  components: {
    MuteVideo,
    MuteAudio,
    MuteFocus,
    BtnNickName,
    RoleRetrieve,
    RoleChangeMteacher,
    RoleChangerTeacher,
    BtnShareScreen,
    BtnControlScreen,
    BtnNickNameDialog
  },
})
export default class JoinerButtons extends Vue {
  @Prop(Object) user!: UserType;
  handleNickName() {
    const dialog: any = this.$refs["nickNameDialogRef"];
    dialog.dialogVisible = true;
  }
}
</script>

<style lang="scss" scoped>
.user-item-buttons {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  .mr10 {
    margin-right: 3px;
  }
}
</style>
