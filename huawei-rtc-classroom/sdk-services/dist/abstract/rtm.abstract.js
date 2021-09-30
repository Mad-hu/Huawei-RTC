"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 14:14:38
 * @LastEditTime: 2021-09-30 11:41:14
 * @LastEditors: Yandong Hu
 * @Description: RTC模块基础代理
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTMBaseProvider = exports.rtmTextMessageCategory = void 0;
var events_1 = __importDefault(require("events"));
exports.rtmTextMessageCategory = {
    READY_SHARE_SCREEN: 'READY_SHARE_SCREEN',
    START_SHARE_SCREEN: 'START_SHARE_SCREEN',
    STOP_SHARE_SCREEN: 'STOP_SHARE_SCREEN',
    LEAVE_CHANNEL: 'LEAVE_CHANNEL',
    JOIN_CHANNEL: 'JOIN_CHANNEL',
    MEMBER_COUNT_UPDATE_CHANNEL: 'MEMBER_COUNT_UPDATE_CHANNEL',
    ATTRIBUTES_UPDATED: 'ATTRIBUTES_UPDATED',
    CONTROL_START: 'CONTROL_START',
    CONTROL_END: 'CONTROL_END',
    CONTROL_READY: 'CONTROL_READY',
    MUTE_VIDEO: 'MUTE_VIDEO',
    MUTE_AUDIO: 'MUTE_AUDIO',
};
var RTMBaseProvider = /** @class */ (function (_super) {
    __extends(RTMBaseProvider, _super);
    function RTMBaseProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RTMBaseProvider;
}(events_1.default));
exports.RTMBaseProvider = RTMBaseProvider;
