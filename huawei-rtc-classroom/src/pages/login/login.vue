<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-10 13:12:01
 * @LastEditTime: 2021-09-10 15:53:05
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="login-box">
    <p>登录</p>
    <el-input
      v-model="roomName"
      placeholder="请输入教室名"
      type="text"
    ></el-input>
    <el-input
      v-model="userName"
      placeholder="请输入姓名"
      type="text"
    ></el-input>
    <div class="role">
      <el-radio v-model="role" label="1">老师</el-radio>
      <el-radio v-model="role" label="2">学生</el-radio>
    </div>
    <el-button type="primary" size="small" @click="login">进入教室</el-button>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";
import { defineComponent } from "vue";
import { messageFloatError } from "../../services/message/message-float.service";
import { RoomNameState } from "../../services/state-manager/classroom-state.service";

export default defineComponent({
  name: "Login",
  data() {
    return {
      roomName: "",
      userName: "",
      role: "1"
    };
  },
  computed: {
    ...mapGetters("user", ["isLogin"]),
  },
  methods: {
    ...mapMutations("user", ["saveUserInfoToCookie"]),
    async login() {
      if(this.roomName == '' || this.userName == '') {
        messageFloatError('用户或教室不能为空')
        return;
      }
      RoomNameState.roomName = this.roomName;
      const userId = parseInt((Math.random() * 100000).toFixed(0));
      const data = { userName: this.userName, userId, role: this.role == '1' ? 'teacher': 'student' };
      console.log(data);
      this.saveUserInfoToCookie(data);
      this.$router.push("/classroom");
    }
  },
});
</script>

<style lang="less" scoped>
.el-radio {
  color: #fff;
}
a {
  color: #42b983;
}
.login-box {
  display: flex;
  width: 400px;
  height: 250px;
  margin: 150px auto 0;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
}
.role {
  color: #fff;
}
</style>
