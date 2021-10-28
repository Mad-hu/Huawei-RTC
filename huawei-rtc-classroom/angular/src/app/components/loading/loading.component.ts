/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-26 14:14:13
 * @LastEditTime: 2021-10-26 14:14:32
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'star-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  @Input() text!: string;

  constructor() {
  }

  ngOnInit() {
  }

}
