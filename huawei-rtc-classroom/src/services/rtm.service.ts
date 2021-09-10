/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:33
 * @LastEditTime: 2021-08-10 13:38:25
 * @LastEditors: Yandong Hu
 * @Description: RTM 基础调用服务
 */
import { RTMBaseProvider } from "./abstract/rtm.abstract";
import AgoraRTMSdkWebService from "./agora/sdk/rtm/agora-rtm-sdk-web.service";
import { sdk_build_config } from "./build";
import WangyiRTMSdkWebService from "./wangyi/sdk/rtm/wangyi-rtm-sdk-web.service";

let rtmTmp: RTMBaseProvider;
let rtmInstance: RTMBaseProvider;


export const getBuildRtmCompany = () => {
  return sdk_build_config.rtm.company;
}


export const RtmService = () => {
  if (rtmInstance) return rtmInstance;
  if (sdk_build_config.rtm.company == 'wangyi') {
    rtmTmp = new WangyiRTMSdkWebService();
  }

  if (sdk_build_config.rtm.company == 'agora') {
    rtmTmp = new AgoraRTMSdkWebService();
  }
  rtmInstance = rtmTmp;
  return rtmInstance;
};
