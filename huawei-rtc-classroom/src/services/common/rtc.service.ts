/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:17
 * @LastEditTime: 2021-08-10 13:35:13
 * @LastEditors: Yandong Hu
 * @Description: RTC 基础调用服务。
 */


import HRTCSDKWebService from "./hrtcsdk/hrtcsdk-web.service";
import HRTCSDKElectronService from "./hrtcsdk/hrtcsdk-electron.service";
import AgoraRTCSdkWebService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import AgoraRTCSdkElectronService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import { sdk_build_config } from "./build";
import { RTCBaseProvider } from "./abstract/rtc.abstract";
let rtcTmp: RTCBaseProvider;
let rtcInstance: RTCBaseProvider;
export const getBuildRtcPlatform = () => {
  return sdk_build_config.rtc.platform;
}
export const getBuildRtcCompany = () => {
  return sdk_build_config.rtc.company;
}

export const RtcService = () => {
  if (rtcInstance) return rtcInstance;
  if (sdk_build_config.rtc.company == 'huawei') {
    if (sdk_build_config.rtc.platform == 'electron') {
      rtcTmp = new HRTCSDKElectronService();
    }
    if (sdk_build_config.rtc.platform == 'web') {
      rtcTmp = new HRTCSDKWebService();
    }
  }

  if (sdk_build_config.rtc.company == 'agora') {
    if (sdk_build_config.rtc.platform == 'electron') {
      rtcTmp = new AgoraRTCSdkElectronService();
    }
    if (sdk_build_config.rtc.platform == 'web') {
      rtcTmp = new AgoraRTCSdkWebService();
    }
  }
  rtcInstance = rtcTmp;
  return rtcInstance;
};
