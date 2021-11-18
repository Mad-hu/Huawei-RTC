<!--
 * @Description: button for lock , only request
-->
<template>
  <el-button class="btn-end" size="mini" type="danger" @click="handleEnd"
    >下课</el-button
  >
</template>

<script lang="ts">
import { ElMessageBox } from "element-plus";
import { Options, Vue, Prop, Watch } from "vue-property-decorator";
import { leaveClassroom } from "../../services/classroom.service";
import { messageFloatWarning } from "../../services/message/message-float.service";
import {
  COUNT_DOWN_TIP_STATUS,
  roomInfo,
} from "../../services/state-manager/classroom-state.service";

@Options({
  components: {},
})
export default class BtnEndClass extends Vue {
  get endTime() {
    return roomInfo.endTime;
  }
  get showTip15() {
    return roomInfo.countDownTip15;
  }

  get showTip3() {
    return roomInfo.countDownTip3;
  }

  @Watch("showTip15")
  onShowTip15Change(newV: number, oldV: number) {
    if (newV == COUNT_DOWN_TIP_STATUS.SHOWING) {
      this.tip(15);
    }
  }

  @Watch("showTip3")
  onShowTip3Change(newV: number, oldV: number) {
    if (newV == COUNT_DOWN_TIP_STATUS.SHOWING) {
      this.tip(3);
    }
  }

  handleEnd() {
    if (this.getNow() < this.endTime) {
      messageFloatWarning("未到下课时间不允许下课!");
      return;
    }
    leaveClassroom()
  }
  getNow() {
    return new Date().getTime();
  }
  tip(type: number) {
    ElMessageBox.alert(`已到下课时间，${type}min后教室将自动关闭`, {
      confirmButtonText: "确定",
      callback: () => {
        if (type == 3) {
          roomInfo.countDownTip3 = COUNT_DOWN_TIP_STATUS.HAS_SHOW;
        } else {
          roomInfo.countDownTip15 = COUNT_DOWN_TIP_STATUS.HAS_SHOW;
        }
      },
    });
  }
}
</script>

<style lang="less" scoped>
.btn-lock {
  width: 100%;
  height: 100%;
}
</style>
