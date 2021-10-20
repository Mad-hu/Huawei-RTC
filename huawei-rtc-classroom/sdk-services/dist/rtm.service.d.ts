import AgoraRTMSdkWebService from "./agora/sdk/rtm/agora-rtm-sdk-web.service";
import WangyiRTMSdkWebService from "./wangyi/sdk/rtm/wangyi-rtm-sdk-web.service";
export declare const getBuildRtmCompany: () => "agora" | "wangyi";
export declare const RtmService: () => AgoraRTMSdkWebService | WangyiRTMSdkWebService;
