"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtmService = exports.getBuildRtmCompany = exports.RtcService = exports.getBuildRtcCompany = exports.getBuildRtcPlatform = exports.getBuildRemoteControlCompany = exports.RemoteType = exports.RemoteControlService = exports.isElectron = exports.getBrowserWindow = exports.getBjySdk = exports.getHRTCEngine = exports.getScreen = exports.getCurrentWindow = exports.getRemote = void 0;
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 15:31:15
 * @LastEditTime: 2021-09-30 15:40:47
 * @LastEditors: Yandong Hu
 * @Description:
 */
var electron_service_1 = require("./electron.service");
Object.defineProperty(exports, "getRemote", { enumerable: true, get: function () { return electron_service_1.getRemote; } });
Object.defineProperty(exports, "getCurrentWindow", { enumerable: true, get: function () { return electron_service_1.getCurrentWindow; } });
Object.defineProperty(exports, "getScreen", { enumerable: true, get: function () { return electron_service_1.getScreen; } });
Object.defineProperty(exports, "getHRTCEngine", { enumerable: true, get: function () { return electron_service_1.getHRTCEngine; } });
Object.defineProperty(exports, "getBjySdk", { enumerable: true, get: function () { return electron_service_1.getBjySdk; } });
Object.defineProperty(exports, "getBrowserWindow", { enumerable: true, get: function () { return electron_service_1.getBrowserWindow; } });
Object.defineProperty(exports, "isElectron", { enumerable: true, get: function () { return electron_service_1.isElectron; } });
var remote_control_service_1 = require("./remote-control.service");
Object.defineProperty(exports, "RemoteControlService", { enumerable: true, get: function () { return remote_control_service_1.RemoteControlService; } });
Object.defineProperty(exports, "RemoteType", { enumerable: true, get: function () { return remote_control_service_1.RemoteType; } });
Object.defineProperty(exports, "getBuildRemoteControlCompany", { enumerable: true, get: function () { return remote_control_service_1.getBuildRemoteControlCompany; } });
var rtc_service_1 = require("./rtc.service");
Object.defineProperty(exports, "getBuildRtcPlatform", { enumerable: true, get: function () { return rtc_service_1.getBuildRtcPlatform; } });
Object.defineProperty(exports, "getBuildRtcCompany", { enumerable: true, get: function () { return rtc_service_1.getBuildRtcCompany; } });
Object.defineProperty(exports, "RtcService", { enumerable: true, get: function () { return rtc_service_1.RtcService; } });
var rtm_service_1 = require("./rtm.service");
Object.defineProperty(exports, "getBuildRtmCompany", { enumerable: true, get: function () { return rtm_service_1.getBuildRtmCompany; } });
Object.defineProperty(exports, "RtmService", { enumerable: true, get: function () { return rtm_service_1.RtmService; } });
