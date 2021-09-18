#!/bin/bash

echo "start yarn install <Huawei-rtc-classroom> project !"
cd ./huawei-rtc-classroom && yarn && cd -
echo "start yarn install <Huawei-rtc-electron>"
cd ./huawei-rtc-electron && yarn && cd -