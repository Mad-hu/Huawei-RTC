<!--
 * @Description: button for change nick name
-->
<template>
  <el-dialog title="提示" v-model="dialogVisible" width="30%" center>
    <el-form :model="form" size="mini">
      <el-form-item label="昵称">
        <el-input placeholder="情输入一个新的用户昵称" v-model="form.nickName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit"
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
  msgForChangeNickName, updateUserInfo
} from "../../services/classroom.service";
import { messageFloatWarning } from "../../services/message/message-float.service";

@Options({
  components: {},
})
export default class BtnNickNameDialog extends Vue {
  @Prop(Object) user!: UserType;
  form: any = {
    nickName: ""
  }
  dialogVisible:boolean = false
  /**
   * 完善调用接口成功后发广播，通知其他人更改本地的信息展示
   */
  handleSubmit() {
   if(!this.form.nickName) {
     messageFloatWarning('请输入昵称！')
   }
   updateUserInfo(this.user.userId, 'userName',this.form.nickName)
    msgForChangeNickName(this.user.userId, this.form.nickName)
    this.dialogVisible= false

  }
}
</script>

<style lang="less" scoped>
.btn {
  width: 100%;
  height: 100%;
}
</style>
