import { RTMBaseProvider } from "../../../abstract/rtm.abstract";
export default class WangyiRTMSdkWebService extends RTMBaseProvider {
    /**
     * RTM 初始化后的对象
     */
    rtmClient: any;
    /**
    * RTM 连接的频道ID
    */
    channelId: string;
    init(appId?: any, opt?: any): import("rxjs").Observable<any>;
    login(user: any): Promise<void>;
    getChannelInfo(channelName: string): Promise<any>;
    leaveChannel(): void;
    joinRoom(roomId: string, userId: number, opts?: any): Promise<void>;
    sendMsg(msg: any): any;
    messageEvent(): void;
    destroy(): void;
}
