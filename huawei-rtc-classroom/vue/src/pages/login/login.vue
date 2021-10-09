<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-10 13:12:01
 * @LastEditTime: 2021-10-09 14:35:53
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
import { UserInfoState } from "../../services/state-manager/user-state.service";
import { loadingHide, loadingShow } from "../../services/loading.service";

export default defineComponent({
  name: "Login",
  data() {
    return {
      roomName: "",
      userName: "",
      role: "1",
    };
  },
  computed: {},
  methods: {
    login() {
      try {
        if (this.roomName == "" || this.userName == "") {
          messageFloatError("用户或教室不能为空");
          return;
        }
        loadingShow("loading...");
        RoomNameState.roomName = this.roomName;
        const userId = parseInt((Math.random() * 100000).toFixed(0));
        UserInfoState.userName = this.userName;
        UserInfoState.userId = userId;
        UserInfoState.role = this.role == "1" ? "teacher" : "student";
        console.log("UserInfoState:", UserInfoState);
        setTimeout(() => {
          this.$router.push("/classroom");
        }, 1000);
      } catch (error) {}
    },
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
