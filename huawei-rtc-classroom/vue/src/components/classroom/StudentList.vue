<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-09-29 18:13:30
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="stu-lists">
    <div class="stu-item" :key="item.userId" v-for="item in userListState">
      <div class="stu-render" :id="`user_${item.userId}`"></div>
      <div class="close" v-if="item.video == 0 ">已关闭</div>
      <div class="stu-info-con">
        <div class="name">{{ item.userName }}</div>
        <div class="userId">{{ item.userId }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { UserListState } from "../../services/state-manager/classroom-state.service";
import MediaTool from './mediaTools.vue'
@Options({
  components: {
    
  },
})
export default class StudentList extends Vue {
  userListState = UserListState.lists;
  mounted() {
    console.log("StudentList mounted:!");
  }
  updated() {
    console.log("StudentList updated:!");
  }
}
</script>

<style lang="less" scoped>
.stu-lists {
  width: 100%;
  height: 108px;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: center;
  .stu-item {
    width: 192px;
    height: 108px;
    position: relative;
  }
  .stu-render {
    width: 192px;
    height: 108px;
    background-color: #666;
    border: 1px solid #fff;
    overflow: hidden;
  }
  .close {
    position: absolute;
    bottom: 1px;
    left: 0;
    right: 0;
    top: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .stu-info-con {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 22px;
    width: 190px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
    margin: 0 1px;
    background-color: #eeeeee5e;
    line-height: 22px;
  }
}
</style>
