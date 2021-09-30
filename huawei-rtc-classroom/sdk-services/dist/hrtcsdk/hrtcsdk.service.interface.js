"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HRTCVideoDisplayMode = void 0;
/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 13:41:48
 * @LastEditTime: 2021-08-05 14:13:34
 * @LastEditors: Yandong Hu
 * @Description:
 */
var HRTCVideoDisplayMode;
(function (HRTCVideoDisplayMode) {
    /**
     * 黑边模式，通过填充黑边的方式保持宽高比。
     */
    HRTCVideoDisplayMode[HRTCVideoDisplayMode["HRTC_VIDEO_DISPLAY_MODE_FIT"] = 0] = "HRTC_VIDEO_DISPLAY_MODE_FIT";
    /**
     * 裁剪模式，通过裁剪的方式保持宽高比
     */
    HRTCVideoDisplayMode[HRTCVideoDisplayMode["HRTC_VIDEO_DISPLAY_MODE_HIDDEN"] = 1] = "HRTC_VIDEO_DISPLAY_MODE_HIDDEN";
    /**
     * 缩放模式，缩放和拉伸视频尺寸以充满显示视窗
     */
    HRTCVideoDisplayMode[HRTCVideoDisplayMode["HRTC_VIDEO_DISPLAY_MODE_FILL"] = 2] = "HRTC_VIDEO_DISPLAY_MODE_FILL";
})(HRTCVideoDisplayMode = exports.HRTCVideoDisplayMode || (exports.HRTCVideoDisplayMode = {}));
