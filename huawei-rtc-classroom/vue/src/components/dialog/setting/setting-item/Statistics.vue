<template>
    <div class="statistics">
        统计信息
        <el-tabs :stretch='true' v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="音频" name="video">
                <div class="contentbox">
                    <div class="content_line">
                        <div class="content_clu">统计项</div>
                        <div class="content_clu">发送</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">码率</div>
                        <div class="content_clu">{{localAudio.bitRate}}</div>
                    </div>                    
                    <div class="content_line">
                        <div class="content_clu">延迟(ms)</div>
                        <div class="content_clu">{{localAudio.delay}}</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">抖动量</div>
                        <div class="content_clu">{{localAudio.jitter}}</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">丢包数量</div>
                        <div class="content_clu">{{localAudio.packetLoss}}</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">音频采样率</div>
                        <div class="content_clu">{{localAudio.sampleRate}}</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="视频" name="second">
                <div class="contentbox">
                    <div class="content_line">
                        <div class="content_clu">统计项</div>
                        <div class="content_clu">发送</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">码率</div>
                        <div class="content_clu">{{localVideo.bitRate}}</div>
                    </div>                    
                    <div class="content_line">
                        <div class="content_clu">延迟(ms)</div>
                        <div class="content_clu">{{localVideo.delay}}</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">抖动量</div>
                        <div class="content_clu">{{localVideo.jitter}}</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">丢包数量</div>
                        <div class="content_clu">{{localVideo.packetLoss}}</div>
                    </div>
                    <div class="content_line">
                        <div class="content_clu">视频帧率</div>
                        <div class="content_clu">{{localVideo.frameRate}}</div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { networkQuality, audioStats, videoStats, } from '../../../../services/setting/setting-service';
export default defineComponent({
    name:'statistics',
    data() {
        return {
            level: 0,
            activeName:'video',
            localAudio:{

            },
            localVideo:{

            }
        }
    },
    created(){
        audioStats((res,a,b,c)=>{
            this.localAudio = res[0]
        })

        videoStats((res,a,b,c)=>{
            this.localVideo = res[0]
        })
    },
    unmounted(){
        console.log('unmounted')
    },
    computed: {

    },
    methods: {
        handleClick() {
            
        }
    },
})
</script>

<style scoped lang='scss'>
    .contentbox{
        .content_line{
            display: flex;
            .content_clu{
                flex: 1;
            }
        }
    }
</style>