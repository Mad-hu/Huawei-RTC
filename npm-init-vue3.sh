#!/bin/bash
###
 # @Author: Yandong Hu
 # @github: https://github.com/Mad-hu
 # @Date: 2021-10-09 10:54:22
 # @LastEditTime: 2021-10-09 10:55:35
 # @LastEditors: Yandong Hu
 # @Description: 
### 

echo "start yarn install <Huawei-rtc-classroom-vue3> project !"
cd ./huawei-rtc-classroom/vue3 && yarn && cd -
echo "start yarn install <Huawei-rtc-electron>"
cd ./huawei-rtc-electron && yarn && cd -