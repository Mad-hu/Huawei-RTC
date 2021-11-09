<!--
 * @Description: power fro recover 回收讲师权限
-->
<template>
  <div class="btn-role" @click="handleRole">设为讲师</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { getUserByKeyStatus, msgForPowerChange, updateUserInfo } from "../../services/classroom.service";
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
import { roomButtonsStatus, UserListState, UserType } from "../../services/state-manager/classroom-state.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";

@Options({
  components: {
  },
})
export default class RoleChangeMteacher extends Vue {
  @Prop(Object) user!: UserType;
  //  更新列表中 power 角色， 发送广播给学生更新血色  把用户设为 主持人 , 把自己设为 student
  handleRole() {
    const user = getUserByKeyStatus('isLocal', true)
    if(user) updateUserInfo(user.userId, 'power', POWER_TYPE.STUDENT);
    updateUserInfo(this.user.userId,'power', POWER_TYPE.MAIN_TEACHER);
    msgForPowerChange(this.user.userId, POWER_TYPE.MAIN_TEACHER, '讲师' )
  }
}
</script>

<style lang="scss" scoped>
.btn-role {
  width: 100%;
  height: 100%;
}
</style>
