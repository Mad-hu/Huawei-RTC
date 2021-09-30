"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 18:13:10
 * @LastEditTime: 2021-09-30 11:39:25
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
Object.defineProperty(exports, "__esModule", { value: true });
var rtm_abstract_1 = require("../../../abstract/rtm.abstract");
var WangyiRTMSdkWebService = /** @class */ (function (_super) {
    __extends(WangyiRTMSdkWebService, _super);
    function WangyiRTMSdkWebService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WangyiRTMSdkWebService.prototype.login = function (user) {
        throw new Error("Method not implemented.");
    };
    WangyiRTMSdkWebService.prototype.leaveChannel = function () {
        throw new Error("Method not implemented.");
    };
    WangyiRTMSdkWebService.prototype.init = function (appId, opt) {
        throw new Error("Method not implemented.");
    };
    WangyiRTMSdkWebService.prototype.joinRoom = function (roomId, userId, opts) {
        throw new Error("Method not implemented.");
    };
    WangyiRTMSdkWebService.prototype.sendMsg = function (msg) {
        throw new Error("Method not implemented.");
    };
    return WangyiRTMSdkWebService;
}(rtm_abstract_1.RTMBaseProvider));
exports.default = WangyiRTMSdkWebService;
