/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-21 11:58:56
 * @LastEditTime: 2021-10-21 12:12:00
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { muteAudio, muteVideo, sendControlStart, sendMuteAudio, sendMuteVideo } from '../../../services/classroom.service';
import { ControlUserIdState, UserListState, UserType } from '../../../services/state-manager/classroom-state.service';
import { LoadingMainState } from '../../../services/state-manager/loading-state.service';
import './user-lists.scss';

export const UserLists = () => {
    const setLoadingMain = useSetRecoilState(LoadingMainState);
    const userListState = useRecoilValue(UserListState);
    const setControlUserIdState = useSetRecoilState(ControlUserIdState);
    const audioAction = (item: UserType) => {
        item.audio = !item.audio;
        muteAudio(item);
        sendMuteAudio(`${item.userId}`, item.audio!);
      }
    const videoAction = (item: UserType) => {
        item.video = !item.video;
        muteVideo(item);
        sendMuteVideo(`${item.userId}`, item.video!);
      }
    const controlAction = (item: UserType) => {
        if(!item.control) return;
        setControlUserIdState({
            userId: `${item.userId}`
        });
        sendControlStart(`${item.userId}`);
        setLoadingMain(true);
      }
    return(
        <div className="user-list" id="userlist">
            {userListState.lists.map((item, index) => 
            <div className="item" key={item.userId}>
            <div className="name">
              <div className="name-first">{ item.userName && item.userName.substring(0, 1)}</div>
              <span>{item.userName}</span>
            </div>
            <div className="btns">
              <div
                className="['btn', item.audio ? 'enable' : 'disable']"
                onClick={audioAction.bind(this, item)}
                title="音频"
              >
                {item.audio ? "&#xe882;" : "&#xe883;"}
              </div>
              <div
                className="['btn', item.video ? 'enable' : 'disable']"
                onClick={videoAction.bind(this, item)}
                title="视频"
              >
                {item.video ? "&#xe696;" : "&#xe69f;"}
              </div>
              <div
                v-if="!item.isLocal"
                className="['btn', item.control ? 'enable' : 'disable disable_stop']"
                onClick={controlAction.bind(this, item)}
                title="控制"
              >
                { item.control ? "&#xe625;" : "&#xe641;" }
              </div>
            </div>
          </div>
            )}
    
  </div>
    )
}