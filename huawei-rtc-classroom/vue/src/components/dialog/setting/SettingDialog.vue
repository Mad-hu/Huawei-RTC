<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 13:47:55
 * @LastEditTime: 2021-11-11 20:20:13
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <el-dialog title="设置" v-model="dialogState.settingVisible" width="770px">
    <div class="scroll">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 常规设置
        <BaseSettingItem></BaseSettingItem>
         -->
        <!-- 视频设置 -->
        <el-collapse-item title="视频" name="2">
          <VideoSettingItem></VideoSettingItem>
          <div id="ddd"></div>
        </el-collapse-item>
        <!-- 音频设置 -->
        <el-collapse-item title="音频" name="3">
          <div>
            <AudioSettingItem></AudioSettingItem>
          </div>
        </el-collapse-item>
<!--
        <el-collapse-item title="聊天" name="4">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <el-collapse-item title="分组讨论" name="5">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <el-collapse-item title="共享屏幕" name="6">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <el-collapse-item title="录制" name="7">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <el-collapse-item title="统计信息" name="8">
          <div>
            开发中... ...
          </div>
        </el-collapse-item>
        <AboutSettingItem></AboutSettingItem> -->
      </el-collapse>
    </div>
    <div class="btns">
      <el-button type="success" @click="saveAction()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-property-decorator";
import { getSetting, setSetting } from "../../../services/setting/setting-service";
import { DialogState } from "../../../services/state-manager/dialog-state.service";
import { UserInfoState } from "../../../services/state-manager/user-state.service";

@Options({
  components: {},
})
export default class SettingDrawer extends Vue {

  dialogState = DialogState;
  activeNames = ref(["1", "2"]);
  mounted() {
  }
  handleChange(val: any) {
    console.log("collapse change:", val);
  }
  saveAction() {
    setSetting(UserInfoState.role, getSetting());
    this.dialogState.settingVisible = false;
  }
  cannleAction() {
    this.dialogState.settingVisible = false;
  }
}
</script>
<style lang="less" scoped>
.scroll {
  height: 400px;
  overflow-y: auto;
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
