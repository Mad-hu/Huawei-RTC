<!--
 * @Description: button for lock , only request
-->
<template>
<div class="next" @click="handlePrev">上一页</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";

@Options({
  components: {},
})
export default class BtnPrev extends Vue {
 handlePrev() {

 }
}
</script>

<style lang="less" scoped>
.next {
  position: absolute;
  left: 50px;
  top: 45%;
}
</style>
