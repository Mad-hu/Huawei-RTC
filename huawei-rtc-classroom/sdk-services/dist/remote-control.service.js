"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:00
 * @LastEditTime: 2021-09-30 15:42:48
 * @LastEditors: Yandong Hu
 * @Description: 远程控制基础调用服务
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildRemoteControlCompany = exports.RemoteType = exports.RemoteControlService = void 0;
var bjysdk_service_1 = __importDefault(require("./bjysdk/bjysdk.service"));
var build_1 = require("./build");
var electron_service_1 = require("./electron.service");
var remoteControlInstance;
var RemoteType;
(function (RemoteType) {
    RemoteType[RemoteType["client"] = 0] = "client";
    RemoteType[RemoteType["remote"] = 1] = "remote";
})(RemoteType || (RemoteType = {}));
exports.RemoteType = RemoteType;
var getBuildRemoteControlCompany = function () {
    return build_1.sdk_build_config.remotecontrol.company;
};
exports.getBuildRemoteControlCompany = getBuildRemoteControlCompany;
var RemoteControlService = function () {
    if (!(0, electron_service_1.isElectron)()) {
        throw new Error('is not electron env, please change platform electron env!');
    }
    if (remoteControlInstance)
        return remoteControlInstance;
    if (build_1.sdk_build_config.remotecontrol.company == 'bjy') {
        remoteControlInstance = new bjysdk_service_1.default();
    }
    return remoteControlInstance;
};
exports.RemoteControlService = RemoteControlService;
