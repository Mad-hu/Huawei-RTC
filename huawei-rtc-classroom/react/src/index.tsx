/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 13:33:13
 * @LastEditTime: 2021-10-09 18:10:55
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './global.config.scss';
import { RootRouter } from './router';
import { RecoilRoot } from 'recoil';
ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <RootRouter />
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById('root')
);
