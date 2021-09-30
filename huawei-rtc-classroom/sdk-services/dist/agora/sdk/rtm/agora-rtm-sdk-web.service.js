"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-09-30 11:41:29
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rtm_abstract_1 = require("../../../abstract/rtm.abstract");
var agora_rtm_sdk_1 = __importDefault(require("agora-rtm-sdk"));
var events_1 = __importDefault(require("events"));
var AgoraRTMSdkWebService = /** @class */ (function (_super) {
    __extends(AgoraRTMSdkWebService, _super);
    function AgoraRTMSdkWebService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgoraRTMSdkWebService.prototype.init = function (appId, opt) {
        events_1.default.defaultMaxListeners = 20;
        this.rtmClient = agora_rtm_sdk_1.default.createInstance("" + appId);
    };
    AgoraRTMSdkWebService.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rtmClient.login({ uid: "" + user.userId })];
                    case 1:
                        _a.sent();
                        this.createChannel(user.channel);
                        this.joinRoom();
                        return [2 /*return*/];
                }
            });
        });
    };
    AgoraRTMSdkWebService.prototype.createChannel = function (channel) {
        if (!this.rtmClient) {
            throw new Error('not find rtmClient! first please init rtm sdk!');
        }
        ;
        if (typeof (channel) != 'string') {
            throw new Error('channel is not string!');
        }
        this.chan = this.rtmClient.createChannel(channel);
    };
    AgoraRTMSdkWebService.prototype.joinRoom = function (roomId, userId, opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.chan) {
                            throw new Error('not find chan! first please create channel!');
                        }
                        ;
                        /* 频道监听 */
                        this.messageEvent();
                        return [4 /*yield*/, this.chan.join()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AgoraRTMSdkWebService.prototype.sendMsg = function (msg) {
        console.log('sendMessage:', { text: msg });
        return this.chan.sendMessage({ text: JSON.stringify(msg) });
    };
    /**
     * 离开频道
     *
     * @memberof AgoraRTMService
     */
    AgoraRTMSdkWebService.prototype.leaveChannel = function () {
        this.chan && this.chan.leave();
    };
    AgoraRTMSdkWebService.prototype.messageEvent = function () {
        var _this = this;
        console.log('messageEvent init!');
        var channelMessage = 'ChannelMessage';
        var attributesUpdated = 'AttributesUpdated';
        var memberCountUpdated = 'MemberCountUpdated';
        var memberJoined = 'MemberJoined';
        var memberLeft = 'MemberLeft';
        this.chan.on(channelMessage, function (message, memberId, messagePros) {
            console.log('channelMessage:', message, memberId, messagePros);
            var jsonData = JSON.parse(message.text);
            var command = jsonData.command;
            _this.emit(command, jsonData);
        });
        this.chan.on(attributesUpdated, function (attributes) {
            console.log('attributesUpdated:', attributes);
            _this.emit(rtm_abstract_1.rtmTextMessageCategory.ATTRIBUTES_UPDATED, attributes);
        });
        this.chan.on(memberCountUpdated, function (attributes) {
            console.log('memberCountUpdated:', attributes);
            _this.emit(rtm_abstract_1.rtmTextMessageCategory.MEMBER_COUNT_UPDATE_CHANNEL, attributes);
        });
        this.chan.on(memberJoined, function (attributes) {
            console.log('memberJoined:', attributes);
            _this.emit(rtm_abstract_1.rtmTextMessageCategory.JOIN_CHANNEL, attributes);
        });
        this.chan.on(memberLeft, function (attributes) {
            console.log('memberLeft:', attributes);
            _this.emit(rtm_abstract_1.rtmTextMessageCategory.LEAVE_CHANNEL, attributes);
        });
    };
    return AgoraRTMSdkWebService;
}(rtm_abstract_1.RTMBaseProvider));
exports.default = AgoraRTMSdkWebService;
