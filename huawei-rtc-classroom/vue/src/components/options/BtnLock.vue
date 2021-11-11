<!--
 * @Description: button for lock , only request
-->
<template>
<div class="btn-lock" @click="handleLock">{{statusName}}</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { roomButtonsStatus } from "../../services/state-manager/classroom-state.service";

@Options({
  components: {},
})
export default class BtnLock extends Vue {
  status: number = roomButtonsStatus.lockStatus
  get statusName() {
    return this.status == 1 ? '解锁': '锁定'
  }
  handleLock() {
    roomButtonsStatus.lockStatus = roomButtonsStatus.lockStatus == 1? 0: 1
    // 需要调用接口，通知后台
  }
}
</script>

<style lang="less" scoped>
.btn-lock {
  width: 100%;
  height: 100%;
}
</style>
