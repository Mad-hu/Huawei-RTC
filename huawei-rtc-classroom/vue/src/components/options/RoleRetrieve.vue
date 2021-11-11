<!--
 * @Description: power fro recover 回收讲师权限
-->
<template>
  <div class="btn-role" @click="handleRole">回收{{powerName}}权限</div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from "vue-property-decorator";
import {
  getUserByKeyStatus,
  msgForPowerChange,
  updateUserInfo,
} from "../../services/classroom.service";
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
import {
  roomButtonsStatus,
  UserListState,
  UserType,
} from "../../services/state-manager/classroom-state.service";

@Options({
  components: {},
})
export default class RoleRetrieve extends Vue {
  @Prop(Number) power!: number;
  @Prop(Object) user!: UserType;
  get powerName() {
    return this.power == POWER_TYPE.MAIN_TEACHER ? '讲师':'助教'
  }
  //回收讲师权限, 更新列表中power 角色， 发送广播给学生更新血色
  handleRole() {
    // 获取当前主持人的用户， 把用户设为 student ,
    //  如果时回收讲师权限， 把自己设为 主持人
    // 如果是回收助教权限。无
    console.log('ss', UserListState.lists)
    // 回收讲师的权限
    if(this.power == POWER_TYPE.MAIN_TEACHER) {
       const user = getUserByKeyStatus('power',  POWER_TYPE.MAIN_TEACHER)
    console.log('ssssssss', user, 'superPower:'+ roomButtonsStatus.superPower)
    if (user && (user.userId!= Number.parseInt(roomButtonsStatus.superPower))) {
      updateUserInfo(user.userId, "power", POWER_TYPE.STUDENT);
      updateUserInfo(Number.parseInt(roomButtonsStatus.superPower), "power", POWER_TYPE.MAIN_TEACHER);
      msgForPowerChange(user.userId, POWER_TYPE.STUDENT, "老师已收回讲师权限");
    }
    }else {
      // 回收助教的权限
      updateUserInfo(this.user.userId, "power", POWER_TYPE.STUDENT);
      msgForPowerChange(this.user.userId, POWER_TYPE.STUDENT, "老师已收回助教权限");
    }

  }
}
</script>

<style lang="less" scoped>
.btn-role {
  width: 100%;
  height: 100%;
}
</style>
