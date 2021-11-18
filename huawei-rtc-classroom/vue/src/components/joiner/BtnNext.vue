<!--
 * @Description: button for lock , only request
-->
<template>
<div class="next" @click="handleNext">下一页</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";

@Options({
  components: {},
})
export default class BtnNext extends Vue {
 handleNext() {

 }
}
</script>

<style lang="less" scoped>
.next {
  position: absolute;
  right: 50px;
  top: 45%;
}
</style>
