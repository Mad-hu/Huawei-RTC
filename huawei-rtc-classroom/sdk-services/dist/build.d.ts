interface SDKBuildConfigType {
    company: 'huawei';
    rtc: {
        company: 'huawei' | 'agora';
        platform: 'electron' | 'web' | 'react native';
    };
    rtm: {
        company: 'wangyi' | 'agora';
    };
    remotecontrol: {
        company: 'bjy';
    };
}
export declare const sdk_build_config: SDKBuildConfigType;
export {};
