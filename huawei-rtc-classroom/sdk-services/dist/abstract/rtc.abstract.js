"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 14:14:38
 * @LastEditTime: 2021-09-30 11:48:08
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
exports.RTCBaseProvider = exports.RTCEventType = void 0;
var events_1 = __importDefault(require("events"));
/**
 * 以HRTC Electron SDK为标准，其他RTC SDK必须参考此标准将回调信息进行转化。
 *
 * @export
 * @enum {number}
 */
var RTCEventType;
(function (RTCEventType) {
    /**
     * rtc error
     */
    RTCEventType["error"] = "error";
    /**
     * rtc warning
     */
    RTCEventType["warning"] = "warning";
    /**
     * 远端用户加入房间/频道
     */
    RTCEventType["userJoined"] = "userJoined";
    /**
     * 加入房间/频道
     */
    RTCEventType["joinedRoom"] = "joinedRoom";
    /**
     * 离开房间/频道
     */
    RTCEventType["leaveRoom"] = "leaveRoom";
    /**
     * 离开房间/频道
     */
    RTCEventType["userOffline"] = "userOffline";
    /**
     * 本地共享后回调
     */
    RTCEventType["screenCaptureStarted"] = "screenCaptureStarted";
    /**
     * 远端开启，停止共享流后，触发此回调
     */
    RTCEventType["userSubStreamAvailable"] = "userSubStreamAvailable";
})(RTCEventType = exports.RTCEventType || (exports.RTCEventType = {}));
var RTCBaseProvider = /** @class */ (function (_super) {
    __extends(RTCBaseProvider, _super);
    function RTCBaseProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTCBaseProvider.prototype.renderRemoteView = function (userId, view) {
        throw new Error("Method not implemented.");
    };
    return RTCBaseProvider;
}(events_1.default));
exports.RTCBaseProvider = RTCBaseProvider;
