<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-10-20 09:37:10
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-collapse-item title="常规" name="1">
    <div class="lists">
      <div class="item">
        <div class="left">
          <span>进入教室是否播放提示音</span>
        </div>
        <div class="right">
          <el-switch
            v-model="settingBase.intoClassAudio"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :before-change="() => baseSwitchChange('base', 1)"
          />
        </div>
      </div>
      <div class="item">
        <div class="left">
          <span>是否显示邀请连接</span>
        </div>
        <div class="right">
          <el-switch
            v-model="settingBase.inviteLinkVisible"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :before-change="() => baseSwitchChange('base', 2)"
          />
        </div>
      </div>

      <div class="item">
        <div class="left">
          <span>是否显示教室人员列表</span>
        </div>
        <div class="right">
          <el-switch
            v-model="settingBase.userListVisible"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :before-change="() => baseSwitchChange('base', 3)"
          />
        </div>
      </div>

    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { getSetting } from "../../../../services/setting/setting-service";
@Options({
  components: {},
})
export default class BaseSettingItem extends Vue {
  settingBase = getSetting().base;
  baseSwitchChange(settingItemName: string, changeState: boolean) {
    console.log('baseSwitchChange:', settingItemName, changeState);
    return true;
  }
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
