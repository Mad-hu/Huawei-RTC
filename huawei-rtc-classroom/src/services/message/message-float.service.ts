/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 10:33:16
 * @LastEditTime: 2021-08-11 10:47:33
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { ElMessage } from "element-plus";

/**
 * 消息类型
 *
 * @enum {number}
 */
enum MessageType {
  'success',
  'warning',
  'normal',
  'error'
}
/**
 * 成功消息
 *
 * @param {string} msg 消息
 */
const messageFloatSuccess = (msg: string) => {
  ElMessage.success({
    message: msg,
    type: 'success'
  });
}
/**
 * 警告消息
 *
 * @param {string} msg 消息
 */
const messageFloatWarning = (msg: string) => {
  ElMessage.warning({
    message: msg,
    type: 'warning'
  });
}
/**
 * 一般消息
 *
 * @param {string} msg 消息
 */
const messageFloatNormal = (msg: string) => {
  ElMessage(msg);
}

/**
 * 错误通知
 *
 * @param {string} msg 消息
 */
const messageFloatError = (msg: string) => {
  ElMessage.error(msg);
}

/**
 * 顶部悬浮消息通知
 *
 * @param {string} msg 消息
 * @param {MessageType} [type=MessageType.normal] 默认
 */
const messageFloat = (msg: string, type: MessageType = MessageType.normal) => {
  switch(type) {
    case MessageType.success:
      messageFloatSuccess(msg);
      break;
    case MessageType.warning:
      messageFloatWarning(msg);
      break;
    case MessageType.normal:
      messageFloatNormal(msg);
      break;
    case MessageType.error:
      messageFloatError(msg);
      break;
  }
}

export {
  MessageType,
  messageFloatSuccess,
  messageFloatWarning,
  messageFloatNormal,
  messageFloatError,
  messageFloat
}
