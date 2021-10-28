/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-26 10:14:42
 * @LastEditTime: 2021-10-26 14:14:46
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBoardsComponent } from './classroom/main-boards/main-boards.component';
import { StudentListComponent } from './classroom/student-list/student-list.component';
import { TeacherViewComponent } from './classroom/teacher-view/teacher-view.component';
import { ToolsBarComponent } from './classroom/tools-bar/tools-bar.component';
import { UserListviewComponent } from './classroom/user-listview/user-listview.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    MainBoardsComponent,
    StudentListComponent,
    TeacherViewComponent,
    ToolsBarComponent,
    UserListviewComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
