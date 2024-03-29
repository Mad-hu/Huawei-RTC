"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtmService = exports.getBuildRtmCompany = void 0;
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 11:03:33
 * @LastEditTime: 2021-10-09 16:39:25
 * @LastEditors: Yandong Hu
 * @Description: RTM 基础调用服务
 */
var agora_rtm_sdk_web_service_1 = __importDefault(require("./agora/sdk/rtm/agora-rtm-sdk-web.service"));
var build_1 = require("./build");
var wangyi_rtm_sdk_web_service_1 = __importDefault(require("./wangyi/sdk/rtm/wangyi-rtm-sdk-web.service"));
var rtmInstance;
var getBuildRtmCompany = function () {
    return build_1.sdk_build_config.rtm.company;
};
exports.getBuildRtmCompany = getBuildRtmCompany;
var RtmService = function () {
    if (rtmInstance)
        return rtmInstance;
    if (build_1.sdk_build_config.rtm.company == 'wangyi') {
        rtmInstance = new wangyi_rtm_sdk_web_service_1.default();
    }
    if (build_1.sdk_build_config.rtm.company == 'agora') {
        rtmInstance = new agora_rtm_sdk_web_service_1.default();
    }
    return rtmInstance;
};
exports.RtmService = RtmService;
