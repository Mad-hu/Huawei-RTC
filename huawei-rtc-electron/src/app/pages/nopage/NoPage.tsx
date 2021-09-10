/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-18 14:06:41
 * @LastEditTime: 2021-08-18 14:13:13
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Button } from 'antd';
import React from 'react';
import { TitleBar } from '../../components/title/title-bar';

export const NoPage = () => {
  const reload = () => {
    const webview: any = document.getElementById('webview-0');
    webview.reload();
  }
  return (
    <div className="no-page">
      <TitleBar></TitleBar>
      <div className="main">

        <div className="title">
          <span>加载失败了，网络有问题。</span>
        </div>

        <Button type="primary" onClick={reload}>
          <span>重新加载</span>
        </Button>
      </div>
    </div>
);
}
