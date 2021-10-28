/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-25 17:09:00
 * @LastEditTime: 2021-10-26 10:36:17
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roomName: string = '';
  userName: string = '';
  role: string = 'teacher';
  constructor(
    private audio: AudioService
  ) { }

  ngOnInit(): void {
    console.log('login componet init');
  }
  login() {
    console.log('login action', this.role, this.userName, this.roomName);
    this.audio.playInroomAudio();
  }
}
