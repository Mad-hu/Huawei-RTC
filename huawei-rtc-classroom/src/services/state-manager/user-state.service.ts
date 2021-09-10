/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-11 09:49:22
 * @LastEditTime: 2021-09-10 13:32:07
 * @LastEditors: Yandong Hu
 * @Description:
 */

import { reactive } from "vue";

interface TeacherInfo {
  userName: string,
  userId: number,
  role: string
}
interface StudentInfo {
  userName: string,
  userId: number,
  role: string
}
const studentInfo: StudentInfo = {
  userName: '',
  userId: 0,
  role: 'student'
};
const teacherInfo: TeacherInfo = {
  userName: '',
  userId: 0,
  role: 'teacher'
};
export const TeacherInfoState = reactive(studentInfo);
export const StudentInfoState = reactive(teacherInfo);
