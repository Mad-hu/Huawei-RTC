"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 10:46:37
 * @LastEditTime: 2021-10-20 11:36:17
 * @LastEditors: Yandong Hu
 * @Description: 华为云RTC Electron SDK
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var rtc_abstract_1 = require("../abstract/rtc.abstract");
var electron_service_1 = require("../electron.service");
var engine;
var sdkinit = false;
var userJoinId = 0;
var HRTCSDKElectronService = /** @class */ (function (_super) {
    __extends(HRTCSDKElectronService, _super);
    function HRTCSDKElectronService() {
        var _this = _super.call(this) || this;
        _this.id_random = parseInt((Math.random() * 10000).toFixed(0));
        if (!(0, electron_service_1.isElectron)()) {
            throw new Error('is not electron env, please build config by web');
        }
        engine = new ((0, electron_service_1.getHRTCEngine)())();
        if (!engine) {
            throw new Error('native engine module is not found.');
        }
        _this.sdkEvent();
        return _this;
    }
    HRTCSDKElectronService.prototype.init = function (appId, opt) {
        if (sdkinit) {
            console.warn('rtc is already init.');
            return;
        }
        var id = appId;
        var domain = opt.domain;
        // engine.setLogParam(true, {
        //   level: 3,
        //   path: process.platform === "darwin" ? "/tmp/rtcLog" : "rtclog"
        // });
        console.log('hrtc verison: ', engine.getVersion());
        engine.initialize(id, domain);
        engine.setExternalVideoFrameOutput(true, true, { format: 0, bufferType: 0 });
        engine.enableSmallVideoStream(true, { width: 320, height: 180, frameRate: 30, bitrate: 600, disableAdjustRes: true, streamType: 1 });
        engine.setPriorRemoteVideoStreamType(1);
        // 设置大流显示模式
        // engine.setVideoEncParam({streamType:3,width:1280,height:720,frameRate:15,bitrate:500,disableAjustRes: false});
        engine.setExternalDataFrameOutput(false, false);
        engine.setExternalVideoFrameOutput(false, false, {
            formate: 3,
            bufferType: 0
        });
        sdkinit = true;
        return engine;
    };
    HRTCSDKElectronService.prototype.getUserLocalId = function () {
        return userJoinId;
    };
    /**
     * 加入房间
     *
     * @param {string} roomId 房间id
     * @param {number} userId 用户id
     * @param {RTCLoginOpts} [opts] 其他一些信息
     * @memberof HRTCSDKElectronService
     */
    HRTCSDKElectronService.prototype.joinRoom = function (roomId, userId, opts) {
        userJoinId = userId + this.id_random;
        var userInfo = { 'userId': "" + (userId + this.id_random), 'userName': (opts && opts.userName) + "_roletype_" + (opts && opts.role), signature: '', ctime: 0, role: 0 };
        var option = {
            autoSubscribeAudio: false,
            autoSubscribeVideo: false,
            mediaType: 1
        };
        var ret = engine.joinRoom(roomId, userInfo, option);
        // const ret = engine.joinRoom(roomId, userInfo);
        console.log('join room:', userInfo, ret);
        if (ret != 0) {
            throw new Error('join failed, ' + ret);
        }
    };
    /**
     * 由于rtc接口的回调采用 HRTC Electron 的回调为基准，这里直接遍历并返回即可，其他sdk，必须重新实现每一个回调并封装
     *
     * @memberof HRTCSDKElectronService
     */
    HRTCSDKElectronService.prototype.sdkEvent = function () {
        var _this = this;
        var _loop_1 = function (eventType) {
            engine.on(eventType, function () {
                var opts = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    opts[_i] = arguments[_i];
                }
                // console.log('sdk event:', eventType, opts);
                _this.emit.apply(_this, __spreadArray([eventType], opts, false));
            });
        };
        for (var eventType in rtc_abstract_1.RTCEventType) {
            _loop_1(eventType);
        }
    };
    HRTCSDKElectronService.prototype.createLocalPreview = function (view, mode) {
        engine.enableLocalVideo(true);
        engine.setViewDisplayMode('', 1, false);
        var result = engine.setupLocalView(view, mode);
        if (result != 0) {
            throw new Error('rtc engine setupLocalView error.' + result);
        }
        return result;
    };
    HRTCSDKElectronService.prototype.setLocalVideo = function (type) {
        engine.enableLocalVideo(type);
    };
    HRTCSDKElectronService.prototype.setLocalAudio = function (type) {
        engine.enableLocalAudio(type);
    };
    HRTCSDKElectronService.prototype.setLocalPreview = function (type) {
        if (type === void 0) { type = true; }
        // engine.enableLocalVideo(type);
    };
    HRTCSDKElectronService.prototype.stopLocalPreviewAndClear = function (view) {
        var res = engine.enableLocalVideo(false);
        view.innerHTML = '';
        return res;
    };
    HRTCSDKElectronService.prototype.renderRemoteView = function (userId, view) {
        engine.startRemoteStreamView(userId, view, 1, true);
        this.muteRemoteVideoStream(userId, false);
        this.renderRemoteVideoStreamType(userId, 1);
    };
    HRTCSDKElectronService.prototype.muteRemoteVideoStream = function (userId, mute) {
        engine.muteRemoteVideoStream(userId, mute);
    };
    HRTCSDKElectronService.prototype.renderRemoteVideoStreamType = function (userId, type) {
        engine.setRemoteVideoStreamType(userId, type);
    };
    HRTCSDKElectronService.prototype.leaveRoom = function () {
        return engine.leaveRoom();
    };
    HRTCSDKElectronService.prototype.setUserRole = function (roleType) {
        return engine.setUserRole(roleType);
    };
    HRTCSDKElectronService.prototype.getScreenSources = function (type) {
        if (type === void 0) { type = 0; }
        console.log('getScreenSources type: ', type);
        return engine.getScreenCaptureSources(type);
    };
    HRTCSDKElectronService.prototype.selectScreenShare = function (item) {
        return engine.selectScreenCaptureTarget(item, { disableCaptureMouse: true });
        // engine.selectScreenCaptureTarget(info: HRTCScreenCaptureSourceInfo, optionalInfo: HRTCSrceenCaptureOptionalInfo)
    };
    HRTCSDKElectronService.prototype.startScreenShare = function () {
        return engine.startScreenCapture();
    };
    HRTCSDKElectronService.prototype.stopScreenShare = function () {
        return engine.stopScreenCapture();
    };
    HRTCSDKElectronService.prototype.startRenderRemoteScreenShare = function (userId, view) {
        // 暂时有问题，不开放
        // engine.setRemoteSubStreamViewDisplayMode(userId, 0);
        return engine.startRemoteSubStreamView(userId, view);
    };
    HRTCSDKElectronService.prototype.setRemoteSubStreamViewDisplayMode = function (userId, mode) {
        if (mode === void 0) { mode = 0; }
        console.log('setting remote video display mode:', userId, mode);
        engine.setRemoteSubStreamViewDisplayMode(userId, mode);
    };
    HRTCSDKElectronService.prototype.stopRenderRemoteScreenShare = function (userId) {
        return engine.stopRemoteSubStreamView(userId);
    };
    return HRTCSDKElectronService;
}(rtc_abstract_1.RTCBaseProvider));
exports.default = HRTCSDKElectronService;
