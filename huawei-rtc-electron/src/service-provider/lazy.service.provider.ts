/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 13:19:43
 * @LastEditTime: 2021-10-22 14:32:26
 * @LastEditors: Yandong Hu
 * @Description:
 */

export class Lazy<T> {
  creator: () => T;
  cachedValue: T | undefined;
  constructor(creator: () => T) {
      this.creator = creator;
  }
  get value() {
    if(!this.cachedValue) {
      this.cachedValue = this.creator();
    }
    return this.cachedValue;
  }
}
