#!/bin/bash
###
 # @Author: Yandong Hu
 # @github: https://github.com/Mad-hu
 # @Date: 2021-09-15 09:47:54
 # @LastEditTime: 2021-10-09 10:55:00
 # @LastEditors: Yandong Hu
 # @Description: 
### 

echo "start yarn install <Huawei-rtc-classroom-angular> project !"
cd ./huawei-rtc-classroom/angular && yarn && cd -
echo "start yarn install <Huawei-rtc-electron>"
cd ./huawei-rtc-electron && yarn && cd -