/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 11:30:00
 * @LastEditTime: 2021-10-28 14:25:40
 * @LastEditors: Yandong Hu
 * @Description:
 */
import HRTCSDKWebService from "./hrtcsdk/hrtcsdk-web.service";
import HRTCSDKElectronService from "./hrtcsdk/hrtcsdk-electron.service";
import AgoraRTCSdkWebService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import AgoraRTCSdkElectronService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
import { isElectron } from "hrtc-sdk-services";
import { Lazy } from "../../service-provider/lazy.service.provider";

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

const RtcService = (company: 'huawei' | 'agora' = 'huawei', platform: 'electron' | 'web' = 'electron') => {
  if (company == 'huawei') {
    if (platform == 'electron') {
      if (!isElectron()) {
        throw new Error('is not electron env, please change platform by web!');
      }
      return lazyHRTCSDKElectronService.instance;
    } else {
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
