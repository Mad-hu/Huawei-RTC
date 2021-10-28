/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 13:19:43
 * @LastEditTime: 2021-10-28 14:25:31
 * @LastEditors: Yandong Hu
 * @Description:
 */

export class Lazy<T> {
  private creator: () => T;
  private cachedValue: T | undefined;
  constructor(creator: () => T) {
      this.creator = creator;
  }
  get instance() {
    if(!this.cachedValue) {
      this.cachedValue = this.creator();
    }
    return this.cachedValue;
  }
  release() {
    this.cachedValue = undefined;
  }
}
