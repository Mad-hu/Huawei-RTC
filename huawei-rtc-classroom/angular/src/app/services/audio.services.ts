/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-26 10:31:01
 * @LastEditTime: 2021-10-26 10:31:03
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(
  ) {
  }
  playInroomAudio() {
    const inroomMusicUrl = 'https://dl.aicoders.cn/music/inroom.mp3';
    const inroomMusic = new Audio(inroomMusicUrl);
    inroomMusic.play();
  }
}
