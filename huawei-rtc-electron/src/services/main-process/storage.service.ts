/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2022-03-07 11:21:48
 * @LastEditTime: 2022-03-07 11:21:49
 * @LastEditors: Yandong Hu
 * @Description:
 */
const storage = require('electron-json-storage');

export const removeStorage = (key,err=(err)=>{}) => {
    storage.remove(key, err);
}
export const clearStorage = (err=(err)=>{}) => {
    storage.clear(function(error) {
        if (error) err(error);
    });
}
export const setStorage = (key,params,error=(err)=>{}) => {
    const curTime = new Date().getTime();
    params.expirationCurTime = curTime;
    storage.set(key, params, error);
}
export const getStorage = (key ,callback,errorCallback=(err)=>{}) => {
    storage.get(key ,function(error, data) {
        if (error){
            errorCallback(error);
            callback();
            return;
        };
        callback(data);
      });
}

export const getStorageAsync = (key) => {
  return new Promise((resolve, reject) => {
    storage.get(key ,function(error, data) {
      if (error){
          resolve(undefined);
          return;
      };
      resolve(data);
    });
  })
}
