/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-26 10:31:01
 * @LastEditTime: 2021-10-26 14:00:13
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Injectable } from '@angular/core';
const StoreJsAPI = require('store')
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
  ) {
  }
  setStorage(key: string, value: any) {
    StoreJsAPI.remove(key);
    StoreJsAPI.set(key, value);
  }
  getStorage(key: string) {
    return StoreJsAPI.get(key);
  }
}
