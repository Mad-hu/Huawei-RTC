<template>
    <div class="set-video">
      555555saas
          <div id="ddd" style="width:335px;height:190px">
            
          </div>
      5255
    </div>
</template>

<script>
import { RtcService } from '../../services/common/rtc.service';
import { Vue } from "vue-property-decorator";

const VITE_HUAWEI_RTC_APPID = import.meta.env.VITE_HUAWEI_RTC_APPID;
const VITE_HUAWEI_DOMAIN = import.meta.env.VITE_HUAWEI_DOMAIN;
export default class SettingVideo extends Vue {
  mounted () {
    // RtcService().init(VITE_HUAWEI_RTC_APPID, { domain: VITE_HUAWEI_DOMAIN });

    // setTimeout(() => {
    let div = document.getElementById('ddd')
    // let a = RtcService().renderLocalVideo(div,1)
    //  RtcService().startPreview()
    // console.log(a)
    setTimeout(() => {
      RtcService().setVideoDevice("1520656981")
    }, 5000);
      
    console.log(RtcService().getVideoDevices() )
    // }, 5000);


  }
}
</script>

<style lang='scss'>
  .set-video{
    #set-video-pre{
      width: 640px;
      height: 360px;
    }
  }
</style>