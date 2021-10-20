"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 15:47:27
 * @LastEditTime: 2021-10-20 13:30:40
 * @LastEditors: Yandong Hu
 * @Description: 华为云 web rtc sdk
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var rtc_abstract_1 = require("../abstract/rtc.abstract");
var HRTCSDKWebService = /** @class */ (function (_super) {
    __extends(HRTCSDKWebService, _super);
    function HRTCSDKWebService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HRTCSDKWebService.prototype.setRemoteSubStreamViewDisplayMode = function (userId, mode) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.getScreenSources = function () {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.selectScreenShare = function (item) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.startScreenShare = function () {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.stopScreenShare = function () {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.startRenderRemoteScreenShare = function (userId, view) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.stopRenderRemoteScreenShare = function (userId) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.setLocalVideo = function (type) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.setLocalAudio = function (type) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.setLocalPreview = function (type) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.stopLocalPreviewAndClear = function (view) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.muteRemoteVideoStream = function (userId) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.renderRemoteVideoStreamType = function (userId, type) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.getUserLocalId = function () {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.leaveRoom = function () {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.setUserRole = function (roleType) {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.sdkEvent = function () {
        throw new Error("Method not implemented.");
    };
    HRTCSDKWebService.prototype.init = function (appId, opt) {
    };
    HRTCSDKWebService.prototype.joinRoom = function (roomId, userId, opts) {
    };
    HRTCSDKWebService.prototype.createLocalPreview = function (view, mode) {
    };
    return HRTCSDKWebService;
}(rtc_abstract_1.RTCBaseProvider));
exports.default = HRTCSDKWebService;
