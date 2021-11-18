<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-11-17 14:06:12
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <title-bar></title-bar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isElectron, supportVersion } from "./services/common/electron.service";
import { TitleBarState } from "./services/state-manager/titlebar-state.service";
import { windowService } from "./services/window.service";
export default defineComponent({
  name: "App",
  created() {
    console.log('location.origin:', location.href);
    this.$store.dispatch("user/userStorage");
    // if(isElectron() && supportVersion('2.1.21')) {
    if(isElectron()) {
      if(!location.href.includes('video-list-window')) {
        windowService().show();
      }
      windowService().openDevTools();
    }else {
      TitleBarState.visible = false;
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
