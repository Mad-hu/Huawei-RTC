<!--
 * @Description: vocie level
-->
<template>
  <div class="bg" :class="soundClass"></div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import {
  VoiceLevel,
  Volume,
} from "../../services/state-manager/voice-state.service";
@Options({
  components: {}
})
export default class SoundLevel extends Vue {
   @Prop(String) userId!: string;

  mounted() {
  }
  get soundClass() {
    return VoiceLevel[this.userId];
  }
}
</script>

<style lang="less" scoped>
.bg {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  &.sound {
    background: url('@/assets/classroom/icons/sound.png') no-repeat center ;
    background-size: 100% 100%;
  }
  &.sound1 {
    background: url('@/assets/classroom/icons/sound1.png') no-repeat center ;
    background-size: 100% 100%;
  }
  &.sound2 {
    background: url('@/assets/classroom/icons/sound2.png') no-repeat center ;
    background-size: 100% 100%;
  }
  &.sound3 {
    background: url('@/assets/classroom/icons/sound3.png') no-repeat center ;
    background-size: 100% 100%;
  }
  &.sound4 {
    background: url('@/assets/classroom/icons/sound4.png') no-repeat center ;
    background-size: 100% 100%;
  }
}
</style>
