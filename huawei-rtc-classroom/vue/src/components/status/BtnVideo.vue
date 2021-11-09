<!--
 * @Description: video button for status
-->
<template>
  <div class="btn-bg" :class="videoClass"></div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";
import { UserType } from "../../services/state-manager/classroom-state.service";
@Options({
  components: {},
})
export default class BtnAudio extends Vue {
  @Prop(Object) user!: UserType;
  get videoClass() {
    return  this.user.video == ON_OFF.ON? 'enable': 'disable'
  }
}
</script>

<style lang="scss" scoped>
.btn-bg {
    width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-size: 100% 100%;
  &.disable {
    background: url("@/assets/classroom/icons/video_disable.png") no-repeat
      center;
      background-size: 100% 100%;
  }
  &.enable {
    background: url("@/assets/classroom/icons/video_enable.png") no-repeat
      center;
      background-size: 100% 100%;
  }
}
</style>
