"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-10-20 13:30:17
 * @LastEditors: Yandong Hu
 * @Description:
 */
var rtc_abstract_1 = require("../../../abstract/rtc.abstract");
// import AgoraRTC, { ClientConfig, IAgoraRTCClient, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
// const agora_rtc_appId = import.meta.env.VITE_AGORA_RTC_APPID;
// let shareTrack: any;
// let rtcClient!: IAgoraRTCClient;
// let userJoinId = 0;
var AgoraRCMSdkWebService = /** @class */ (function (_super) {
    __extends(AgoraRCMSdkWebService, _super);
    function AgoraRCMSdkWebService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgoraRCMSdkWebService.prototype.setRemoteSubStreamViewDisplayMode = function (userId, mode) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.getScreenSources = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.selectScreenShare = function (item) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.startScreenShare = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.stopScreenShare = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.startRenderRemoteScreenShare = function (userId, view) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.stopRenderRemoteScreenShare = function (userId) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.setLocalVideo = function (type) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.setLocalAudio = function (type) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.muteRemoteVideoStream = function (userId) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.renderRemoteVideoStreamType = function (userId, type) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.setLocalPreview = function (type) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.stopLocalPreviewAndClear = function (view) {
        throw new Error("Method not implemented.");
    };
    // id_random = parseInt((Math.random() * 10000).toFixed(0));
    AgoraRCMSdkWebService.prototype.getUserLocalId = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.leaveRoom = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.setUserRole = function (roleType) {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.sdkEvent = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRCMSdkWebService.prototype.init = function (appId, opt) {
        // const clientConfig: ClientConfig = { mode: 'rtc', codec: 'vp8' };
        // rtcClient = AgoraRTC.createClient(clientConfig);
    };
    AgoraRCMSdkWebService.prototype.joinRoom = function (roomId, userId, opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AgoraRCMSdkWebService.prototype.createLocalPreview = function (view, mode) {
        throw new Error("Method not implemented.");
    };
    return AgoraRCMSdkWebService;
}(rtc_abstract_1.RTCBaseProvider));
exports.default = AgoraRCMSdkWebService;
