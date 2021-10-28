/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-25 17:14:57
 * @LastEditTime: 2021-10-26 14:18:12
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClassroomComponent } from './classroom/classroom.component';


@NgModule({
  declarations: [
    LoginComponent,
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
})
export class PagesModule {
}
