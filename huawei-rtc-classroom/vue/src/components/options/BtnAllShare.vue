<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-08 10:33:22
 * @LastEditTime: 2021-11-15 15:01:59
 * @LastEditors: Yandong Hu
 * @Description:
-->
<!--
 * @Description: button for all share
-->
<template>
<div class="btn-share" @click="handleShare">全体共享</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import {
  msgForShareScreen,
  updateUsersList
} from "../../services/classroom.service";
import { SHARE_STATUS } from "../../services/common/abstract/rtm.abstract";
import { startShareScreenAll } from "../../services/share-window.service";


@Options({
  components: {},
})
export default class BtnAllShare extends Vue {
  handleShare() {
  //  updateUsersList('share', SHARE_STATUS.SHARE_ASK)
  //  msgForShareScreen('all', SHARE_STATUS.SHARE_ASK,'请求屏幕共享' )
    startShareScreenAll();
 }
}
</script>

<style lang="less" scoped>
.btn-share {
  width: 100%;
  height: 100%;
}
</style>
