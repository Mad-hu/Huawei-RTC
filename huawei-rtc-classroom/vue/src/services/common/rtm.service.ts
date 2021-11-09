/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:33
 * @LastEditTime: 2021-10-28 14:48:42
 * @LastEditors: Yandong Hu
 * @Description: RTM 基础调用服务
 */
import { Lazy } from "../../service-provider/lazy.service.provider";
import AgoraRTMSdkWebService from "./agora/sdk/rtm/agora-rtm-sdk-web.service";
import WangyiRTMSdkWebService from "./wangyi/sdk/rtm/wangyi-rtm-sdk-web.service";

const lazyAgoraRTMSdkWebService = new Lazy(() => {
  return new AgoraRTMSdkWebService();
});
const lazyWangyiRTMSdkWebService = new Lazy(() => {
  return new WangyiRTMSdkWebService();
});

/**
 * 信令消息主服务，获取实例
 * 切换rtm，直接更换厂商名称即可获取对应sdk，请确保切换前的sdk已被正确销毁。
 * @param {('wangyi' | 'agora')} [company='agora'] rtm厂商 'wangyi' | 'agora'
 * @return {*}
 */
const RtmService = (company: 'wangyi' | 'agora' = 'agora') => {
  if (company == 'wangyi') {
    return lazyWangyiRTMSdkWebService.instance;
  } else {
    return lazyAgoraRTMSdkWebService.instance;
  }
};
const releaseRtmSDK = () => {
  lazyAgoraRTMSdkWebService.release();
  lazyWangyiRTMSdkWebService.release();
}

export {
  RtmService,
  releaseRtmSDK
}
