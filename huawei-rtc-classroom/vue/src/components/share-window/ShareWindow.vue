<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-09 20:16:20
 * @LastEditors: Yandong Hu
 * @Description: 屏幕共享窗口，显示一个外框，提示正在共享，上浮控制工具栏
    全局透明，只渲染这一个窗口
-->
<template>
  <div
    :class="['share-window', sharePause ? 'share-pause' : 'sharing']"
    id="share"
  >
    <ShareWindowTopBar></ShareWindowTopBar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import ShareWindowTopBar from "./ShareWindowTopBar.vue";

@Options({
  components: {
    ShareWindowTopBar,
  },
})
export default class ShareWindow extends Vue {
  sharePause = false;
}
</script>

<style lang="less" scoped>
.share-window {
  display: flex;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.sharing {
  border: 4px solid #4dc800;
}
.share-pause {
  border: 4px solid #ffc80f;
}
</style>
