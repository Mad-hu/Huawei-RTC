/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-18 14:06:41
 * @LastEditTime: 2021-08-18 14:13:13
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Button, Input } from 'antd';
import React from 'react';
import { TitleBar } from '../../components/title/title-bar';

export const NoPage = () => {
  let url = 'http://';
  const reload = () => {
    const webview: any = document.getElementById('webview-0');
    webview.src = url;
  }
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    url = e.target.value;
    console.log(url);
  }
  return (
    <div className="no-page">
      <TitleBar></TitleBar>
      <div className="main">

        <div className="title">
          <span>加载失败了，网络有问题。请输入本地或者远程项目地址再试</span>
        </div>
        <Input className="input-box" onChange={changeValue} defaultValue="http://"></Input>

        <Button type="primary" onClick={reload}>
          <span>重新加载</span>
        </Button>
      </div>
    </div>
);
}
