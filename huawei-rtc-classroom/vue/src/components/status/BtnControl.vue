<!--
 * @Description: control button for control status
-->
<template>
  <div class="btn-bg" :class="controlClass"></div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { UserType } from "../../services/state-manager/classroom-state.service";
@Options({
  components: {},
})
export default class BtnControl extends Vue {
  @Prop(Object) user!: UserType;
  get controlClass() {
    return  this.user.control? 'enable': 'disable'
  }
}
</script>

<style lang="less" scoped>
.btn-bg {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-size: 100% 100%;
  &.disable {
    background: url("@/assets/classroom/icons/video_disable.png") no-repeat
      center;

  }
  &.enable {
    background: url("@/assets/classroom/icons/video_enable.png") no-repeat
      center;
      background-size: 100% 100%;
  }
}
</style>
