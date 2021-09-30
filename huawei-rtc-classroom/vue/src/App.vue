<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-09-10 14:48:17
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "App",
    created() {
      this.$store.dispatch("user/userStorage");
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
  }
</style>
