/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-13 09:02:45
 * @LastEditTime: 2021-10-29 13:27:50
 * @LastEditors: Yandong Hu
 * @Description:
 */
const path = require('path');
const fse = require('fs-extra')

const srcPath = path.join(__dirname, `../sdk/${process.platform == "win32" ? 'windows': 'mac'}/`);
const destPath = path.join(__dirname, `../sdk/`);

console.log('check hrtc sdk.');
const hrtcPath = path.join(destPath, 'hrtc-electron-sdk.tar.gz');
const bjyPath = path.join(destPath, 'bjysdk.tar.gz');
if(fse.existsSync(hrtcPath)) {
  console.log('hrtc sdk exist! remove.');
  fse.removeSync(hrtcPath);

}
if(fse.existsSync(bjyPath)) {
  console.log('bjy sdk exist! remove.');
  fse.removeSync(bjyPath);
}

fse.copy(srcPath, destPath, function (err) {
  if (err) {
    console.log("copy dir error:" + err);
    throw new Error(err);
  } else {
    console.log("copy sdk ok");
  }
});
