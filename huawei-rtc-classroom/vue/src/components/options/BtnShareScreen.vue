<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-08 10:33:22
 * @LastEditTime: 2021-11-11 16:46:47
 * @LastEditors: Yandong Hu
 * @Description:
-->
<!--
 * @Description: button for share
-->
<template>
<div class="btn-share" @click="handleShare">请求共享</div>
</template>

<script lang="ts">
import { Options, Vue, Prop, Inject } from "vue-property-decorator";
import { ShareState, UserType } from "../../services/state-manager/classroom-state.service";
import {
  msgForShareScreen,
  updateUserInfo
} from "../../services/classroom.service";
import { SHARE_STATUS } from "../../services/common/abstract/rtm.abstract";
import { DialogState } from "../../services/state-manager/dialog-state.service";


@Options({
  components: {},
})
export default class BtnShare extends Vue {
 @Prop(Object) user!: UserType;
//  @Inject() private roomContext!: any;
 // 发送广播，更改状态 请求共享
 handleShare() {
   if(this.user.isLocal) {
    DialogState.shareSelectVisible = true;
   }
   updateUserInfo(this.user.userId,'share', SHARE_STATUS.SHARE_ASK)
   msgForShareScreen(this.user.userId, SHARE_STATUS.SHARE_ASK,'请求屏幕共享' )
 }
}
</script>

<style lang="less" scoped>
.btn-share {
  width: 100%;
  height: 100%;
}
</style>
