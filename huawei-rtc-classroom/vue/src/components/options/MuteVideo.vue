<!--
 * @Description: button for mute video
-->
<template>
  <div class="mute-audio" @click="handleVideo"> {{videoStatus}}</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { UserType } from "../../services/state-manager/classroom-state.service";
import {
  msgForMuteVideo,
  updateUserInfo
} from "../../services/classroom.service";
import { RtcService } from '../../services/common/rtc.service';
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";

@Options({
  components: {},
})
export default class MuteVideo extends Vue {
  @Prop(Object) user!: UserType;
  get videoStatus() {
    return this.user.video == ON_OFF.OFF ? '开启摄像头': '关闭摄像头'
  }

  /**
   * 开启、关闭视频 （自己/其他人）
   */
  handleVideo() {
     if(this.user.isLocal) {
        RtcService().enableLocalVideo(this.user.video == ON_OFF.ON ? false : true);
     }else { //开启关闭视频其他人， 需要发送广播, 其他人收到广播后，自己执行，并提示
        msgForMuteVideo(this.user.userId, this.user.video == ON_OFF.ON ? ON_OFF.OFF: ON_OFF.ON);
     }
     updateUserInfo(this.user.userId, 'video', this.user.video == ON_OFF.ON ? ON_OFF.OFF: ON_OFF.ON)
  }
}
</script>

<style lang="less" scoped>
.mute-audio {
  width: 100%;
  height: 100%;
}
</style>
