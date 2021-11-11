<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-19 09:59:35
 * @LastEditTime: 2021-10-20 10:51:02
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-collapse-item title="关于" name="9">
    <h3>华为云RTC DEMO</h3>
    <div class="lists">
      <div class="item">
        <div class="left">
          <span>Ver:</span>
        </div>
        <div class="right">
          0.0.23
        </div>
      </div>
      <hr>
      <div class="item">
        <div class="left">
          <span>hrtc-electron-sdk:</span>
        </div>
        <div class="right">
          2.0.300
        </div>
      </div>
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {},
})
export default class AboutSettingItem extends Vue {

}
</script>
<style lang="less" scoped>
.lists {
  width: 500px;
  margin: 0 auto;
  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      span {
        color: #333;
      }
    }
    .right {

    }
  }
}
</style>
