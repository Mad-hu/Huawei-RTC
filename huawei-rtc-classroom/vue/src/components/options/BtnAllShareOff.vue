<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-08 10:33:22
 * @LastEditTime: 2021-11-13 15:54:49
 * @LastEditors: Yandong Hu
 * @Description: button for all share off
-->
<template>
  <div class="btn-share" @click="handleShare">全体关闭共享</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import {
  msgForShareScreen,
  sendStopShareScreen,
  updateUsersList,
} from "../../services/classroom.service";
import { SHARE_STATUS } from "../../services/common/abstract/rtm.abstract";

@Options({
  components: {},
})
export default class BtnAllShareOff extends Vue {
  handleShare() {
    updateUsersList("share", SHARE_STATUS.SHARE_END);
    sendStopShareScreen("all");
  }
}
</script>

<style lang="less" scoped>
.btn-share {
  width: 100%;
  height: 100%;
}
</style>
