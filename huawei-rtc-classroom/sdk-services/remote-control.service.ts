/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:00
 * @LastEditTime: 2021-09-30 15:42:48
 * @LastEditors: Yandong Hu
 * @Description: 远程控制基础调用服务
 */

import BjyRemoteControlSDKService from "./bjysdk/bjysdk.service";
import { sdk_build_config } from "./build";
import { isElectron } from "./electron.service";
let remoteControlInstance: BjyRemoteControlSDKService;
enum RemoteType {
  'client',
  'remote'
}
const getBuildRemoteControlCompany = () => {
  return sdk_build_config.remotecontrol.company;
}
const RemoteControlService = () => {
  if (!isElectron()) {
    throw new Error('is not electron env, please change platform electron env!');
  }
  if (remoteControlInstance) return remoteControlInstance;
  if (sdk_build_config.remotecontrol.company == 'bjy') {
    remoteControlInstance = new BjyRemoteControlSDKService();
  }
  return remoteControlInstance;
};
export {
  RemoteControlService,
  RemoteType,
  getBuildRemoteControlCompany
}