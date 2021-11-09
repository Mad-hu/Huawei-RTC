/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:00
 * @LastEditTime: 2021-10-28 14:47:14
 * @LastEditors: Yandong Hu
 * @Description: 远程控制基础调用服务
 */

import { Lazy } from "../../service-provider/lazy.service.provider";
import BjyRemoteControlSDKService from "./bjysdk/bjysdk.service";
import { isElectron } from "./electron.service";
export enum RemoteType {
  'client',
  'remote'
}
const lazyBjyRemoteControlSDKService = new Lazy(() => {
  return new BjyRemoteControlSDKService();
});

/**
 * 远程控制主服务，获取实例
 *
 * @return {*}
 */
const RemoteControlService = () => {
  if (!isElectron()) {
    throw new Error('is not electron env, please change platform electron env!');
  }
  return lazyBjyRemoteControlSDKService.instance;
};

const releaseRemoteControlSDK = () => {
  lazyBjyRemoteControlSDKService.release();
}
export {
  RemoteControlService,
  releaseRemoteControlSDK
}
