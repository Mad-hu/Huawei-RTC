/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-06 14:37:34
 * @LastEditTime: 2021-10-13 14:00:51
 * @LastEditors: Yandong Hu
 * @Description:
 */
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
export const sdk_build_config: SDKBuildConfigType = {
  company: 'huawei',
  rtc: {
    company: 'huawei',
    platform: 'electron'
  },
  rtm: {
    company: 'agora'
  },
  remotecontrol: {
    company: 'bjy'
  }
};
