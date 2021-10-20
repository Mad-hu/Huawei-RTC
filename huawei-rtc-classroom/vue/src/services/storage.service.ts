/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-15 18:14:11
 * @LastEditTime: 2021-10-19 13:20:11
 * @LastEditors: Yandong Hu
 * @Description:
 */
import StoreJsAPI from "store";

const setStorage = (key: string, value: any) => {
  StoreJsAPI.remove(key);
  StoreJsAPI.set(key, value);
}
const getStorage = (key: string) => {
  return StoreJsAPI.get(key);
}
export {
  setStorage,
  getStorage
}
