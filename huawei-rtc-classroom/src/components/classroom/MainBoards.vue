<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-08-11 16:59:34
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="main-boards" id="board"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';

@Options({
  components: {
  },
})
export default class MainBoards extends Vue {
}
</script>

<style lang="less" scoped>
  .main-boards {
    height: calc(~"100vh - 188px");
    flex-grow: 1;
    overflow: hidden;
  }
</style>
