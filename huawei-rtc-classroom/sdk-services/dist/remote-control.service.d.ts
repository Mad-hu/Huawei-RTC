import BjyRemoteControlSDKService from "./bjysdk/bjysdk.service";
declare enum RemoteType {
    'client' = 0,
    'remote' = 1
}
declare const getBuildRemoteControlCompany: () => string;
declare const RemoteControlService: () => BjyRemoteControlSDKService;
export { RemoteControlService, RemoteType, getBuildRemoteControlCompany };
