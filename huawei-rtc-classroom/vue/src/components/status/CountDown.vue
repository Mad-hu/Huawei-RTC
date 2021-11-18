<!--
 * @Description: video button for status
-->
<template>
  <div class="count-down">录制时间：{{ text }}</div>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import {
  COUNT_DOWN_TIP_STATUS,
  roomInfo,
} from "../../services/state-manager/classroom-state.service";
@Options({
  components: {},
})
export default class CountDown extends Vue {
  text: string = "";
  timer: any = null;
  get start() {
    return roomInfo.startTime;
  }
  get end() {
    return roomInfo.endTime + 7 * 60 * 1000;
  }
  @Watch("start")
  onStartChange(newV: number, oldV: number) {
    if (newV) {
      this.init();
    }
  }
  unmounted() {
    if (this.timer) clearInterval(this.timer);
  }
  init() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    let temp, m, s, now;
    this.timer = setInterval(() => {
      now = new Date().getTime();
      if (this.end > now) {
        temp = (now - this.start) / 1000;
        m = Math.floor(temp / 60);
        m = m < 10 ? "0" + m : m;
        s = Math.floor(temp % 60);
        s = s < 10 ? "0" + s : s;
        this.text = `${m}:${s}`;
        // 下面是 赋值是否显示 倒计时15分自动关闭教室，倒计时3分钟自动关闭教室
        if (
          this.end - now < 16 * 60 * 1000 &&
          this.end - now > 14 * 60 * 1000
        ) {
          if (roomInfo.countDownTip15 == COUNT_DOWN_TIP_STATUS.NEVER_SHOW) {
            roomInfo.countDownTip15 = COUNT_DOWN_TIP_STATUS.SHOWING;
          }
        } else if (
          this.end - now < 4 * 60 * 1000 &&
          this.end - now > 3 * 60 * 1000
        ) {
          if (roomInfo.countDownTip3 == COUNT_DOWN_TIP_STATUS.NEVER_SHOW) {
            roomInfo.countDownTip3 = COUNT_DOWN_TIP_STATUS.SHOWING;
          }
        }
      } else {
        clearInterval(this.timer);
        this.text = "";
         roomInfo.countDownTip15 = COUNT_DOWN_TIP_STATUS.NEVER_SHOW;
         roomInfo.countDownTip3 = COUNT_DOWN_TIP_STATUS.NEVER_SHOW;
      }
    });
  }
}
</script>

<style lang="less" scoped>
.count-down {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  padding: 5px 10px;
}
</style>
