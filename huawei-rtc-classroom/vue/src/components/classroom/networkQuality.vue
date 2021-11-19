<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-18 11:06:10
 * @LastEditTime: 2021-11-19 09:25:23
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
    <div class="netWorkQualityIcon">
        <img v-show="getWifiStatus == 'good'" src="@/assets/classroom/icons/wifi/ic_wifi_1.png" alt="">
        <img v-show="getWifiStatus == 'ok'" src="@/assets/classroom/icons/wifi/ic_wifi_2.png" alt="">
        <img v-show="getWifiStatus == 'bad'" src="@/assets/classroom/icons/wifi/ic_wifi_3.png" alt="">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { networkQuality } from '../../services/setting/setting-service';
export default defineComponent({
    name:'netWorkQualityIcon',
    data() {
        return {
            level: 0
        }
    },
    created(){
        networkQuality((testResult)=>{
            if(testResult[0]){
                this.level = testResult[0]['level']
            }
        })

    },
    computed: {
        getWifiStatus(){
            //level 0-未知，1-极好，2-好，3-差一些，4-差，5-特别差
            switch (this.level) {
                case 1:
                case 2:
                    return 'good'
                case 3:
                case 4:
                    return 'ok'
                case 5:
                    return 'bad'
                default:
                    return  'unknow'
                    break;
            }
        },
    },
})
</script>

<style scoped>

</style>
