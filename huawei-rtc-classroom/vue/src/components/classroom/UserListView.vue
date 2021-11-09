<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-10-19 12:10:21
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="user-list" id="userlist">
    <div class="item" :key="item.userId" v-for="item in userListState">
      <div class="name">
        <div class="name-first">
          {{ item.userName && item.userName.substring(0, 1) }}
        </div>
        <span>{{ item.userName }}</span>
      </div>
      <div class="btns">
        <!--
        <div
          v-if="!item.isLocal"
          :class="['btn', item.control ? 'enable' : 'disable disable_stop']"
          @click="controlAction(item)"
          title="控制"
        >
          {{ item.control ? "&#xe625;" : "&#xe641;" }}
        </div> -->
        <btn-video :user="item"></btn-video>
        <btn-audio :user="item"></btn-audio>
      </div>
      <div class="btns-wrapper">
        <user-item-buttons  :user="item"></user-item-buttons>
      </div>
    </div>
    <btn-tabs></btn-tabs>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import {
  sendControlStart
} from "../../services/classroom.service";
import { loadingShow } from "../../services/loading.service";
import {
  ControlUserIdState,
  UserListState,
  UserType,
} from "../../services/state-manager/classroom-state.service";
import BtnAudio from "@/components/status/BtnAudio.vue";
import BtnVideo from "@/components/status/BtnVideo.vue";
import UserItemButtons from "@/components/options/UserItemButtons.vue";
import BtnTabs from "@/components/options/BtnTabs.vue"
import { ON_OFF } from "../../services/common/abstract/rtm.abstract";
@Options({
  components: { BtnAudio, BtnVideo, UserItemButtons,BtnTabs },
})
export default class UserListView extends Vue {
  userListState = UserListState.lists;
  controlAction(item: UserType) {
    if (!item.control) return;
    ControlUserIdState.userId = `${item.userId}`;
    sendControlStart(`${item.userId}`);
    loadingShow("等待远端响应");
  }
}
</script>

<style lang="less" scoped>
.user-list {
  flex-grow: 1;
  background: #fff;
  position: relative;
  .item {
    position: relative;
    display: flex;
    height: 30px;
    color: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 2px 3px;
    &:hover {
      .btns-wrapper {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }
    }
    .btns-wrapper {
      display: none;
    }
    .name {
      min-width: 140px;
      text-align: start;
      color: #000;
      display: flex;
      align-items: center;
      max-width: 200px;
      position: relative;
      .name-first {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #ff9933;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-right: 5px;
        position: absolute;
      }
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 29px;
      }
    }
    .btns {
      display: flex;
      // .btn {
      //   font-family: "iconfont" !important;
      //   width: 35px;
      //   height: 23px;
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   border-radius: 5px;
      //   cursor: pointer;
      //   margin: 0 2px;
      //   font-size: 16px;
      // }
      // .enable {
      //   background-color: #67c23a;
      // }
      // .disable {
      //   background-color: #f56c6c;
      // }
      // .disable_stop {
      //   cursor: not-allowed;
      // }
    }
  }
}
</style>
