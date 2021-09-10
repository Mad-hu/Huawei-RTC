<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-09-02 18:10:19
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-dialog title="请选择共享" v-model="dialogVisible" width="835px">
    <div class="dialog-box">
      <div class="content">
        <div
          class="window-item"
          :key="item.id"
          v-for="item in windowLists"
          :class="[item.id == selectIndex? 'window-item-select' : '']"
          @click="selectIndex = item.id"
          ></div>
      </div>
      <div class="btns">
        <el-button type="primary" @click="shareSubmitAction()">开始共享</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-property-decorator";
import { messageFloatError } from "../../services/message/message-float.service";

@Options({
  components: {},
})
export default class ShareSelectDialog extends Vue {
  windowLists: any = [];
  dialogVisible = ref(false);
  selectIndex = 0;
  mounted() {
    console.log("ShareSelectDialog mounted:!");
    for(let i = 0; i <= 2; i++) {
      this.windowLists.push({
        id: i,
        name: '小明' + i
      })
    }
  }
  shareSubmitAction() {
    console.log("开始共享屏幕", this.windowLists[this.selectIndex]);
    messageFloatError('sdk not support! please change other sdk try again!');
  }
}
</script>
<style lang="less" scoped>
  .share-select{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  .dialog-box {
    width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    height: 300px;
    overflow-y: auto;
    width: 830px;
    margin-bottom: 25px;
  }
  .btns {

  }
  .window-item {
    width: 192px;
    height: 108px;
    background-color: #eee;
    border: 2px solid #eee;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    &:hover {
      border: 2px solid #00ffff;
    }
  }
  .window-item-select {
    border: 2px solid #00ffff;
  }
</style>
