<!--
 * @Description: button for change nick name
-->
<template>
  <div class="btn" @click="dialogVisible = true">改昵称</div>
  <el-dialog title="提示" v-model="dialogVisible" width="30%" center>
    <el-form :model="form" size="mini">
      <el-form-item label="nickName">
        <el-input placeholder="情输入一个新的用户昵称" v-model="form.nickName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSubmit"
        >确 定</el-button
      >
    </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
import { UserType } from "../../services/state-manager/classroom-state.service";
import {
  msgForChangeNickName
} from "../../services/classroom.service";
import { messageFloatWarning } from "../../services/message/message-float.service";

@Options({
  components: {},
})
export default class BtnNickName extends Vue {
  @Prop(Object) user!: UserType;
  dialogFlag: boolean = false;
  form: any = {
    nickName: ""
  }
  /**
   * 完善调用接口成功后发广播，通知其他人更改本地的信息展示
   */
  handleSubmit() {
   if(!this.form.nickName) {
     messageFloatWarning('请输入昵称！')
   }
    msgForChangeNickName(this.user.userId, this.form.nickName)
  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  height: 100%;
}
</style>
