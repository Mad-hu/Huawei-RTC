import { RTMBaseProvider } from "../../../abstract/rtm.abstract";
import { RtmChannel, RtmClient } from 'agora-rtm-sdk';
export default class AgoraRTMSdkWebService extends RTMBaseProvider {
    /**
     * RTM 初始化后的对象
     */
    rtmClient: RtmClient;
    /**
    * RTM 连接的频道
    */
    chan: RtmChannel;
    init(appId?: any, opt?: any): void;
    login(user: any): Promise<void>;
    createChannel(channel: string): void;
    joinRoom(roomId?: string, userId?: number, opts?: any): Promise<void>;
    sendMsg(msg: any): Promise<void>;
    /**
     * 离开频道
     *
     * @memberof AgoraRTMService
     */
    leaveChannel(): void;
    messageEvent(): void;
}
