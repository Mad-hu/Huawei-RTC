<p>
  HuaWeiRtcByElectron uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>
<br>
 
## Install

First, clone the repo via git and install dependencies:

```bash
yarn
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```
## Update SDK Info
```nodejs
yarn cache clean
yarn install
```
## Files Structure
 - .erb         webpack config
 - .vscode      vscode config
 - assets       electron image sourse ...
 - script       build and package scripts
   - Preinstall.js      cpy sdk
   - AfterPackHook.js   electron-builder afterScript, cpy slsdk.framework
 - sdk          hrtc sdk、slsdk ...
 - src          react project
   - app
     - components     react components
     - interface      ts interface
     - pages          UI pages
       - index.tsx    router and webview url config
     - services       components servcies
   - assets           react image sourse ...
   - iconfont         iconfont dir
   - node             main process comp
   - App.global.scss  main scss index
   - index.html       js root
   - index.tsx        react root
   - main.dev.ts      main process root
   - preload.js       render process injectscript
 - .editorconfig  vscode IED config
 - .eslintignore  eslint ignore
 - .eslintrc      eslint config
 - .gitattributes git files config
 - .gitignore     git ignore
 - babel.config   babel config
 - tsconfig       ts config
 - typing.d.ts    ts typing
