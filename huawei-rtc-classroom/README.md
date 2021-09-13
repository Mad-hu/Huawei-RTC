# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Install

First, clone the repo via git and install dependencies:

```bash
yarn
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn dev
```
## Files Structure
 - public ----
 - script                 buid config
   - SetBuildEvnInject    build and dev sdk config
 - src                    vue project
   - assets               image sourse
   - components           vue comp
   - pages                vue pages
   - router               vue router
   - services             comp services
     - abstrace           skd abstract files.
     - agora              agora sdk impl
     - bjysdk             slsdk impl
     - hrtcsdk            hrtc sdk impl
     - message            element messagebox
     - state-manager      vue state manager
     - wangyi             wangyi IM sdk impl
     - buid.ts            sdk build config
     - classroom.service  classroom global func servcie
     - dialog.service     dialog global func service
     - electron.service   electron global func service
     - loading.service    loading global func service
     - remote-control.service remote control global func service
     - rtc.service        rtc init global func service
     - rtm.service        rtm init global func service
   - store                vite store
   - App.vue              vue page root
   - global.config.scss   scss root
   - main.ts              vuejs root
   - shims-vue.d.ts       vue typing 
   - typings.d.ts         ts typing
   - vite-env.d.ts        vite typing
 - .editorconfig          vscode IDE config
 - .env.development       vue dev environment
 - .env.production        vue prod environment
 - .env.test              vue test environment
 - .gitignore             git ignore
 - index.html             js root
 - tsconfig               tsconfig
 - vite.config            vite config
