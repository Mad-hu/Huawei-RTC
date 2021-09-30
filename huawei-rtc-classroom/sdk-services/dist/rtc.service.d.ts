import HRTCSDKWebService from "./hrtcsdk/hrtcsdk-web.service";
import HRTCSDKElectronService from "./hrtcsdk/hrtcsdk-electron.service";
import AgoraRTCSdkWebService from "./agora/sdk/rtc/agora-rtc-sdk-electron.service";
declare const getBuildRtcPlatform: () => string;
declare const getBuildRtcCompany: () => string;
declare const RtcService: () => HRTCSDKWebService | HRTCSDKElectronService | AgoraRTCSdkWebService;
export { getBuildRtcPlatform, getBuildRtcCompany, RtcService };
