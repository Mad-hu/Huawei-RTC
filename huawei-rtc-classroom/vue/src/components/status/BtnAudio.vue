<!--
 * @Description: audio button for audion status
-->
<template>
  <div v-show="!user.audio" class="audio-disable"></div>
  <sound-level v-show="user.audio" :userId="userIdString"></sound-level>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import SoundLevel from "@/components/status/SoundLevel.vue";
import { UserType } from "../../services/state-manager/classroom-state.service";
@Options({
  components: {
    SoundLevel,
  },
})
export default class BtnAudio extends Vue {
  @Prop(Object) user!: UserType;

  mounted() {
    this.init();
  }
  init() {}
  get userIdString() {
    return this.user.userId + "";
  }
}
</script>

<style lang="less" scoped>
.audio-disable {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-size: 100% 100%;
  background: url("@/assets/classroom/icons/audio_disable.png") no-repeat center;
  background-size: 100% 100%;
}
</style>
