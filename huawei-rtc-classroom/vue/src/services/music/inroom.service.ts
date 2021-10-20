/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-19 16:36:41
 * @LastEditTime: 2021-10-19 17:43:20
 * @LastEditors: Yandong Hu
 * @Description:
 */

export const playInroomAudio = () => {
  const inroomMusicUrl = 'https://dl.aicoders.cn/music/inroom.mp3';
  const inroomMusic = new Audio(inroomMusicUrl);
  inroomMusic.play();
}
