<!--
 * @Description: button for share
-->
<template>
<div class="btn-share" @click="handleShare">请求共享</div>
</template>

<script lang="ts">
import { Options, Vue, Prop, Inject } from "vue-property-decorator";
import { UserType } from "../../services/state-manager/classroom-state.service";
import {
  msgForShareScreen,
  updateUserInfo
} from "../../services/classroom.service";
import { SHARE_STATUS } from "../../services/common/abstract/rtm.abstract";


@Options({
  components: {},
})
export default class BtnShare extends Vue {
 @Prop(Object) user!: UserType;
 @Inject() private roomContext!: any;
 // 发送广播，更改状态 请求共享
 handleShare() {
   if(this.user.isLocal) {
    this.roomContext.dialogVisible = true;
    this.roomContext.getScreenList();
   }
   updateUserInfo(this.user.userId,'share', SHARE_STATUS.SHARE_ASK)
   msgForShareScreen(this.user.userId, SHARE_STATUS.SHARE_ASK,'请求屏幕共享' )
 }
}
</script>

<style lang="scss" scoped>
.btn-share {
  width: 100%;
  height: 100%;
}
</style>
