<!--
 * @Description: joiners show , one joiner
-->
<template>
  <div class="index">
    <div class="stu-item" :key="item.userId" v-for="item in lists">
      <div class="stu-render" :id="`${prefix}${item.userId}`"></div>
      <div class="close" v-if="item.video == 0"></div>
      <div class="stu-info-con" :class="item.video == 0 ? 'center' : ''">
        <div class="name">{{ item.userName }}</div>
        <div class="userId">{{ item.userId }}</div>
      </div>
      <div class="audio-wrapper">
        <btn-audio :user="item"></btn-audio>
      </div>
      <div class="btns-wrapper">
        <el-button size="mini" type="primary" class="mr5"
          ><mute-audio :user="item"></mute-audio
        ></el-button>
        <joiner-buttons :user="item"></joiner-buttons>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from "vue-property-decorator";
import joinerMixins from "../../mixins/joinerMixins";
import BtnAudio from "../status/BtnAudio.vue"
@Options({
  components: {
    BtnAudio
  },
})
export default class JoinerThreeOrFour extends mixins(joinerMixins) {
  prefix: string = "joiner_one";
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;

  .stu-item {
    position: relative;
    width: 400px;
    height: 230px;
    color: #fff;
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
