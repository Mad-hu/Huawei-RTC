/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 13:33:13
 * @LastEditTime: 2021-10-20 15:39:14
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './global.config.scss';
import { RootRouter } from './router';
import { RecoilRoot } from 'recoil';
import { LoadingView } from './components/loading-view/loading-view';

const RootApp = () => {
  return (
    <React.StrictMode>
      <LoadingView></LoadingView>
      <RootRouter />
    </React.StrictMode>
  )
}
ReactDOM.render(
  <RecoilRoot>
    <RootApp></RootApp>
  </RecoilRoot>
  ,
  document.getElementById('root')
);
