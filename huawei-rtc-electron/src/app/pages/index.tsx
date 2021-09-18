/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-03 09:37:35
 * @LastEditTime: 2021-09-18 09:52:51
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Spin } from 'antd';
import { ipcRenderer } from 'electron';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from './home/Home';
import { NoPage } from './nopage/NoPage';
// import UpdatePage from './update/UpdatePage';
interface Props {

}
interface State {
  loading: boolean,
  noPage: boolean
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      noPage: false
    }
  }
  componentDidMount() {
    const webview: any = document.getElementById('webview-0');
    // webview.openDevTools();
    ipcRenderer.on('controlEvent', (event: any, type: any, msg: any) => {
      webview.send('controlEvent', type, msg);
    });
    this.webviewListen();
  }

  webviewListen() {
    const webview: any = document.getElementById('webview-0');

    webview.src = `http://localhost:8088`;
    // 对loadingView得一些操作。
    webview.addEventListener('did-fail-load', (errorCode: any, errorDescription: any, validatedURL: any, isMainFrame: any) => {
      this.setState({
        noPage: true
      })
    });
    webview.addEventListener('did-start-loading', (errorCode: any, errorDescription: any, validatedURL: any, isMainFrame: any) => {
      this.setState({
        loading: true,
        noPage: false
      })
    });

    webview.addEventListener('did-stop-loading', (errorCode: any, errorDescription: any, validatedURL: any, isMainFrame: any) => {
      this.setState({
        loading: false
      });
    });
  }
  render() {
    return(
      <Fragment>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
            {/* <Route path="/" component={UpdatePage} /> */}
          </Switch>
        </Router>
        {
          this.state.loading?
            <div className="loadingView">
              <Spin size="large" />
            </div>: null
        }
        {
          this.state.noPage?
            <NoPage></NoPage>:null
        }
      </Fragment>
    )
  }
}
