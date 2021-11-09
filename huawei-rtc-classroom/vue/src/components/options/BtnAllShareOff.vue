<!--
 * @Description: button for all share off
-->
<template>
<div class="btn-share" @click="handleShare">全体关闭共享</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import {
  msgForShareScreen,
  updateUsersList
} from "../../services/classroom.service";
import { SHARE_STATUS } from "../../services/common/abstract/rtm.abstract";


@Options({
  components: {},
})
export default class BtnAllShareOff extends Vue {
   handleShare() {
   updateUsersList('share', SHARE_STATUS.SHARE_END)
   msgForShareScreen('all', SHARE_STATUS.SHARE_END,'请求屏幕共享' )
 }
}
</script>

<style lang="scss" scoped>
.btn-share {
  width: 100%;
  height: 100%;
}
</style>
