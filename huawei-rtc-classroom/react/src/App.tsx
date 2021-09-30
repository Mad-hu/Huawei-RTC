/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 13:33:13
 * @LastEditTime: 2021-09-30 17:12:41
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { RtcService } from './services/common/rtc.service';
// import { RtcService } from 'hrtc-sdk-services';
export default class App extends React.Component {
  componentDidMount() {
    try {
      // RtcService
      // RtcService();
    } catch (error) {
      console.error(error);
    }
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}