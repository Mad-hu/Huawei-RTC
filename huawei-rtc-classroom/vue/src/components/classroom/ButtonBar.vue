<!--
 * @Description: joiners show , one joiner
-->
<template>
  <div class="buttons">
    <div class="icon" @click="handleScreen" :class="screenType"></div>
    <div class="icon" @click="handleMode" :class="modeType"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  MODE_TYPE,
  roomButtonsStatus,
  SCREEN_TYPE,
} from "../../services/state-manager/classroom-state.service";

@Options({
  components: {},
})
export default class ButtonBar extends Vue {
  get modeType() {
    return roomButtonsStatus.mode == MODE_TYPE.FOCUS ? "flat" :"focus";
  }
  get screenType() {
    return roomButtonsStatus.screen == SCREEN_TYPE.NORMAL ?"full":"normal";
  }
  handleScreen() {
   roomButtonsStatus.screen= roomButtonsStatus.screen == SCREEN_TYPE.NORMAL ?  SCREEN_TYPE.FULL: SCREEN_TYPE.NORMAL
  }
  handleMode() {
   roomButtonsStatus.mode =  roomButtonsStatus.mode == MODE_TYPE.FOCUS ? MODE_TYPE.FLAT:MODE_TYPE.FOCUS;
  }
}
</script>

<style lang="less" scoped>
.buttons {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  z-index: 9999;
  .icon {
    width: 16px;
    height: 16px;
    margin: 5px;
    &.focus {
      background: url("@/assets/classroom/icons/mode_focus.png") no-repeat
        center;
      background-size: 100% 100%;
    }
    &.flat {
      background: url("@/assets/classroom/icons/mode_flat.png") no-repeat center;
      background-size: 100% 100%;
    }
    &.normal {
        background: url("@/assets/classroom/icons/screen_normal.png") no-repeat center;
      background-size: 100% 100%;
    }
     &.full {
        background: url("@/assets/classroom/icons/screen_full.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
