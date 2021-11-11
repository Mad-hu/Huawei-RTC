<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-11 13:38:24
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <a-modal v-model:visible="dialogState.userListVisible" width="292px" title="" :footer="null" :bodyStyle="{padding: '18px 15px 0'}">
    <div class="container">
      <user-list-view></user-list-view>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import { DialogState } from "../../services/state-manager/dialog-state.service";
import { windowService } from "../../services/window.service";
@Options({
  components: {},
})
export default class UserListDialog extends Vue {
  dialogState = DialogState;

  @Watch('dialogState.userListVisible')
  onDialogVisibileChange(newV: boolean, oldV: boolean) {
    console.log('onDialogVisibileChange:', newV, oldV);
    if(newV) {
      windowService().setIgnoreMouseEvents(false);
    } else {
      windowService().setIgnoreMouseEvents(true);
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 400px;
  display: flex;
}
</style>
