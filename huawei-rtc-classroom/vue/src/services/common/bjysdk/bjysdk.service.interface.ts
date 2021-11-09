/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-27 17:54:35
 * @LastEditTime: 2021-11-04 14:19:56
 * @LastEditors: Yandong Hu
 * @Description:
 */
export interface ControlEventType {
    /**
     * sdk进程提醒
     *
     * @type {string}
     * @memberof ControlEventType
     */
    notic: string,
    /**
     * session 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    session: string,
    /**
     * address 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    address: string,
    /**
     * error 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    error: string,
    /**
     * 销毁 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    destroy: string
}
