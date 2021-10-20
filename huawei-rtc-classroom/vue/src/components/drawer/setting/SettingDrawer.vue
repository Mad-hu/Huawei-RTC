<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-10-20 11:35:40
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-drawer v-model="visible" :with-header="false" size="100%">
    <div class="scroll">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 常规设置 -->
        <BaseSettingItem></BaseSettingItem>

        <!-- 视频设置 -->
        <el-collapse-item title="视频" name="2">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 音频设置 -->
        <el-collapse-item title="音频" name="3">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 聊天 -->
        <el-collapse-item title="聊天" name="4">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 分组讨论 -->
        <el-collapse-item title="分组讨论" name="5">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 共享屏幕 -->
        <el-collapse-item title="共享屏幕" name="6">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 录制 -->
        <el-collapse-item title="录制" name="7">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 统计信息 -->
        <el-collapse-item title="统计信息" name="8">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <!-- 关于 -->
        <AboutSettingItem></AboutSettingItem>
      </el-collapse>
    </div>
    <div class="btns">
      <el-button type="success" @click="saveAction()">保存</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-property-decorator";
import { getSetting, setSetting } from "../../../services/setting/setting-service";
import { UserInfoState } from "../../../services/state-manager/user-state.service";
@Options({
  components: {},
})
export default class SettingDrawer extends Vue {

  visible = false;
  activeNames = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  mounted() {
  }
  handleChange(val: any) {
    console.log("collapse change:", val);
  }
  saveAction() {
    setSetting(UserInfoState.role, getSetting());
    this.visible = false;
  }
  cannleAction() {
    this.visible = false;
  }
}
</script>
<style lang="less" scoped>
.scroll {
  overflow-y: auto;
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 75px;
  top: 15px;
}
.btns {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 15px;
  right: 30px;
}
</style>
