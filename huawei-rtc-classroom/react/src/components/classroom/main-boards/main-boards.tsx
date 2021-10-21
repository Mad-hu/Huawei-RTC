
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-21 10:48:52
 * @LastEditTime: 2021-10-21 11:19:13
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import { Button } from "antd"
import { RtcService } from "hrtc-sdk-services";
import { useRecoilState, useRecoilValue } from "recoil";
import { RemoteScreenShareListState, ScreenShareState } from "../../../services/state-manager/classroom-state.service";
import './main-boards.scss';
export const MainBoards = () => {
    const [screenShareState, setScreenShareState] = useRecoilState(ScreenShareState);
    const remoteScreenShareListValue = useRecoilValue(RemoteScreenShareListState);
    const stopScreenShare = () => {
        const stopState = RtcService().stopScreenShare();
        setScreenShareState({
            screenShareState: stopState == 0 ? false : true
        })
    }
    return(
        <div className="main-boards" id="board">
            {remoteScreenShareListValue.remoteShareList.length != 0 && 
                <div id="share-box" className="share-box"></div> } 
            {screenShareState.screenShareState &&
                <div className="share-msg">
                    <span>正在共享屏幕...</span>
                    <Button type="primary" size="small" onClick={stopScreenShare}>结束共享</Button>
                </div>
            }
        </div>
    )
}