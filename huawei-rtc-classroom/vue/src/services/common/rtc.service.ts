/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 11:30:00
 * @LastEditTime: 2021-11-12 15:39:53
 * @LastEditors: Yandong Hu
 * @Description:
 */
import HRTCSDKWebService from "./hrtcsdk/hrtcsdk-web.service";
import HRTCSDKElectronService from "./hrtcsdk/hrtcsdk-electron.service";
import AgoraRTCSdkWebService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import AgoraRTCSdkElectronService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import { Lazy } from "../../service-provider/lazy.service.provider";
import { isElectron } from "./electron.service";

const lazyAgoraRTCSdkWebService = new Lazy(() => {
  return new AgoraRTCSdkWebService();
});
const lazyAgoraRTCSdkElectronService = new Lazy(() => {
  return new AgoraRTCSdkElectronService();
});
const lazyHRTCSDKElectronService = new Lazy(() => {
  return new HRTCSDKElectronService();
});
const lazyHRTCSDKWebService = new Lazy(() => {
  return new HRTCSDKWebService();
});

/**
 * rtc主服务，获取RTC实例
 * 切换rtc，直接更换厂商和平台名称即可获取对应sdk，请确保切换前的sdk已被正确销毁。
 * @param {('huawei' | 'agora')} [company='huawei'] rtc厂商  'huawei' | 'agora'
 * @param {('electron' | 'web')} [platform='electron'] rtc平台 'electron' | 'web'
 * @return {*}
 */
const RtcService = (company: 'huawei' | 'agora' = 'huawei', platform: 'electron' | 'web' = 'electron') => {
  if (company == 'huawei') {
    if (platform == 'electron') {
      if (!isElectron()) {
        throw new Error('is not electron env, please change platform by web!');
      }
      return lazyHRTCSDKElectronService.instance;
    } else {
      console.log('华为华为')

      return lazyHRTCSDKWebService.instance;
    }
  } else {
    if (platform == 'electron') {
      if (!isElectron()) {
        throw new Error('is not electron env, please change platform by web!');
      }
      return lazyAgoraRTCSdkElectronService.instance;
    } else {
      return lazyAgoraRTCSdkWebService.instance;
    }
  }
};

const releaseRtcSDK = () => {
  lazyAgoraRTCSdkWebService.release();
  lazyAgoraRTCSdkElectronService.release();
  lazyHRTCSDKElectronService.release();
  lazyHRTCSDKWebService.release();
}
export {
  RtcService,
  releaseRtcSDK
}
