/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-21 11:11:44
 * @LastEditTime: 2021-10-21 13:08:12
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import './student-list.scss';
import { useRecoilValue } from "recoil"
import { UserListState } from "../../../services/state-manager/classroom-state.service"

export const StudentList = () => {
    const userListState = useRecoilValue(UserListState);
    return (
        <div className="stu-lists">
            {userListState.lists.map((item, index) => 
            <div className="stu-item" key={item.userId}>
                <div className="stu-render" id="`user_${item.userId}`"></div>
                {!item.video && <div className="close">已关闭</div>} 
                <div className="stu-info-con">
                    <div className="name">{item.userName}</div>
                    <div className="userId">{item.userId}</div>
                </div>
            </div>
            )}
        </div>
    );
}