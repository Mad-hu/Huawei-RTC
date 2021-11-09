<!--
 * @Description: button for mute audio
-->
<template>
  <div class="mute-all" @click="handleAudio">解除静音</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  msgForMuteAudio,
  updateUsersList
} from "../../services/classroom.service";
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";
import {
  BUTTON_STATUS
} from "../../services/state-manager/classroom-state.service"

@Options({
  components: {},
})
export default class MuteAllAudioResume  extends Vue {
  dialogFlag:boolean = false
  status:boolean = false
  /**
   * 解除全体静音，（不包括自己）只需要更新列表状态和发送关播即可
   */
  handleAudio() {
    // 更新教室内按钮的状态
      msgForMuteAudio('all', ON_OFF.ON, BUTTON_STATUS.AUDIO_STATUS_UNCHECKED);
      updateUsersList('audio',ON_OFF.ON)
  }
}
</script>

<style lang="scss" scoped>
.mute-all {
  width: 100%;
  height: 100%;
}
</style>
