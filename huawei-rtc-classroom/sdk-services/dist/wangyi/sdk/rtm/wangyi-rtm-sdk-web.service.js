"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-10-12 13:37:58
 * @LastEditors: Yandong Hu
 * @Description:
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
var netease_nim_web_sdk_1 = require("@huyandong/netease-nim-web-sdk");
var rxjs_1 = require("rxjs");
var rtm_abstract_1 = require("../../../abstract/rtm.abstract");
var WangYiRTMListensTypes;
(function (WangYiRTMListensTypes) {
    WangYiRTMListensTypes["onconnect"] = "onconnect";
    WangYiRTMListensTypes["onwillreconnect"] = "onwillreconnect";
    WangYiRTMListensTypes["ondisconnect"] = "ondisconnect";
    WangYiRTMListensTypes["onerror"] = "onerror";
})(WangYiRTMListensTypes || (WangYiRTMListensTypes = {}));
var WangyiRTMSdkWebService = /** @class */ (function (_super) {
    __extends(WangyiRTMSdkWebService, _super);
    function WangyiRTMSdkWebService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * RTM 连接的频道ID
        */
        _this.channelId = '';
        return _this;
    }
    WangyiRTMSdkWebService.prototype.init = function (appId, opt) {
        var _this = this;
        var subject = new rxjs_1.Subject();
        console.log('开始 网易rtm');
        this.rtmClient = netease_nim_web_sdk_1.NIM_Web_NIM.getInstance({
            appKey: appId,
            account: opt.account,
            token: opt.token,
            onconnect: function () {
                console.log('onconnect!!!');
                _this.emit(WangYiRTMListensTypes.onconnect, {});
                subject.next('success');
                subject.complete();
            },
            onwillreconnect: function (obj) {
                console.log('onwillreconnect:', obj);
                _this.emit(WangYiRTMListensTypes.onwillreconnect, obj);
            },
            ondisconnect: function (error) {
                console.log('ondisconnect:', error);
                _this.emit(WangYiRTMListensTypes.ondisconnect, error);
            },
            onerror: function (error) {
                console.log('onerror:', error);
                subject.error(error);
                subject.complete();
                _this.emit(WangYiRTMListensTypes.onerror, error);
            },
        });
        return subject.asObservable();
    };
    WangyiRTMSdkWebService.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var channelName, param, channelInfo, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelName = "" + user.channel;
                        param = {
                            type: 1,
                            channelName: channelName,
                            ext: ''
                        };
                        console.log('rtm login: ', user);
                        return [4 /*yield*/, this.getChannelInfo(channelName)];
                    case 1:
                        channelInfo = _a.sent();
                        this.channelId = channelInfo.channelId;
                        console.log('rtm get channelInfo:', channelInfo);
                        if (!!channelInfo.channelCreateTime) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.rtmClient.signalingCreate(param)];
                    case 2:
                        data = _a.sent();
                        console.log('rtm signalingCreate channelInfo:', data);
                        this.channelId = data.channelId;
                        _a.label = 3;
                    case 3:
                        this.messageEvent();
                        console.log('start join room:', this.channelId, user.userId);
                        return [4 /*yield*/, this.joinRoom(this.channelId, user.userId)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WangyiRTMSdkWebService.prototype.getChannelInfo = function (channelName) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rtmClient.signalingGetChannelInfo({
                            channelName: channelName
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    WangyiRTMSdkWebService.prototype.leaveChannel = function () {
        var param = {
            channelId: this.channelId,
            offlineEnabled: true,
            attachExt: ''
        };
        this.rtmClient.signalingLeave(param);
    };
    WangyiRTMSdkWebService.prototype.joinRoom = function (roomId, userId, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var param, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            channelId: roomId,
                            offlineEnabled: false,
                            attachExt: '',
                            uid: userId
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.rtmClient.signalingJoin(param)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log('join room error:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WangyiRTMSdkWebService.prototype.sendMsg = function (msg) {
        var param = {
            channelId: this.channelId,
            account: '',
            attachExt: JSON.stringify(msg)
        };
        return this.rtmClient.signalingControl(param);
    };
    WangyiRTMSdkWebService.prototype.messageEvent = function () {
        var _this = this;
        this.rtmClient.on('signalingNotify', function (event) {
            console.log("signalingOnlineNotify: ", event);
            switch (event.eventType) {
                case 'LEAVE':
                    /* 该事件的通知内容
                      event.eventType 事件类型
                      event.channelName 频道名称
                      event.channelId 频道ID
                      event.channelCreateTime 频道创建时间
                      event.channelExpireTime 频道过期时间
                      event.creator 频道创建者
                      event.from 操作者
                      event.to 接收者
                      evnet.ext 操作者附加的自定义信息，透传给你
                      event.time 操作的时间戳
                    */
                    console.log("独立呼叫信令：离开频道事件");
                    _this.emit(rtm_abstract_1.rtmTextMessageCategory.LEAVE_CHANNEL, { userId: event.from, exit: false });
                    break;
                case 'CONTROL':
                    var jsonData = JSON.parse(event.attachExt.text);
                    var command = jsonData.command;
                    _this.emit(command, jsonData);
                    break;
            }
        });
    };
    WangyiRTMSdkWebService.prototype.destroy = function () {
        this.rtmClient.destroy({
            done: function (err) {
                console.log('实例已被完全清除');
            }
        });
    };
    return WangyiRTMSdkWebService;
}(rtm_abstract_1.RTMBaseProvider));
exports.default = WangyiRTMSdkWebService;
