"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtcService = exports.getBuildRtcCompany = exports.getBuildRtcPlatform = void 0;
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 11:30:00
 * @LastEditTime: 2021-10-20 13:28:14
 * @LastEditors: Yandong Hu
 * @Description:
 */
var hrtcsdk_web_service_1 = __importDefault(require("./hrtcsdk/hrtcsdk-web.service"));
var hrtcsdk_electron_service_1 = __importDefault(require("./hrtcsdk/hrtcsdk-electron.service"));
var agora_rtc_sdk_electron_service_1 = __importDefault(require("./agora/sdk/rtc/agora-rtc-sdk-electron.service"));
var agora_rtc_sdk_electron_service_2 = __importDefault(require("./agora/sdk/rtc/agora-rtc-sdk-electron.service"));
var build_1 = require("./build");
var rtcInstance;
var getBuildRtcPlatform = function () {
    return build_1.sdk_build_config.rtc.platform;
};
exports.getBuildRtcPlatform = getBuildRtcPlatform;
var getBuildRtcCompany = function () {
    return build_1.sdk_build_config.rtc.company;
};
exports.getBuildRtcCompany = getBuildRtcCompany;
var RtcService = function () {
    if (rtcInstance)
        return rtcInstance;
    if (build_1.sdk_build_config.rtc.company == 'huawei') {
        if (build_1.sdk_build_config.rtc.platform == 'electron') {
            rtcInstance = new hrtcsdk_electron_service_1.default();
        }
        if (build_1.sdk_build_config.rtc.platform == 'web') {
            rtcInstance = new hrtcsdk_web_service_1.default();
        }
    }
    if (build_1.sdk_build_config.rtc.company == 'agora') {
        if (build_1.sdk_build_config.rtc.platform == 'electron') {
            rtcInstance = new agora_rtc_sdk_electron_service_2.default();
        }
        if (build_1.sdk_build_config.rtc.platform == 'web') {
            rtcInstance = new agora_rtc_sdk_electron_service_1.default();
        }
    }
    return rtcInstance;
};
exports.RtcService = RtcService;
