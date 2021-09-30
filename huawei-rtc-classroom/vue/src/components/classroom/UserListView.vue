<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-08-18 10:36:56
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="user-list" id="userlist">
    <div class="item" :key="item.userId" v-for="item in userListState">
      <div class="name">
        <div class="name-first">{{ item.userName && item.userName.substring(0, 1) }}</div>
        <span>{{ item.userName }}</span>
      </div>
      <div class="btns">
        <div
          :class="['btn', item.audio ? 'enable' : 'disable']"
          @click="audioAction(item)"
          title="音频"
        >
          {{ item.audio ? "&#xe882;" : "&#xe883;" }}
        </div>
        <div
          :class="['btn', item.video ? 'enable' : 'disable']"
          @click="videoAction(item)"
          title="视频"
        >
          {{ item.video ? "&#xe696;" : "&#xe69f;" }}
        </div>
        <div
          v-if="!item.isLocal"
          :class="['btn', item.control ? 'enable' : 'disable disable_stop']"
          @click="controlAction(item)"
          title="控制"
        >
          {{ item.control ? "&#xe625;" : "&#xe641;" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { muteAudio, muteVideo, sendControlStart, sendMuteAudio, sendMuteVideo } from "../../services/classroom.service";
import { loadingShow } from "../../services/loading.service";
import {
  ControlUserIdState,
  UserListState,
  UserType,
} from "../../services/state-manager/classroom-state.service";

@Options({
  components: {},
})
export default class UserListView extends Vue {
  userListState = UserListState.lists;
  audioAction(item: UserType) {
    item.audio = !item.audio;
    muteAudio(item);
    sendMuteAudio(`${item.userId}`, item.audio!);
  }
  videoAction(item: UserType) {
    item.video = !item.video;
    muteVideo(item);
    sendMuteVideo(`${item.userId}`, item.video!);
  }
  controlAction(item: UserType) {
    if(!item.control) return;
    ControlUserIdState.userId = `${item.userId}`;
    sendControlStart(`${item.userId}`);
    loadingShow('等待远端响应');
  }
}
</script>

<style lang="less" scoped>
.user-list {
  flex-grow: 1;
  background: #fff;
  .item {
    display: flex;
    height: 30px;
    color: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 2px 3px;
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
      .btn {
        font-family: "iconfont" !important;
        width: 35px;
        height: 23px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 2px;
        font-size: 16px;
      }
      .enable {
        background-color: #67c23a;
      }
      .disable {
        background-color: #f56c6c;
      }
      .disable_stop {
        cursor: not-allowed;
      }
    }
  }
}
</style>
