## 简介
项目一开始并没有开源打算，所有采用react 和 vue混合开发，后续会将不同的地方进行拆分。
## 未来版本
 - 不再使用webview加载前端项目。
 - 使用electron-updater进行更新
 - 删除非华为云项目内容
## 正在进行
 - 拆分项目，将结构修改为 electron + vue 
 - 拆分项目，将结构修改为 electron + react
 - 拆分项目，将结构修改为 electron + angular
## 结构
 - huawei-rtc-classroom : angular、react、vue3 web 项目.
   - 用于web发布，electron中使用webview加载。由于以前项目使用此方法，并没有使用update asar，这里仅支持这样写。
 - huawei-rtc-electron  : react electron 项目 
   - 采用react，主要用于提供native sdk集成，标题栏控制等
## Init
``` js
git clone https://github.com/Mad-hu/Huawei-RTC.git
./npm-init.sh

```
## dev
``` js
// 启动 vue前端项目
cd huawei-rtc-classroom
yarn
yarn dev
cd ..
// 启动 react electron 项目
cd huawei-rtc-electron
yarn
yarn start

```

