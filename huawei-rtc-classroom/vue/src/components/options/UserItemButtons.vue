<!--
 * @Description: button for change nick name
-->
<template>
  <div class="user-item-buttons">
    <el-dropdown trigger="click" size="mini">
      <el-button type="primary" size="mini" class="mr10">更多</el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="show">
            <!-- 静音、解除静音 -->
            <mute-video :user="user"></mute-video>
          </el-dropdown-item>
          <el-dropdown-item v-if="show">
            <!-- 改名 -->
            <div @click="handleNickName">改昵称</div>
          </el-dropdown-item>
          <el-dropdown-item v-if="checkTeacher">
            <!-- 设为或者取消焦点 -->
            <mute-focus :user="user"></mute-focus>
          </el-dropdown-item>
          <!-- 回收讲师权限 -->
          <el-dropdown-item v-if="checkShowRetriesMainTeacher">
            <role-retrieve :power="powerMTeacher" :user="user"></role-retrieve>
          </el-dropdown-item>
          <!-- 回收助教权限 -->
          <el-dropdown-item v-if="checkShowRetriesTeacher">
            <role-retrieve :power="powerTeacher" :user="user"></role-retrieve>
          </el-dropdown-item>
          <el-dropdown-item v-if="checkTeacher">
            <!-- 设为讲师 -->
            <role-change-mteacher :user="user"></role-change-mteacher>
          </el-dropdown-item>
          <el-dropdown-item v-if="checkTeacher">
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
    <el-button type="primary" size="mini" class="mr10" v-if="show">
      <mute-audio :user="user"></mute-audio>
    </el-button>
  </div>
  <btn-nick-name-dialog
    :user="user"
    ref="nickNameDialogRef"
  ></btn-nick-name-dialog>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { roomButtonsStatus, UserType } from "../../services/state-manager/classroom-state.service";
import MuteVideo from "./MuteVideo.vue";
import MuteAudio from "./MuteAudio.vue";
import BtnNickName from "./BtnNickName.vue";
import BtnNickNameDialog from "./BtnNickNameDialog.vue";
import MuteFocus from "./MuteFocus.vue";
import RoleRetrieve from "./RoleRetrieve.vue";
import RoleChangeMteacher from "./RoleChangeMteacher.vue";
import RoleChangerTeacher from "./RoleChangerTeacher.vue";
import BtnShareScreen from "./BtnShareScreen.vue";
import BtnControlScreen from "./BtnControlScreen.vue";
import { getUserByKeyStatus } from "../../services/classroom.service";
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
import { getUserLocalId } from "../../services/setting/setting-service";

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
    BtnNickNameDialog,
  },
})
export default class UserItemButtons extends Vue {
  @Prop(Object) user!: UserType;
  handleNickName() {
    const dialog: any = this.$refs["nickNameDialogRef"];
    dialog.dialogVisible = true;
  }
  // 获取当前登录用户
  get localUser() {
    return  getUserByKeyStatus("isLocal", true) || {
      power: POWER_TYPE.STUDENT,
    }
  }
  get show() {
    // 学生对老师，只能请求共享，和 远程控制
    return !(
      this.localUser.power == POWER_TYPE.STUDENT &&
      this.user.power != POWER_TYPE.STUDENT
    );
  }
  // 判断是否展示 回收助教的权限
  // 当前用户是助教，并且当前登录人不是学生，则展示
  get checkShowRetriesTeacher() {
    return (
      this.checkPower(POWER_TYPE.TEACHER) &&
      this.localUser.power != POWER_TYPE.STUDENT
    );
  }

  // 助教角色
  get powerTeacher() {
    return POWER_TYPE.TEACHER;
  }
  // 讲师角色
  get powerMTeacher() {
    return POWER_TYPE.MAIN_TEACHER;
  }

  // 检测当前登录人是否是超级主持人, 并且当前用户拥有讲师的角色
  get checkShowRetriesMainTeacher() {
    return getUserLocalId() + "" == roomButtonsStatus.superPower && this.user.power == POWER_TYPE.MAIN_TEACHER;
  }
  // 检测当前登录人的角色不是学生
  get checkTeacher() {
    return  this.localUser.power != POWER_TYPE.STUDENT
  }

  // 判断当前用户的角色是否为讲师,是否为助教
  checkPower(power: number) {
    return this.user.power == power;
  }
}
</script>

<style lang="less" scoped>
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
