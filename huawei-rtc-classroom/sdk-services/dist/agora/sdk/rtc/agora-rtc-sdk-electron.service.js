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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-10-20 13:30:12
 * @LastEditors: Yandong Hu
 * @Description:
 */
var rtc_abstract_1 = require("../../../abstract/rtc.abstract");
var AgoraRTCSdkElectronService = /** @class */ (function (_super) {
    __extends(AgoraRTCSdkElectronService, _super);
    function AgoraRTCSdkElectronService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgoraRTCSdkElectronService.prototype.setRemoteSubStreamViewDisplayMode = function (userId, mode) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.getScreenSources = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.selectScreenShare = function (item) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.startScreenShare = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.stopScreenShare = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.startRenderRemoteScreenShare = function (userId, view) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.stopRenderRemoteScreenShare = function (userId) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.setLocalVideo = function (type) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.setLocalAudio = function (type) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.setLocalPreview = function (type) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.stopLocalPreviewAndClear = function (view) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.muteRemoteVideoStream = function (userId) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.renderRemoteVideoStreamType = function (userId, type) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.getUserLocalId = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.leaveRoom = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.setUserRole = function (roleType) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.sdkEvent = function () {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.init = function (appId, opt) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.joinRoom = function (roomId, userId, opts) {
        throw new Error("Method not implemented.");
    };
    AgoraRTCSdkElectronService.prototype.createLocalPreview = function (view, mode) {
        throw new Error("Method not implemented.");
    };
    return AgoraRTCSdkElectronService;
}(rtc_abstract_1.RTCBaseProvider));
exports.default = AgoraRTCSdkElectronService;
