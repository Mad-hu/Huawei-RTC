<!--
 * @Description: button for mute audio
-->
<template>
  <div class="mute-audio" @click="handleAudio"> {{audioStatus}}</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { BUTTON_STATUS, roomButtonsStatus, UserType } from "../../services/state-manager/classroom-state.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
import {
  checkStudentAudioOptionAuth,
  msgForMuteAudio,
  updateUserInfo
} from "../../services/classroom.service";
import { RtcService } from '../../services/common/rtc.service';
import { ON_OFF, POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
import { messageFloatWarning } from "../../services/message/message-float.service";

@Options({
  components: {},
})
export default class MuteAudio extends Vue {
  @Prop(Object) user!: UserType;
  get audioStatus() {
    return this.user.audio == ON_OFF.ON ? '静音': '解除静音'
  }

  /**
   * 静音/解除静音 （静音自己/静音老师）
   */
  handleAudio() {
    // 当学生对自己解除静音时，全体静音的状态是不允许学生自我解除时， 不可解除
    if(checkStudentAudioOptionAuth(this.user)) {
         messageFloatWarning(
          ON_OFF.NO_ALLOW_AUDIO_TIP
        );
        return;
    }
     if(this.user.isLocal) {
        RtcService().enableLocalAudio(this.user.audio == ON_OFF.ON ? false: true);
        updateUserInfo(this.user.userId, 'audio', this.user.audio ==ON_OFF.ON ? ON_OFF.OFF: ON_OFF.ON )
     }else { // 静音其他人， 需要发送广播, 其他人收到广播后，自己执行静音，并提示
        msgForMuteAudio(this.user.userId+'', this.user.audio ==ON_OFF.ON ? ON_OFF.OFF: ON_OFF.ON);
     }
  }
}
</script>

<style lang="less" scoped>
.mute-audio {
  width: 100%;
  height: 100%;
}
</style>
