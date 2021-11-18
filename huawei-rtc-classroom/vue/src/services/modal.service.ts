/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-12 15:55:23
 * @LastEditTime: 2021-11-12 16:42:54
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { Modal } from "ant-design-vue";

function confirm(title: string, okText = '确定', cancelText = '取消') {
  const promise = new Promise<'ok' | 'cancel'>((resolve, reject) =>{
    Modal.confirm(
      {
        title: title,
        okText: okText,
        cancelText: cancelText,
        onOk() {
          resolve('ok');
        },
        onCancel() {
          resolve('cancel');
        }
      });
  })
  return promise;
}

export {
  confirm
};
