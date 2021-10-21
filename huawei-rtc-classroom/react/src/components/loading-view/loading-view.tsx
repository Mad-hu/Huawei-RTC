/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-20 15:33:26
 * @LastEditTime: 2021-10-21 13:11:34
 * @LastEditors: Yandong Hu
 * @Description: 
 */

import { Spin } from "antd";
import React from "react"
import { useRecoilValue } from "recoil";
import { LoadingMainState, LoadingMainTextState } from "../../services/state-manager/loading-state.service";
export const LoadingView = () => {
  const loadingMainState = useRecoilValue(LoadingMainState);
  const loadingMainTextState = useRecoilValue(LoadingMainTextState);
  return (
    loadingMainState ?
    <Spin size="large" tip={loadingMainTextState} className="loading"/> :
    null
  )
}
