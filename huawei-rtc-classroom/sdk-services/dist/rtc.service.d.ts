import HRTCSDKWebService from "./hrtcsdk/hrtcsdk-web.service";
import HRTCSDKElectronService from "./hrtcsdk/hrtcsdk-electron.service";
import AgoraRTCSdkWebService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
declare const getBuildRtcPlatform: () => "electron" | "web" | "react native";
declare const getBuildRtcCompany: () => "huawei" | "agora";
declare const RtcService: () => HRTCSDKWebService | HRTCSDKElectronService | AgoraRTCSdkWebService;
export { getBuildRtcPlatform, getBuildRtcCompany, RtcService };
