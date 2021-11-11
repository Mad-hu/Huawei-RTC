<!--
 * @Description: share button for share status
-->
<template>
  <div class="btn-bg" :class="shareClass"></div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { UserType } from "../../services/state-manager/classroom-state.service";
@Options({
  components: {},
})
export default class BtnControl extends Vue {
  @Prop(Object) user!: UserType;
  get shareClass() {
    return this.user.share == 0 || this.user.share == 3 || this.user.share == 5  ? "enable" : "disable";
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
    display: none;
  }
  &.enable {
    background: url("@/assets/classroom/icons/share.png") no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
