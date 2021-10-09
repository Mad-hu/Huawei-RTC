/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:33
 * @LastEditTime: 2021-10-09 16:18:13
 * @LastEditors: Yandong Hu
 * @Description: RTM 基础调用服务
 */
import AgoraRTMSdkWebService from "./agora/sdk/rtm/agora-rtm-sdk-web.service";
import { sdk_build_config } from "./build";
import WangyiRTMSdkWebService from "./wangyi/sdk/rtm/wangyi-rtm-sdk-web.service";
let rtmInstance: AgoraRTMSdkWebService | WangyiRTMSdkWebService;
const getBuildRtmCompany = () => {
  return sdk_build_config.rtm.company;
}
const RtmService = () => {
  if (rtmInstance) return rtmInstance;
  if (sdk_build_config.rtm.company == 'wangyi') {
    rtmInstance = new WangyiRTMSdkWebService();
  }

  if (sdk_build_config.rtm.company == 'agora') {
    rtmInstance = new AgoraRTMSdkWebService();
  }
  return rtmInstance;
};
export {
  getBuildRtmCompany,
  RtmService
}