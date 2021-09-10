/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-18 14:06:41
 * @LastEditTime: 2021-08-18 15:55:29
 * @LastEditors: Yandong Hu
 * @Description:
 */
import React from 'react';
var ipcRenderer = require('electron').ipcRenderer;
var clientType = '';
var node_dev = 'development'; // production
var selectIndex = 0;

enum AudioNameTypes {
  bg = 'bg',
  click = 'click',
  hover = 'hover'
}
export default class UpdatePage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.asarCheck();
    }, 1000);
    const body: any = document.getElementsByTagName('body')[0];
    body.style.background = 'transparent';
  }
  audioNames = {
    bg: './assets/images-update/audio/bg.mp3',
    click: './assets/images-update/audio/click.mp3',
    hover: './assets/images-update/audio/hover.mp3'
  };
  playAudio(name: AudioNameTypes) {
    var audio = new Audio(this.audioNames[name]);
    audio.play();
  }
  noAllow() {
    this.playAudio(AudioNameTypes.click);
    alert('暂不开放');
  }
  closeUpdateBtnAction() {
    const updateInfoBox: any = document.getElementById('updateInfoBox');
    updateInfoBox.style.display = 'none';
  }
  closeBtnAction() {
    this.playAudio(AudioNameTypes.click);
    ipcRenderer.send('close');
  }
  minBtnAction() {
    this.playAudio(AudioNameTypes.click);
    ipcRenderer.send('min');
  }
  btnSelected(index: number) {
    this.playAudio(AudioNameTypes.click);
    const btns = document.querySelectorAll(".btn");
    switch (index) {
      case 0:
        btns[index].classList.add('btn-selected');
        btns[1].classList.remove('btn-selected');
        btns[2].classList.remove('btn-selected');
        break;
      case 1:
        btns[index].classList.add('btn-selected');
        btns[0].classList.remove('btn-selected');
        btns[2].classList.remove('btn-selected');
        break;
      case 2:
        btns[index].classList.add('btn-selected');
        btns[0].classList.remove('btn-selected');
        btns[1].classList.remove('btn-selected');
        break;
    }
    selectIndex = index;
  }
   devradioChange(envType: any) {
    this.playAudio(AudioNameTypes.click);
    node_dev = envType;
    console.log(node_dev);
  }

     startBtnAction() {
      this.playAudio(AudioNameTypes.click);
      const checkId: any = document.getElementById('checkId');
      const submit: any = document.getElementById('submit');
      if (checkId.innerText == '更新失败') {
        submit.innerText = '正在重试..';
        ipcRenderer.send('retryDownload');
        return;
      }
      if (checkId.innerText != '更新完成') {
        return;
      }
      console.log(selectIndex);
      switch (selectIndex) {
        case 0:
          clientType = 'normal';
          break;
        case 1:
          clientType = 'star';
          break;
        case 2:
          clientType = 'tts';
          break;
      }
      const args = { clientType, node_dev }; // production development
      setTimeout(() => {
        ipcRenderer.send('redirectURL', args);
      }, 300);
    }
     processOver(per: any) {
      const process: any = document.getElementById('process');
      process.style.width = per + '%';
    }
     checkTextChange() {
      const checkId: any = document.getElementById('checkId');
      const textArr = [
        {
          text: '正在检测设备...',
          process: 10,
          time: 300
        },
        {
          text: '正在测试音频设备...',
          process: 20,
          time: 600
        },
        {
          text: '正在测试视频设备...',
          process: 30,
          time: 900
        },
        {
          text: '正在检查更新...',
          process: 50,
          time: 1200
        },
        {
          text: '更新完成',
          process: 100,
          time: 1500
        },
      ]
      textArr.map((value, index) => {
        setTimeout(() => {
          checkId.innerText = value.text;
          this.processOver(value.process);
        }, value.time);
      })
    }

    checkUpdateDemo() {
      const submit: any = document.getElementById('submit');
      this.checkTextChange();
      setTimeout(() => {
        submit.classList.remove('startBtnNoAllow');
      }, 1500);
    }

     updateAsarInforChange(text: any, process: any) {
      const checkId: any = document.getElementById('checkId'); // 文字描述
      checkId.innerText = text;
      this.processOver(process);

    }
  asarCheck() {
    const submit: any = document.getElementById("submit");
    let updateInfo = [];
    submit.innerText = '请稍等..';
    submit.classList.add('startBtnNoAllow');

    ipcRenderer.send('checkUpdate');
    ipcRenderer.on('updateStart', (event: any, arg: any) => {
      if (arg.update) {
        const donBox: any = document.getElementById('downloadBox');
        donBox.style.display = 'flex';
      } else {
        submit.innerText = '启动客户端';
        this.checkUpdateDemo();
      }
    });

    ipcRenderer.on('updatePre', (event: any, arg: any) => {
      const { state, body } = arg;
      const percent = state.percent * 100;
      const total = (state.size.total / 1024 / 1024).toFixed(2);
      const transferred = (state.size.transferred / 1024 / 1024).toFixed(2);
      const elapsed = state.time.elapsed;// 已用时
      const remaining = (state.time.remaining).toFixed(0); //剩余时间
      const speed = (state.speed / 1024).toFixed(0);
      this.updateAsarInforChange('请稍后，正在下载更新...', percent);
      // document.getElementById('total').innerText = total;
      // document.getElementById('transferred').innerText = transferred;
      // document.getElementById('remaining').innerText = remaining;
      // document.getElementById('speed').innerText = speed;
      submit.innerText = '请稍等 ' + percent.toFixed(1) + "%";
      if (body && updateInfo.length == 0) {
        const updateInfoBox: any = document.getElementById('updateInfoBox');
        updateInfoBox.style.display = 'flex';
        updateInfo = body.info.split('--');
        const uibContent = document.getElementById('uibContent');
        let uibhtml = "";
        updateInfo.map((value: any, index: any) => {
          uibhtml = uibhtml + '<div>' + value + '</div>'
        });
        // uibContent.innerHTML = uibhtml;
      }

      if (percent >= 100) {
        // document.getElementById('downloadBox').style.display = 'none';
        this.updateAsarInforChange('更新完成', 100);
        submit.innerText = '启动客户端';
      }
    });

    ipcRenderer.on('updateError', (event: any, arg: any) => {
      console.log(arg);
      this.updateAsarInforChange('更新失败', 100);
      submit.innerText = '重试';
      // this.setState({
      //     errorText:'更新失败：' + arg,
      //     retry:true
      // });
    });
  }
  render() {
    return(
      <div className="update">
        <div className="container">
        <img className="leftimg" src="./assets/images-update/yes.png" />
        <div className="mainBox">
          <div className="main-top">
            <div className="tedulogo"></div>
            <div className="window-tab">
              <a className="tab tab-select" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                href="http://test-61it.aicoders.cn/setting/person-data">我的</a>
              <a className="tab" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                href="http://test-61it.aicoders.cn/class-center/list">课程</a>
              <a className="tab" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                href="http://test-61it.aicoders.cn/refund">礼包</a>
              <a className="tab" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                href="http://test-61it.aicoders.cn/refund">续费/充值</a>
            </div>
            <div className="user" onClick={this.noAllow.bind(this)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
            <div className="settingBox">
              <div className="other" onClick={this.noAllow.bind(this)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
              <div className="settingBoxText minBtn" onClick={this.minBtnAction.bind(this)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
              <div className="settingBoxText closeBtn" onClick={this.closeBtnAction.bind(this)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
            </div>
          </div>
          <div className="main-middle">
            <div className="blur-m"></div>
            <div className="btnBox">
              <div className="up"></div>
              <div className="btnBoxMain">
                <div className="btn btn-selected" onClick={this.btnSelected.bind(this, 0)}>
                  <div className="zdjy-logo" onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
                  <div className="logo-t">重点教育2.0</div>
                </div>
                <div className="btn" onClick={this.btnSelected.bind(this, 1)}>
                  <div className="logo" onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
                  <div className="logo-t">星空版</div>
                </div>
                <div className="btn" onClick={this.btnSelected.bind(this, 2)}>
                  <div className="logo" onMouseOver={() => this.playAudio(AudioNameTypes.hover)}></div>
                  <div className="logo-t">TTS</div>
                </div>
              </div>
              <div className="down"></div>
            </div>
            <div className="mid-cont">
              <div className="webview-container">
                <div className="newsBox">
                  <div className="news-hot">
                    <img src="./assets/images-update/laba.png" />
                    <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://www.monthofcode.cn/" className="news-t">2019年“1小时编程”活动即将开启！</a>
                    <img src="./assets/images-update/home.png" />
                    <a className="news-home" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://www.monthofcode.cn/">官方首页</a>
                  </div>
                  <div className="newsLists">
                    <div className="list-left"></div>
                    <div className="list-right">
                      <div className="list-header">
                        <div style={{display: 'flex'}}>
                          <a className="list-header-tab list-header-tab-selected" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)}
                            onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://test-61it.aicoders.cn/news/list">综合</a>
                          <a className="list-header-tab" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)}
                            onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://test-61it.aicoders.cn/news/list">新闻</a>
                          <a className="list-header-tab" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)}
                            onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://test-61it.aicoders.cn/news/list">公告</a>
                          <a className="list-header-tab" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)}
                            onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://test-61it.aicoders.cn/news/list">活动</a>
                        </div>
                        <a className="list-header-more" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)}
                          onMouseOver={() => this.playAudio(AudioNameTypes.hover)} href="http://test-61it.aicoders.cn/news/list">更多</a>
                      </div>
                      <div className="list-main">
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://www.monthofcode.cn/" className="lm-t" title="[活动] 2019年'编程一小时即将开始，报名链接点我！">
                          [公告] 2019年'编程一小时即将开始，报名链接点我！</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://www.monthofcode.cn/" className="lm-t" title="[活动] 童程童美万名学员邀你开启“全球编程1小时”！">
                          [活动] 童程童美万名学员邀你开启“全球编程1小时”！</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://test-61it.aicoders.cn/news/detail?id=5258" className="lm-t" title="[活动] 感恩节即将来临，爱要“码”上行动！">[活动]
                          感恩节即将来临，爱要“码”上行动！</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://test-61it.aicoders.cn/news/detail?id=5253" className="lm-t" title="[国内营地] 童程童美•北京清华AI精英创投挑战营报名开启！">
                          [国内营地] 童程童美•北京清华AI精英创投挑战营报名开启！</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://818test.tedus.cn/winners" className="lm-t" title="[公告] 《北京市青年创意编程节》已结束，获奖名单已公布在官网！">
                          [公告]《北京市青年创意编程节》已结束，获奖名单已公布在官网！</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://818test.tedus.cn" className="lm-t" title="[公告] 818全国赛成绩单已经公布，详询校区老师或到报名网站查看">
                          [公告]
                          818全国赛成绩单已经公布，详询校区老师或到报名网站查看</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://818test.tedus.cn/bjcybc" className="lm-t" title="[活动] 《北京市青年创意编程节》正式开启，快来参加吧！">[活动]
                          《北京市青年创意编程节》正式开启，快来参加吧！</a>
                        <a target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                          href="http://www.monthofcode.cn/" className="lm-t" title="[活动] “1小时编程”活动在北京国家体育馆正式开启，达内CEO韩少云发表主旨演讲">
                          [活动]
                          “1小时编程”活动在北京国家体育馆正式开启，达内CEO韩少云发表主旨演讲</a>
                      </div>
                      <div className="list-bottom">

                      </div>
                    </div>
                  </div>
                  <div className="newsBtns">
                    <a className="newsBtn" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                      href="http://test-61it.aicoders.cn/class-center/list">最新课程</a>
                    <div className="newsBtn-line"></div>
                    <a className="newsBtn" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                      href="http://test-61it.aicoders.cn/home">家长监护</a>
                    <div className="newsBtn-line"></div>
                    <a className="newsBtn" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                      href="http://test-61it.aicoders.cn/regist?cbUrl=%2Fhome">体验课</a>
                    <div className="newsBtn-line"></div>
                    <a className="newsBtn" target="_blank" onClick={() => this.playAudio(AudioNameTypes.click)} onMouseOver={() => this.playAudio(AudioNameTypes.hover)}
                      href="http://test-61it.aicoders.cn/home">新用户预约</a>
                  </div>
                </div>
                <div className="updateInfoBox" style={{display: 'none'}} id="updateInfoBox">
                  <div className="uibMain">
                    <div className="uibTitle">
                      更新日志
                      <div className="closeBtn" onClick={this.closeUpdateBtnAction.bind(this)}></div>
                    </div>
                    <div className="uibContent" id="uibContent">
                    </div>
                  </div>
                </div>
              </div>
              <div className="mid-cont-bottom">
                <div className="check">
                  <div className="checkText" id="checkId">正在链接服务器...</div>
                  <div className="checkProcessBox">
                    <div className="ant-progress-outer">
                      <div className="ant-progress-inner">
                        <div className="ant-progress-bg" style={{width: '0%', height: 8}} id="process">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="downloadinfor" id="downloadBox" style={{display: 'none'}}>
                    <div>
                      总大小：<span id="total"></span>M
                    </div>
                    <div>
                      已完成：<span id="transferred"></span>M
                    </div>
                    <div>下载速度:<span id="speed"></span>kbps/s</div>
                    <div>剩余时间:<span id="remaining"></span>s</div>
                  </div>
                </div>
                <div className="dev-select">
                  <div className="radio">
                    <input type="radio" id="devRadio" name="envCheck" value="development" checked onChange={this.devradioChange.bind(this, 'development')} />
                    <label className="radio-label" onMouseOver={() => this.playAudio(AudioNameTypes.hover)}>测试环境</label>
                  </div>

                  <div className="radio">
                    <input type="radio" id="prodRadio" name="envCheck" value="production" onChange={this.devradioChange.bind(this, 'production')}/>
                    <label className="radio-label" onMouseOver={() => this.playAudio(AudioNameTypes.hover)}>正式环境</label>
                  </div>
                </div>
                <div className="startBtn" onClick={this.startBtnAction.bind(this)} id="submit" onMouseOver={() => this.playAudio(AudioNameTypes.hover)}>启动客户端</div>
              </div>
            </div>
          </div>
        <div className="main-bottom">
          <div className="version">当前版本：<span>2.1.16.36961</span></div>
        </div>
      </div>
  </div>
  </div>
    )
  }
}
