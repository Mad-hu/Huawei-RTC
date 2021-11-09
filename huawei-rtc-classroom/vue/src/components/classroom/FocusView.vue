<!--
 * @Description: foucs view show
-->
<template>
  <div class="focus-boards" v-if="focusUser">
    <div class="focus-view" :id="'focus_' + focusUser.userId"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import {
  getUserByKeyStatus,
  renderLocalVideo,
  renderRemoteVideo,
} from "../../services/classroom.service";
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";
@Options({
  components: {},
})
export default class MainBoards extends Vue {
  get focusUser() {
    const user: any = getUserByKeyStatus("focus", ON_OFF.ON);
    return user;
  }
  @Watch("focusUser")
  onFocusUserChange(newV: any, oldV: any) {
    if (newV) {
      setTimeout(() => {
        if (newV.isLocal) {
          renderLocalVideo(`focus_${newV.userId}`);
        } else {
          renderRemoteVideo(`focus_${newV.userId}`, newV.userId);
        }
      }, 500);
    }
  }
}
</script>

<style lang="less" scoped>
.focus-boards {
  height: calc(~"100vh - 188px");
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .focus-view {
    width: 100%;
    height: 100%;
  }
}
</style>
