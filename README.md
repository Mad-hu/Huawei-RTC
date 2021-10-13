## 简介
项目一开始并没有开源打算，所有采用react 和 vue混合开发，后续会将不同的地方进行拆分。
## 未来版本
 - 不再使用webview加载前端项目。
 - 使用electron-updater进行更新
 - 删除非华为云项目内容
## 正在进行
 - 拆分项目，将结构修改为 electron + angular / react / vue3 
 - 项目暂时只完成vue3版本，angular和react 项目正在进行中
## 结构
 - huawei-rtc-classroom : angular、react、vue3 web 项目.用于web发布，electron中使用webview加载。由于以前项目使用此方法，并没有使用update asar，这里仅支持这样写。
   - angular 前端angular项目目录
   - react 前端react项目目录
   - vue 前端vue3项目目录
   - sdk-services 与electron rtc进行交互封装的sdk服务，已发布到npm
 - huawei-rtc-electron  : react electron 项目 
   - 前端采用react，主要用于提供native sdk集成，标题栏等非web本地UI控制
   - native 采用nodejs做底层维护
 - nodejs-server 网易云信账号管理接口服务，外网请切换使用声网RTM SDK，切换方法huawei-rtc-classroom\vue\src\services\common\build.ts 修改对应company
## Init
``` js
git clone https://github.com/Mad-hu/Huawei-RTC.git

// option init project.
./npm-init-angular.sh
./npm-init-react.sh
./npm-init-vue3.sh

```
## dev
``` js
// 启动 vue3前端项目
cd huawei-rtc-classroom/vue
yarn
yarn dev
cd ..
// 启动 react electron 项目
cd huawei-rtc-electron
yarn
yarn start

```

