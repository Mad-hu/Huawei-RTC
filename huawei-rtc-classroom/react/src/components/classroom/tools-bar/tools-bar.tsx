/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-21 11:26:26
 * @LastEditTime: 2021-10-21 13:07:19
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import './tools-bar.scss';
import classnames from 'classnames';
import { UserListState, UserType } from '../../../services/state-manager/classroom-state.service';
import { useRecoilState, useRecoilValue } from 'recoil';
import { leaveRoom, muteAudio, muteVideo, sendMuteAudio, sendMuteVideo } from '../../../services/classroom.service';
import { Modal } from 'antd';
export const ToolsBar = () => {
    const [userListState, setUserListState] = useRecoilState(UserListState);
    let localUser: UserType | undefined | any = { audio: true, video: true };
    
    const audioAction = () => {
        localUser = userListState.lists.find((item) => item.isLocal)!;
        localUser.audio = !localUser.audio;
        muteAudio(localUser);
        sendMuteAudio(`${localUser.userId}`, localUser.audio!);
    }
    const videoAction = () => {
        localUser = userListState.lists.find((item) => item.isLocal)!;
        localUser.video = !localUser.video;
        muteVideo(localUser);
        sendMuteVideo(`${localUser.userId}`, localUser.video!);
    }
    const leave = () => {
        Modal.confirm({
            title: '是否退出教室?',
            okText: '确定',
            cancelText: '取消',
            onOk: ()=>{
                setUserListState({lists: []});
                leaveRoom();
                window.history.back();
            }
        })
    }
    const settingAction = () => {
    }
    const shareScreen = () => {
    }
    return (
        <div className="tools-bar">
            <div className="btn normal" onClick={shareScreen} title="共享屏幕">
                <span>&#xe616;</span>
                共享屏幕
            </div>
            <div className={classnames({'btn': true, enable: localUser.audio , disable: !localUser.audio})}
                onClick={audioAction}
                title="声音"
            >
                <span>&#xe882;</span>
                声音
            </div >
            <div className={classnames({'btn': true, enable: localUser.video , disable: !localUser.video})}
                onClick={videoAction}
                title="摄像头"
            >
                <span>&#xe696;</span>
                摄像头
            </div >
            <div className="btn leavebtn" onClick={leave} > 离开教室</div >
            <div className="setting" onClick={settingAction} title="设置" >
                <span>&#xe892;</span>
            </div >
        </div >
    )
}