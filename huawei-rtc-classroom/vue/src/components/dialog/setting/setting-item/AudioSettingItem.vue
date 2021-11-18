<template>
    <div class="audio-setting">
        <el-form  label-width="120px" label-position='left'>
            <div class="audip-setting-title">麦克风</div>
            <el-form-item label="麦克风列表：">
                <div class="font-content">
                    <el-select style="width:400px" v-model="audioRecordingDevicesId" placeholder="Select">
                        <el-option
                        v-for="item in audioRecordingDeviceList"
                        :key="item.deviceId"
                        :label="item.deviceName"
                        :value="item.deviceId"
                        >
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="输入级别：">
                <div class="font-content">
                    <div class="vlolume-progress">
                        <el-progress :percentage="localVolume" :show-text='false' />
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="音量：">
                <div class="font-content">
                    <div class="vlolume-progress">
                        <el-slider v-model="audioRecordingDeviceSound" @change='audioRecordingDeviceSoundChange'></el-slider>
                    </div>
                </div>
            </el-form-item>
            <div class="audip-setting-title">扬声器</div>
            <el-form-item label="扬声器列表：">
                <div class="font-content">
                    <el-select style="width:400px" v-model="audiodeviceId" placeholder="Select">
                        <el-option
                        v-for="item in audiodeviceList"
                        :key="item.deviceId"
                        :label="item.deviceName"
                        :value="item.deviceId"
                        >
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="音量：">
                <div class="font-content">
                    <div class="vlolume-progress">
                        <el-slider v-model="audioDeviceSound" @change='audioDeviceSoundChange'></el-slider>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { localVolumeChanged, getAudioPlaybackDevices, getCurrentAudioPlaybackDevice, getAudioRecordingDevices, getCurrentAudioRecordingDevice, adjustRecordingVolume, getAudioRecordingVolume, setAudioPlaybackVolume } from "../../../../services/setting/setting-service";
import { RTCDeviceInfo } from "../../../../services/common/abstract/rtc.abstract";

import { RTCEventType, HRTCDeviceType } from "../../../../services/common/abstract/rtc.abstract";

import { Options, Vue, Watch } from "vue-property-decorator";
import { RtcService } from '../../../../services/common/rtc.service';
export default class AudioSettingItem extends Vue{
    //扬声器信息
    audiodeviceId: string = ''
    audiodeviceList: RTCDeviceInfo[] = []
    audioDeviceSound: number = 100
    //音频采集器信息
    audioRecordingDevicesId: string = ''
    audioRecordingDeviceList: RTCDeviceInfo[] = []
    audioRecordingDeviceSound: number = 100
    localVolume: number = 0
    mounted(){
        this.initAudio()
        this.initAudioRecording()
    }
    initAudioRecording(){
        this.audioRecordingDeviceList = getAudioRecordingDevices()   
        this.audioRecordingDevicesId = getCurrentAudioRecordingDevice()
        this.audioRecordingDeviceSound = getAudioRecordingVolume()
    }

    initAudio(){
        this.audiodeviceList = getAudioPlaybackDevices()
        this.audiodeviceId = getCurrentAudioPlaybackDevice()
        RtcService().enableUserVolumeNotify(100)
        localVolumeChanged((volume,muted)=>{
            this.localVolume = volume
        })
    }
    audioRecordingDeviceSoundChange(val: number){
        adjustRecordingVolume(val)
    }
    audioDeviceSoundChange(val: number){
        setAudioPlaybackVolume(val)
    }
    @Watch('audiodeviceId')
    watchDeviceId(){
        RtcService().setAudioPlaybackDevice(this.audiodeviceId)
    }
    @Watch('audioRecordingDevicesId')
    watchAudioRecordingDevicesId(){
        RtcService().setAudioRecordingDevice(this.audioRecordingDevicesId)
    }

    
    
}
</script>

<style lang=scss scoped>
    .audip-setting-title{
        font-weight: 800;
        font-size: 16px;
        text-align: left;
    }
    .font-content{
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: left;
        height: 100%;
        .vlolume-progress{
            width: 100%;
        }
    }
</style>