import { RTMBaseProvider } from "../../../abstract/rtm.abstract";
export default class WangyiRTMSdkWebService extends RTMBaseProvider {
    login(user: any): void;
    leaveChannel(): void;
    init(appId?: number, opt?: any): void;
    joinRoom(roomId: string, userId: number, opts?: any): void;
    sendMsg(msg: any): void;
}
