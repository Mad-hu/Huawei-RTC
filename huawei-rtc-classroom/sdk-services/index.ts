/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 15:31:15
 * @LastEditTime: 2021-09-30 15:40:47
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import {
    getRemote,
    getCurrentWindow,
    getScreen,
    getHRTCEngine,
    getBjySdk,
    getBrowserWindow,
    isElectron
} from './electron.service';
import {
    RemoteControlService,
    RemoteType,
    getBuildRemoteControlCompany
} from './remote-control.service';
import {
    getBuildRtcPlatform,
    getBuildRtcCompany,
    RtcService
} from './rtc.service';
import {
    getBuildRtmCompany,
    RtmService
} from './rtm.service';

export {
    getRemote,
    getCurrentWindow,
    getScreen,
    getHRTCEngine,
    getBjySdk,
    getBrowserWindow,
    isElectron,
    RemoteControlService,
    RemoteType,
    getBuildRemoteControlCompany,
    getBuildRtcPlatform,
    getBuildRtcCompany,
    RtcService,
    getBuildRtmCompany,
    RtmService
}