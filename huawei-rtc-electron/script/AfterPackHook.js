/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-13 09:02:45
 * @LastEditTime: 2021-09-13 10:44:56
 * @LastEditors: Yandong Hu
 * @Description:
 */

const appconfig  = require('../package.json');
const path = require('path');
const fse = require('fs-extra')

function copyRemoteMacFramework(context, type) {
  const start = new Date().getTime();
  let t = new Promise(function (resolve, reject) {
    const slsdkPath = path.join(__dirname, `../src/node_modules/bjysdk/platform/mac/slsdk.framework`);
    const destPath = `${context.appOutDir}/${appconfig.build.productName}.app/Contents/Frameworks/slsdk.framework`;
    fse.copy(slsdkPath, destPath, function (err) {
      if (err) {
        reject("copy dir error:" + err);
      } else {
        resolve("copyRemoteMacFramework ok" + "consume time:" + (new Date().getTime() - start));
      }
    });
  });
  return t;
}

exports.default = async function (context) {
  console.log('=============== start copy other comp ========================');
  if (process.platform == 'darwin') {
    const res = await copyRemoteMacFramework(context, 'mac');
    console.log(res);
  } else {

  }
  console.log('=============== copy finished! ==================');
}
