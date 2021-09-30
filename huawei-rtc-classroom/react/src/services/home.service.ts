/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-09-30 14:18:59
 * @LastEditTime: 2021-09-30 15:15:08
 * @LastEditors: Yandong Hu
 * @Description: 
 */
interface AType {
    num: number
}
interface BType {
    num: number
}
let a: AType;
let b: BType;
const add = () => {
    a = {num : 1};
    b = {num : 2};
    return a.num + b.num;
}

export {
    add
}