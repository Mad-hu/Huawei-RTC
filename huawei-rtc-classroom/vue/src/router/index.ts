/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-10-13 17:03:29
 * @LastEditors: Yandong Hu
 * @Description:
 */
import store from "../store";
import { createRouter, createWebHashHistory } from "vue-router";
import Classroom from '../pages/classroom/Classroom.vue';
const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login/login.vue"),
    },
    {
      path: "/classroom",
      name: "classroom",
      component: Classroom,
    }
  ],
});

router.beforeEach((to) => {
  if (to.meta.needLogin && !store.getters["user/isLogin"]) {
    return "/login";
  }
  return true;
});

export default router;
