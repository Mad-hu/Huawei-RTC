/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-06 14:36:01
 * @LastEditTime: 2021-08-10 13:38:09
 * @LastEditors: Yandong Hu
 * @Description:
 */
const fs = require('fs');
const path = require('path');
const filepath = path.resolve(__dirname, '../src/services/build.ts');
const company = process.env.company;
const sdk_platform = process.env.sdk_platform;
const build_huawei_electron = `
export const sdk_build_config = {
  company: '${company}',
  rtc: {
    company: '${company}',
    platform: '${sdk_platform}'
  },
  rtm: {
    company: '${company == 'agora'? 'agora': 'wangyi'}'
  },
  remotecontrol: {
    company: 'bjy'
  }
};
`

fs.writeFile(filepath, build_huawei_electron, err => {
  if(err) {
    throw err;
  }
  console.log('setting build rtc rtm sdk success!', company, sdk_platform);
});
