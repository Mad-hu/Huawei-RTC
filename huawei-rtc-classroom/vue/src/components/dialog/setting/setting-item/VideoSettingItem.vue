<template>
    <div class="video-setting">
        <el-select v-model="deviceId" placeholder="Select">
            <el-option
            v-for="item in deviceList"
            :key="item.deviceId"
            :label="item.deviceName"
            :value="item.deviceId"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import { RTCDeviceInfo } from "../../../../services/common/abstract/rtc.abstract";
import { RTCEventType, HRTCDeviceState, HRTCDeviceType } from "../../../../services/common/abstract/rtc.abstract";

import { Options, Vue, Watch } from "vue-property-decorator";
import { RtcService } from '../../../../services/common/rtc.service';
@Options({
  components: {},
})
export default class VideoSettingItem extends Vue {

    deviceId: string = ''
    deviceList: Array<RTCDeviceInfo> = []
    mounted () {
        
        this.deviceId = RtcService().getCurrentVideoDevice()
        this.deviceList = RtcService().getVideoDevices();
        RtcService().on(RTCEventType.deviceStateChanged, (deviceId, deviceType, deviceState) => {
           switch (deviceType) {
               case HRTCDeviceType.HRTC_DEVTYPE_VIDEO_CAPTURE:
                    this.deviceList = RtcService().getVideoDevices();
                    this.deviceId = RtcService().getCurrentVideoDevice()
                    break;
           
               default:
                    break;
           }
        })

    }

    @Watch('deviceId')
    watchDeviceId(){
        RtcService().setVideoDevice(this.deviceId)
    }

}
</script>

<style scoped>
    .video-setting{
        text-align:left;
    }
</style>