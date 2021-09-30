<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-08-11 17:28:19
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="teacher-view">
    <div class="teacher-board" id="teacher-board"></div>
    <div class="teacher-info">老师</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';

@Options({
  components: {
  },
})
export default class TeacherView extends Vue {

}
</script>

<style lang="less" scoped>
  .teacher-view {
    height: 108px;
    width: 191px;
    border-bottom: 1px solid #fff;
    position: relative;
    .teacher-board {
      position: absolute;
      z-index: 2;
      height: 108px;
      width: 191px;
      overflow: hidden;
    }
    .teacher-info {
      position: absolute;
      z-index: 1;
      background-color: #fff;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 46px;
    }
  }
</style>
