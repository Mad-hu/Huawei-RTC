<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-10 13:12:01
 * @LastEditTime: 2021-11-18 10:29:09
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="login">
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
        <el-radio v-model="role" label="teacher">老师</el-radio>
        <el-radio v-model="role" label="student">学生</el-radio>
        <el-radio v-model="role" label="audience">访客</el-radio>
      </div>
      <el-button type="primary" size="small" @click="login">进入教室</el-button>
    </div>
  </div>
  <div class="version">{{version}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { messageFloatError } from "../../services/message/message-float.service";
import { roomInfo } from "../../services/state-manager/classroom-state.service";
import {
  UserInfoState,
  UserRole,
} from "../../services/state-manager/user-state.service";
import { loadingShow } from "../../services/loading.service";
import { buildVersion } from "../../services/version.service";

export default defineComponent({
  name: "Login",
  data() {
    return {
      roomName: "",
      userName: "",
      role: UserRole.teacher,
      version: buildVersion,
    };
  },
  computed: {},
  methods: {
    login() {
      try {
        this.roomName = this.roomName || "q";
        this.userName = this.userName || "11";
        if (this.roomName == "" || this.userName == "") {
          messageFloatError("用户或教室不能为空");
          return;
        }
        loadingShow("loading...");
        roomInfo.roomName = this.roomName;
        const userId = parseInt((Math.random() * 100000).toFixed(0));
        UserInfoState.userName = this.userName;
        UserInfoState.userId = userId;
        UserInfoState.role = this.role;
        console.log("UserInfoState:", UserInfoState);
        this.$router.push("/classroom");
      } catch (error) {}
    },
  },
});
</script>

<style lang="less" scoped>
.version {
  position: absolute;
  bottom: 3px;
  right: 5px;
}
.login {
  background: linear-gradient(
    200.96deg,
    #fedc2a -29.09%,
    #dd5789 51.77%,
    #7a2c9e 129.35%
  );
  height: 100%;
}
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
