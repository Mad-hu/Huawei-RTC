/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-09 17:47:15
 * @LastEditTime: 2021-10-20 16:44:51
 * @LastEditors: Yandong Hu
 * @Description: 
 */

import './login.scss';
import { Button, Input, Radio, RadioChangeEvent } from 'antd';
import React from 'react';
import { UserInfoState, UserRole } from '../../services/state-manager/user-state.service';
import { messageFloatError } from '../../services/message/message-float.service';
import { LoadingMainState } from '../../services/state-manager/loading-state.service';
import { useSetRecoilState } from 'recoil';
import { LoginPagePropsTypes } from '../../services/interfaces/page-types.service';
import { RoomNameState } from '../../services/state-manager/classroom-state.service';

let roomName = '';
let userName = '';
export const Login = (props: LoginPagePropsTypes) => {
    const setLoadingMain = useSetRecoilState(LoadingMainState);
    const setUserInfo = useSetRecoilState(UserInfoState);
    const setRoomName = useSetRecoilState(RoomNameState);
    const [role, setRole] = React.useState(UserRole.teacher);

    const inputClassnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        roomName = e.target.value;
    }
    const inputUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userName = e.target.value;
    }
    const radioRoleChange = (e: RadioChangeEvent) => {
        setRole(e.target.value);
    }
    const login = () => {
        try {
            if (roomName === "" || userName === "") {
                messageFloatError("用户或教室不能为空");
                return;
            }
            setLoadingMain(true);
            setRoomName({
                roomName: roomName
            });
            const userId = parseInt((Math.random() * 100000).toFixed(0));
            setUserInfo({
                userName: userName,
                userId: userId,
                role: role
            });
            
            setTimeout(() => {
                props.history.push('/classroom');
                // props.history.push({
                //     pathname: '/classroom',
                //     state: {
                //         userName: userName,
                //         userId: userId,
                //         role: role
                //     }
                // });
            }, 1000);
        } catch (error) { }
    }
    return (
        <div className="login-box">
            <p>登录</p>
            <Input
                placeholder="请输入教室名"
                onChange={inputClassnameChange}
            ></Input>
            <Input
                placeholder="请输入姓名"
                onChange={inputUsernameChange}
            ></Input>
            <div className="role">
                <Radio.Group onChange={radioRoleChange} value={role}>
                    <Radio value={UserRole.teacher}>老师</Radio>
                    <Radio value={UserRole.student}>学生</Radio>
                    <Radio value={UserRole.audience}>访客</Radio>
                </Radio.Group>
            </div>
            <Button type="primary" onClick={login}>进入教室</Button>
        </div>
    )
}