/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-22 13:44:17
 * @LastEditTime: 2021-10-22 18:49:48
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Lazy } from "./lazy.service.provider";


// class ServiceProvider {
//   lazyBrowserWindowService: Lazy<BrowserWindowService>;
//   constructor() {
//     console.log('ServiceProvider init');
//     this.lazyBrowserWindowService = new Lazy(() => {
//       return new BrowserWindowService(1, 2);
//     });
//   }

//   get BrowserWindowService() {
//     return this.lazyBrowserWindowService.value;
//   }
// }
