<!--
 * @Description: power fro recover 回收讲师权限
-->
<template>
  <div class="btn-role" @click="handleRole">设为助教</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { msgForPowerChange, updateUserInfo } from "../../services/classroom.service";
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
import { UserType } from "../../services/state-manager/classroom-state.service";

@Options({
  components: {
  },
})
export default class RoleChangeMteacher extends Vue {
  @Prop(Object) user!: UserType;
  //  更新列表中 power 角色， 发送广播给学生更新血色  把用户设为助教
  handleRole() {
    updateUserInfo( this.user.userId,'power', POWER_TYPE.TEACHER);
    msgForPowerChange(this.user.userId, POWER_TYPE.TEACHER, '老师已将你设为助教' )
  }
}
</script>

<style lang="less" scoped>
.btn-role {
  width: 100%;
  height: 100%;
}
</style>
