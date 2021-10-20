import BjyRemoteControlSDKService from "./bjysdk/bjysdk.service";
export declare enum RemoteType {
    'client' = 0,
    'remote' = 1
}
export declare const getBuildRemoteControlCompany: () => "bjy";
export declare const RemoteControlService: () => BjyRemoteControlSDKService;
