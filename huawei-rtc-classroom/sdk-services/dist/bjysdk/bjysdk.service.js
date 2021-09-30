"use strict";
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 16:08:31
 * @LastEditTime: 2021-09-30 11:43:02
 * @LastEditors: Yandong Hu
 * @Description: 百家云sdk
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
exports.msgType = void 0;
var events_1 = require("events");
var electron_service_1 = require("../electron.service");
var win;
var bjysdk;
// 百家云sdk的一些变量
var slClientInvalid = "0"; // 创建以后返回成功标识 ‘0’ 失败
var slSessionInvalid = -1;
var slclient = slClientInvalid;
var desktopsession = slSessionInvalid;
var initbjysdk = false;
var slRemoteInvalid = "0";
var slremote = slRemoteInvalid;
var initbjysdk = false;
var remoteWin;
exports.msgType = {
    notic: 'notic',
    session: 'session',
    address: 'address',
    error: 'error'
};
/**
 * 百家云 远程控制sdk
 *
 * @export
 * @class BjyRemoteControlSDKService
 * @extends {EventEmitter}
 */
var BjyRemoteControlSDKService = /** @class */ (function (_super) {
    __extends(BjyRemoteControlSDKService, _super);
    function BjyRemoteControlSDKService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * sdk 状态发送
         *
         * @param {string} eventName
         * @param {string} msg
         */
        _this.sendMsgEvent = function (eventName, msg) {
            console.log('BjyRemoteControlSDKService event:', msg);
            _this.emit(eventName, msg);
        };
        /**
         * master client create desktop session
         *
         * @param {*} message
         */
        _this.createDesktopsession = function (message) {
            if (slclient != slClientInvalid) {
                if (desktopsession != slSessionInvalid) {
                    bjysdk.destroyClientSession(slclient, desktopsession);
                    desktopsession = slSessionInvalid;
                }
                desktopsession = bjysdk.createClientSession(slclient, 0);
                if (desktopsession != slSessionInvalid) {
                    if (bjysdk.setClientSessionOpt(slclient, desktopsession, 2, _this.slclientDesktopSessionCallback.bind(_this), 0)) {
                        var session = bjysdk.getClientSessionName(slclient, desktopsession);
                        _this.sendMsgEvent(exports.msgType.notic, '创建远程会话成功');
                        _this.sendMsgEvent(exports.msgType.session, session);
                        return session;
                    }
                    else {
                        _this.sendMsgEvent(exports.msgType.error, '设置远程会话回调失败');
                        throw new Error('设置远程会话回调失败');
                    }
                }
                else {
                    _this.sendMsgEvent(exports.msgType.error, '创建远程会话失败');
                    throw new Error('创建远程会话失败');
                }
            }
            else {
                _this.sendMsgEvent(exports.msgType.error, '无效的被控端实例');
                throw new Error('无效的被控端实例');
            }
        };
        /**
         * 销毁百家云SDK环境
         *
         */
        _this.destroyRemoteBjysdk = function () {
            try {
                if (slremote != slRemoteInvalid) {
                    if (desktopsession != slSessionInvalid) {
                        bjysdk.destroyRemoteSession(slremote, desktopsession);
                        desktopsession = slSessionInvalid;
                    }
                    bjysdk.destroyRemote(slremote);
                    slremote = slRemoteInvalid;
                }
                bjysdk.uninitialize();
                initbjysdk = false;
                _this.sendMsgEvent(exports.msgType.notic, '销毁成功');
            }
            catch (error) {
                _this.sendMsgEvent(exports.msgType.error, '销毁失败');
            }
        };
        /**
         * 发起远程连接
         *
         * @param {*} message
         */
        _this.createDesktop = function (message) {
            if (slremote != slRemoteInvalid) {
                if (desktopsession != slSessionInvalid) {
                    bjysdk.destroyRemoteSession(slremote, desktopsession);
                    desktopsession = slSessionInvalid;
                }
                desktopsession = bjysdk.createRemoteEmptySession(slremote, 0);
                if (desktopsession != slSessionInvalid) {
                    var jsonObj = JSON.parse(message);
                    var address = jsonObj.address;
                    var session = jsonObj.session;
                    _this.createRemoteWindows();
                    var hwnd = remoteWin.getNativeWindowHandle();
                    if (bjysdk.setRemoteSessionOpt(slremote, desktopsession, 1, hwnd, hwnd.length)) {
                        _this.moveDesktopPos();
                        if (bjysdk.setRemoteSessionOpt(slremote, desktopsession, 2, _this.slremoteDesktopSessionCallback.bind(_this), 0)) {
                            if (bjysdk.connectRemoteSession(slremote, desktopsession, address, session)) {
                                _this.sendMsgEvent(exports.msgType.notic, '连接远程会话成功');
                            }
                            else {
                                _this.sendMsgEvent(exports.msgType.error, '连接远程会话失败');
                            }
                        }
                        else {
                            _this.sendMsgEvent(exports.msgType.error, '设置远程会话回调失败');
                        }
                    }
                    else {
                        _this.sendMsgEvent(exports.msgType.error, '设置窗口句柄失败');
                    }
                }
                else {
                    _this.sendMsgEvent(exports.msgType.error, '创建远程会话失败');
                }
            }
            else {
                _this.sendMsgEvent(exports.msgType.error, '无效的被控端实例');
            }
        };
        return _this;
    }
    /**
     * 百家云sdk控制端初始化
     *
     * @return {*} true success, false failed
     */
    BjyRemoteControlSDKService.prototype.bjysdkClientInit = function () {
        bjysdk = (0, electron_service_1.getBjySdk)();
        if (!bjysdk) {
            throw new Error('not found bjysdk, please check native preload !');
        }
        if (bjysdk.initialize()) {
            slclient = bjysdk.createClient();
            if (slclient != slClientInvalid) {
                bjysdk.setClientCallback(slclient, this.slclientCallback.bind(this));
                bjysdk.openClientLog(slclient, "./log");
                initbjysdk = true;
                win = (0, electron_service_1.getCurrentWindow)();
            }
        }
        if (initbjysdk) {
            this.sendMsgEvent(exports.msgType.notic, '初始化成功');
            return true;
        }
        else {
            this.sendMsgEvent(exports.msgType.error, '初始化失败');
            return false;
        }
    };
    /**
     * 销毁百家云SDK控制端环境
     *
     * @return {*} true success, false failed
     */
    BjyRemoteControlSDKService.prototype.destroyClientBjysdk = function () {
        try {
            if (slclient != slClientInvalid) {
                if (desktopsession != slSessionInvalid) {
                    bjysdk.destroyClientSession(slclient, desktopsession);
                    desktopsession = slSessionInvalid;
                }
                bjysdk.destroyClient(slclient);
                slclient = slClientInvalid;
            }
            bjysdk.uninitialize();
            initbjysdk = false;
            this.sendMsgEvent(exports.msgType.notic, '销毁成功');
            return true;
        }
        catch (error) {
            this.sendMsgEvent(exports.msgType.error, '销毁失败');
            return false;
        }
    };
    /**
     * 登录独立服务器
     *
     * @param {string} message JSON String
     * @return {*}
     */
    BjyRemoteControlSDKService.prototype.login = function (openid, openkey) {
        var mode = '0';
        if (slclient != slClientInvalid) {
            bjysdk.clientLoginWithOpenID(slclient, openid, openkey, "", false);
            // bjysdk.clientLoginWithLicense(slclient, openid, openkey);
            this.sendMsgEvent(exports.msgType.notic, '登录成功');
            return;
        }
        this.sendMsgEvent(exports.msgType.error, '登录失败');
    };
    /**
     * master client destroy Desktop session
     *
     * @param {*} message
     */
    BjyRemoteControlSDKService.prototype.destroyDesktopsession = function (message) {
        if (slclient != slClientInvalid) {
            if (desktopsession != slSessionInvalid) {
                bjysdk.destroyClientSession(slclient, desktopsession);
                desktopsession = slSessionInvalid;
                this.sendMsgEvent(exports.msgType.notic, '销毁远程会话成功');
                this.sendMsgEvent(exports.msgType.session, '');
            }
        }
        else {
            this.sendMsgEvent(exports.msgType.error, '无效的被控端实例');
        }
    };
    /**
     * 被控端事件回调
     *
     * @param {*} client
     * @param {*} event
     */
    BjyRemoteControlSDKService.prototype.slclientCallback = function (client, event) {
        if (client == slclient) {
            if (event == 0) {
                this.sendMsgEvent(exports.msgType.notic, '连接服务器成功');
            }
            else if (event == 1) {
                this.sendMsgEvent(exports.msgType.notic, '与服务器断开连接');
            }
            else if (event == 2) {
                this.sendMsgEvent(exports.msgType.notic, '登录服务器成功');
                var address = bjysdk.getClientAddress(slclient);
                this.sendMsgEvent(exports.msgType.address, address);
            }
            else if (event == 3) {
                this.sendMsgEvent(exports.msgType.notic, '登录服务器失败');
            }
            else if (event == 4) {
                this.sendMsgEvent(exports.msgType.notic, '通道数已用完');
            }
            else if (event == 5) {
                this.sendMsgEvent(exports.msgType.notic, '服务器检查通道数失败');
            }
        }
    };
    /**
     * 远程连接会话回调
     *
     * @param {*} session
     * @param {*} event
     * @param {*} data
     */
    BjyRemoteControlSDKService.prototype.slclientDesktopSessionCallback = function (session, event, data) {
        if (session == desktopsession) {
            if (event == 1) {
                this.sendMsgEvent(exports.msgType.notic, '桌面会话已连接');
                bjysdk.clientStartChat(slclient, desktopsession, false);
            }
            else if (event == 2) {
                this.sendMsgEvent(exports.msgType.notic, '桌面会话已断开');
            }
        }
    };
    /**
     * 初始化百家云SDK环境
     *
     */
    BjyRemoteControlSDKService.prototype.bjysdkRemoteInit = function () {
        bjysdk = (0, electron_service_1.getBjySdk)();
        if (!bjysdk) {
            throw new Error('not found bjysdk, please check native preload !');
        }
        if (bjysdk.initialize()) {
            slremote = bjysdk.createRemote();
            if (slremote != slRemoteInvalid) {
                bjysdk.setRemoteCallback(slremote, this.slremoteCallback.bind(this));
                bjysdk.openRemoteLog(slremote, "./log");
                initbjysdk = true;
                // win = getCurrentWindow();
            }
        }
        if (initbjysdk) {
            this.sendMsgEvent(exports.msgType.notic, '初始化成功');
        }
        else {
            this.sendMsgEvent(exports.msgType.error, '初始化失败');
        }
    };
    /**
     * 创建远程桌面窗口
     *
     */
    BjyRemoteControlSDKService.prototype.createRemoteWindows = function () {
        var _this = this;
        remoteWin = null;
        var BrowserWindow = (0, electron_service_1.getBrowserWindow)();
        remoteWin = new BrowserWindow({ width: 866, height: 600 });
        remoteWin.setMenu(null);
        remoteWin.setTitle("远程桌面");
        remoteWin.on('close', function () {
            remoteWin = null;
            if (slremote != slRemoteInvalid && desktopsession != slSessionInvalid) {
                bjysdk.destroyRemoteSession(slremote, desktopsession);
                desktopsession = slSessionInvalid;
                _this.sendMsgEvent(exports.msgType.notic, '销毁远程桌面成功');
            }
        });
        remoteWin.on('resize', function () {
            remoteWin.reload();
            _this.moveDesktopPos();
        });
    };
    /**
     * 远程事件回调
     *
     * @param {*} remote
     * @param {*} session
     * @param {*} event
     */
    BjyRemoteControlSDKService.prototype.slremoteCallback = function (remote, session, event) {
        if (session == desktopsession) {
            this.sendMsgEvent(exports.msgType.notic, event == 0 ? "桌面会话已连接" : "桌面会话已断开");
            if (event == 0) {
                var hwnd = remoteWin.getNativeWindowHandle();
                bjysdk.setDesktopSessionVisible(slremote, desktopsession, hwnd);
            }
            else if (remoteWin) {
                remoteWin.close();
            }
        }
    };
    /**
     * 远程连接会话回调
     *
     * @param {*} session
     * @param {*} event
     * @param {*} data
     */
    BjyRemoteControlSDKService.prototype.slremoteDesktopSessionCallback = function (session, event, data) {
        if (session == desktopsession) {
            if (event == 1) {
                this.sendMsgEvent(exports.msgType.notic, '桌面会话已连接');
            }
            else if (event == 2) {
                this.sendMsgEvent(exports.msgType.notic, '桌面会话已断开');
            }
        }
    };
    /**
     * 设置远程桌面相对位置
     *
     */
    BjyRemoteControlSDKService.prototype.moveDesktopPos = function () {
        var rc = remoteWin.getContentBounds();
        if (process.platform == "win32") {
            var scaleFactor = (0, electron_service_1.getScreen)().getPrimaryDisplay().scaleFactor;
            bjysdk.setDesktopSessionPos(slremote, desktopsession, 0, 0, parseInt(rc.width * scaleFactor + ''), parseInt(rc.height * scaleFactor + ''));
        }
        else {
            bjysdk.setDesktopSessionPos(slremote, desktopsession, rc.x, rc.y, rc.width, rc.height);
        }
    };
    return BjyRemoteControlSDKService;
}(events_1.EventEmitter));
exports.default = BjyRemoteControlSDKService;
