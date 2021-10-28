/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-09 10:39:54
 * @LastEditTime: 2021-10-26 14:19:05
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { MainBoardsComponent } from './components/classroom/main-boards/main-boards.component';
import { StudentListComponent } from './components/classroom/student-list/student-list.component';
import { TeacherViewComponent } from './components/classroom/teacher-view/teacher-view.component';
import { ToolsBarComponent } from './components/classroom/tools-bar/tools-bar.component';
import { UserListviewComponent } from './components/classroom/user-listview/user-listview.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClassroomComponent,
    MainBoardsComponent,
    StudentListComponent,
    TeacherViewComponent,
    ToolsBarComponent,
    UserListviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule,
    NzRadioModule,
    NzSpinModule,
    NzModalModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
