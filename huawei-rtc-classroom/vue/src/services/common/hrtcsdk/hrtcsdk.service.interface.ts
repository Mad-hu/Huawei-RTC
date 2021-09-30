/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 13:41:48
 * @LastEditTime: 2021-08-05 14:13:34
 * @LastEditors: Yandong Hu
 * @Description: 
 */
export enum HRTCVideoDisplayMode {
    /** 
     * 黑边模式，通过填充黑边的方式保持宽高比。
     */
    'HRTC_VIDEO_DISPLAY_MODE_FIT',    
    /**
     * 裁剪模式，通过裁剪的方式保持宽高比
     */
    'HRTC_VIDEO_DISPLAY_MODE_HIDDEN' ,
    /**
     * 缩放模式，缩放和拉伸视频尺寸以充满显示视窗
     */
    'HRTC_VIDEO_DISPLAY_MODE_FILL',
}