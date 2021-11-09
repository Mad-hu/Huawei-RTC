<!--
 * @Description: button for share
-->
<template>
<div class="btn-control" @click="handleControl">请求远程控制</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { UserType } from "../../services/state-manager/classroom-state.service";
import {
  msgForControlScreen,
  updateUserInfo
} from "../../services/classroom.service";
import { CONTROL_STATUS } from "../../services/common/abstract/rtm.abstract";
import { loadingShow } from "../../services/loading.service";


@Options({
  components: {},
})
export default class BtnControlScreen extends Vue {
 @Prop(Object) user!: UserType;
 // 发送广播，更改状态 请求共享
 handleControl() {
   updateUserInfo(this.user.userId,'control', CONTROL_STATUS.CONTROL_ASK)
   msgForControlScreen(this.user.userId, CONTROL_STATUS.CONTROL_ASK,'请求远程控制')
  loadingShow("等待远端响应");
 }
}
</script>

<style lang="scss" scoped>
.btn-control {
  width: 100%;
  height: 100%;
}
</style>
