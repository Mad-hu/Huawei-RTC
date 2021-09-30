/// <reference types="node" />
import { EventEmitter } from 'events';
import { ControlEventType } from './bjysdk.service.interface';
export declare const msgType: ControlEventType;
/**
 * 百家云 远程控制sdk
 *
 * @export
 * @class BjyRemoteControlSDKService
 * @extends {EventEmitter}
 */
export default class BjyRemoteControlSDKService extends EventEmitter {
    /**
     * sdk 状态发送
     *
     * @param {string} eventName
     * @param {string} msg
     */
    sendMsgEvent: (eventName: string, msg: string) => void;
    /**
     * 百家云sdk控制端初始化
     *
     * @return {*} true success, false failed
     */
    bjysdkClientInit(): boolean;
    /**
     * 销毁百家云SDK控制端环境
     *
     * @return {*} true success, false failed
     */
    destroyClientBjysdk(): boolean;
    /**
     * 登录独立服务器
     *
     * @param {string} message JSON String
     * @return {*}
     */
    login(openid: string, openkey: string): void;
    /**
     * master client create desktop session
     *
     * @param {*} message
     */
    createDesktopsession: (message: any) => any;
    /**
     * master client destroy Desktop session
     *
     * @param {*} message
     */
    destroyDesktopsession(message: any): void;
    /**
     * 被控端事件回调
     *
     * @param {*} client
     * @param {*} event
     */
    slclientCallback(client: any, event: any): void;
    /**
     * 远程连接会话回调
     *
     * @param {*} session
     * @param {*} event
     * @param {*} data
     */
    slclientDesktopSessionCallback(session: any, event: any, data: any): void;
    /**
     * 初始化百家云SDK环境
     *
     */
    bjysdkRemoteInit(): void;
    /**
     * 销毁百家云SDK环境
     *
     */
    destroyRemoteBjysdk: () => void;
    /**
     * 发起远程连接
     *
     * @param {*} message
     */
    createDesktop: (message: any) => void;
    /**
     * 创建远程桌面窗口
     *
     */
    private createRemoteWindows;
    /**
     * 远程事件回调
     *
     * @param {*} remote
     * @param {*} session
     * @param {*} event
     */
    private slremoteCallback;
    /**
     * 远程连接会话回调
     *
     * @param {*} session
     * @param {*} event
     * @param {*} data
     */
    private slremoteDesktopSessionCallback;
    /**
     * 设置远程桌面相对位置
     *
     */
    private moveDesktopPos;
}
