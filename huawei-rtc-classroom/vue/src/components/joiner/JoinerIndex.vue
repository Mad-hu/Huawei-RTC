<!--
 * @Description: joiners show , one joiner
-->
<template>
  <div class="index" :class="wh">
    <div class="stu-item" :class="wh" :key="item.userId" v-for="item in lists" v-show="checkHas(item.userId)">
      <div class="stu-render" :id="`${prefix}${item.userId}`"></div>
      <div class="close" v-if="item.video == 0"></div>
      <div class="stu-info-con" :class="item.video == 0 ? 'center' : ''">
        <div class="name">{{ item.userName }}</div>
        <div class="userId">{{ item.userId }}</div>
      </div>
      <div class="audio-wrapper">
        <btn-audio :user="item"></btn-audio>
      </div>
      <!-- 1. 学生对 其他学生 不显示操作按钮 -->
      <!-- 2. 学生对老师，可以请求屏幕共享和 远程控制 -->
      <div
        class="btns-wrapper"
        v-if="
          !(checkLocalUserStudent && !item.isLocal && checkStudent(item.power))
        "
      >
        <user-item-buttons :user="item"></user-item-buttons>
      </div>
    </div>
  </div>
  <btn-prev v-if="pageNo > 1" @click="handlePrev"></btn-prev>
  <btn-next v-if="pageNo < maxPageNo" @click="handleNext"></btn-next>
</template>

<script lang="ts">
import { mixins, Options, Watch } from "vue-property-decorator";
import joinerMixins from "../../mixins/joinerMixins";
import BtnAudio from "../status/BtnAudio.vue";
import MuteAudio from "../options/MuteAudio.vue";
import { UserListState } from "../../services/state-manager/classroom-state.service";
import { POWER_TYPE } from "../../services/common/abstract/rtm.abstract";
import UserItemButtons from "@/components/options/UserItemButtons.vue";
import BtnPrev from "./BtnNext.vue";
import BtnNext from "./BtnPrev.vue";
import { RtcService } from "../../services/common/rtc.service";
@Options({
  components: {
    BtnAudio,
    MuteAudio,
    UserItemButtons,
    BtnPrev,
    BtnNext,
  },
})
export default class JoinerIndex extends mixins(joinerMixins) {
  prefix: string = "joiner_one";
  pageNo: number = 1;
  pageSize: number = 9;
  get wh() {
    const len = UserListState.lists.length;
    if (len < 2) {
      return "one";
    } else if (len == 2) {
      return "two";
    } else if (len == 3 || len == 4) {
      return "three";
    } else {
      return "others";
    }
  }
  get maxPageNo() {
    return Math.ceil(this.lists.length / this.pageSize)
  }

  get users() {
    return this.lists.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageSize * this.pageNo
      ).map((item:any) => item.userId)
  }

  @Watch('users')
  onUsersChange(newV: any,oldV:any) {
    if(newV!=oldV) {
        newV.forEach((item: any) => {
          RtcService().muteRemoteVideoStream(item, false);
        })
        oldV.forEach((item: any) => {
          RtcService().muteRemoteVideoStream(item, true);
        })
    }
  }

  checkHas(userId: number) {
    return this.users.includes(userId)
  }

  handlePrev() {
    this.pageNo = this.pageNo -1
  }
  handleNext() {
    this.pageNo = this.pageNo+1
  }
  checkStudent(power: number) {
    return power == POWER_TYPE.STUDENT;
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  overflow: auto;
  &.one {
    height: 100%;
  }
  .stu-item {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    overflow: hidden;
    border: 2px solid #f0f0f0;
    box-sizing: border-box;
    &.two {
      width: 480px;
      height: 270px;
    }
    &.three {
      width: 400px;
      height: 230px;
    }
    &.others {
      width: 288px;
      height: 162px;
    }
    .stu-render {
      width: 100%;
      height: 100%;
    }
    .close {
      position: absolute;
      background-color: #000;
      width: 100%;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .stu-info-con {
      position: absolute;
      bottom: 7px;
      left: 17px;
      display: flex;
      flex-direction: row;
      &.center {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .name {
        background: rgba(0, 0, 0, 0.4);
        padding: 2px 4px;
      }
      .userId {
        background: rgba(0, 0, 0, 0.4);
        padding: 2px 4px;
      }
    }
    .btns-wrapper {
      display: none;
    }
    .audio-wrapper {
      position: absolute;
      left: 0;
      bottom: 8px;
    }
    &:hover {
      .btns-wrapper {
        display: block;
        position: absolute;
        right: 5px;
        top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .mr5 {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>

