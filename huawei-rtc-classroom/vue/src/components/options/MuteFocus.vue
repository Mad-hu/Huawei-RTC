<!--
 * @Description: button for mute video
-->
<template>
  <div class="mute-audio" @click="handleVideo">{{ focusStatus }}</div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import {
  MODE_TYPE,
  roomButtonsStatus,
  UserType,
} from "../../services/state-manager/classroom-state.service";
import {
  msgForMuteFocus,
  renderLocalVideo,
  renderRemoteVideo,
  updateUserInfo,
} from "../../services/classroom.service";
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";

@Options({
  components: {},
})
export default class MuteFocus extends Vue {
  @Prop(Object) user!: UserType;
  get focusStatus() {
    return this.user.focus ? "取消焦点" : "设为焦点";
  }

  /**
   * 设为焦点、取消焦点 （自己/其他人）
   * 1. 更新本地ui
   * 2. 发送广播告知
   * 3. 自动切换模式为演讲者模式
   */
  handleVideo() {
    updateUserInfo(
      this.user.userId,
      "focus",
      this.user.focus == ON_OFF.ON ? ON_OFF.OFF : ON_OFF.ON
    );
    roomButtonsStatus.mode =
      this.user.focus == ON_OFF.OFF ? roomButtonsStatus.mode : MODE_TYPE.FOCUS;
    // 因为这时候不知道流id ,暂且先这样，知道后填写上
    msgForMuteFocus(this.user.userId, this.user.focus);
    if (this.user.focus == ON_OFF.OFF) {
      let prefix = roomButtonsStatus.mode == MODE_TYPE.FLAT ? 'joiner_one': 'user_'
      if (this.user.isLocal) {
        renderLocalVideo(`${prefix}${this.user.userId}`);
      } else {
        renderRemoteVideo(`${prefix}${this.user.userId}`, this.user.userId);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mute-audio {
  width: 100%;
  height: 100%;
}
</style>
