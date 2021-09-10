/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-02 11:48:49
 * @LastEditTime: 2021-09-02 12:16:21
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { VNodeTypes } from '@vue/runtime-core';
import {Modal} from 'ant-design-vue';

export const openDialog = (component: VNodeTypes) => {
  return Modal.info({
    content: component,
    mask: true,
    maskClosable: true
  })
}
