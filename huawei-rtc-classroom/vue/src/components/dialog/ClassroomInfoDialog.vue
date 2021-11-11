<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-11 15:29:17
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <a-modal v-model:visible="dialogState.classroomInfoVisible" width="292px" title="" :footer="null" :bodyStyle="{padding: '18px 15px 0'}">
    <div class="container">
      <div>教室名称：xxxx</div>
      <div>教室id: 123124</div>
      <div>其他。。。。</div>
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
export default class ClassroomInfoDialog extends Vue {
  dialogState = DialogState;

  @Watch('dialogState.classroomInfoVisible')
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
