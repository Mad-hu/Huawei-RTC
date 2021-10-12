/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-13 09:02:45
 * @LastEditTime: 2021-10-12 17:06:52
 * @LastEditors: Yandong Hu
 * @Description:
 */
const path = require('path');
const fse = require('fs-extra')

const srcPath = path.join(__dirname, `../sdk/${process.platform == "win32" ? 'windows': 'mac'}/`);
const destPath = path.join(__dirname, `../sdk/`);

console.log('check hrtc sdk.');
if(fse.existsSync(path.join(destPath, 'hrtc-electron-sdk.tar.gz'))) {
  console.log('sdk exist!');
  return;
}
fse.copy(srcPath, destPath, function (err) {
  if (err) {
    console.log("copy dir error:" + err);
    throw new Error(err);
  } else {
    console.log("copy sdk ok");
  }
});
