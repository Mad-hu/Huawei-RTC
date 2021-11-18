<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-16 09:41:19
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="title-bar">
    <div class="title-left">
      <div class="title-bar-logo" @click="logoAction()"></div>
      <span>{{titleBarState.text}}</span>
    </div>
    <div class="title-bar-btns">
      <div class="title-bar-btn bar-min" @click="minBtnAction()">&#xe60c;</div>
      <div class="title-bar-btn bar-max" @click="restoreBtnAction()">
        &#xe64c;
      </div>
      <div class="title-bar-btn bar-close" @click="closeBtnAction()">
        &#xe695;
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {},
})
export default class VideoListTitleBar extends Vue {

}
</script>
<style lang="less" scoped>
.title-bar {
  -webkit-app-region: drag;
  height: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background: #1c1e20;
  position: relative;
  z-index: 9999999;
  .title-left {
    display: flex;
    align-items: center;
    .title-bar-logo {
      width: 14px;
      height: 14px;
      margin-right: 5px;
      -webkit-app-region: no-drag;
      background: url('../../assets/logo.png') no-repeat 100% / 100%;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }

  .title-bar-btns {
    display: flex;
    -webkit-app-region: no-drag;
    .title-bar-btn {
      width: 29px;
      height: 29px;
      font-size: 12px;
      color: #999;
      font-family: "iconfont" !important;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s;
      &:hover {
        // color: #ebebeb;
        background-color: #ebebeb;
      }
    }
  }
}
</style>
