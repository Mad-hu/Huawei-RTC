/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:17
 * @LastEditTime: 2021-09-30 15:38:00
 * @LastEditors: Yandong Hu
 * @Description: RTC 基础调用服务。
 */
import HRTCSDKWebService from "./hrtcsdk/hrtcsdk-web.service";
import HRTCSDKElectronService from "./hrtcsdk/hrtcsdk-electron.service";
import AgoraRTCSdkWebService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import AgoraRTCSdkElectronService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import { sdk_build_config } from "./build";
let rtcInstance: AgoraRTCSdkWebService | HRTCSDKWebService | HRTCSDKElectronService;
const getBuildRtcPlatform = () => {
  return sdk_build_config.rtc.platform;
}
const getBuildRtcCompany = () => {
  return sdk_build_config.rtc.company;
}

const RtcService = () => {
  if (rtcInstance) return rtcInstance;
  if (sdk_build_config.rtc.company == 'huawei') {
    if (sdk_build_config.rtc.platform == 'electron') {
      rtcInstance = new HRTCSDKElectronService();
    }
    if (sdk_build_config.rtc.platform == 'web') {
      rtcInstance = new HRTCSDKWebService();
    }
  }
  if (sdk_build_config.rtc.company == 'agora') {
    if (sdk_build_config.rtc.platform == 'electron') {
      rtcInstance = new AgoraRTCSdkElectronService();
    }
    if (sdk_build_config.rtc.platform == 'web') {
      rtcInstance = new AgoraRTCSdkWebService();
    }
  }
  return rtcInstance;
};

export {
  getBuildRtcPlatform,
  getBuildRtcCompany,
  RtcService
}