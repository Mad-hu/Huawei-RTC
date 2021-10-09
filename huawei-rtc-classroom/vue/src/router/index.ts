/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-09-18 09:47:46
 * @LastEditors: Yandong Hu
 * @Description:
 */
import store from "../store";
import { createRouter, createWebHashHistory } from "vue-router";
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
      component: () => import("@/pages/classroom/Classroom.vue"),
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