#!/bin/bash
###
 # @Author: Yandong Hu
 # @github: https://github.com/Mad-hu
 # @Date: 2021-10-09 10:54:23
 # @LastEditTime: 2021-10-09 10:55:20
 # @LastEditors: Yandong Hu
 # @Description: 
### 

echo "start yarn install <Huawei-rtc-classroom-react> project !"
cd ./huawei-rtc-classroom/react && yarn && cd -
echo "start yarn install <Huawei-rtc-electron>"
cd ./huawei-rtc-electron && yarn && cd -