export interface ControlEventType {
    /**
     * sdk进程提醒
     *
     * @type {string}
     * @memberof ControlEventType
     */
    notic: string;
    /**
     * session 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    session: string;
    /**
     * address 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    address: string;
    /**
     * error 信息
     *
     * @type {string}
     * @memberof ControlEventType
     */
    error: string;
}
