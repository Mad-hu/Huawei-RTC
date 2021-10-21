/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-20 14:57:22
 * @LastEditTime: 2021-10-21 12:11:06
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import { atom } from "recoil";

export const LoadingMainTextState = atom({
    key: 'LoadingMainState',
    default: 'loading...'
});
export const LoadingMainState = atom({
    key: 'LoadingMainState',
    default: false
});