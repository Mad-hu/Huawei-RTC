/**
 * @Author: Yupeng Zhang
 * @Description:
 * @Date: 2021-08-04
 */

import Cookies from "js-cookie";
const userModule = {
  namespaced: true,
  state: () => {
    return {
      userInfo: {},
      // heartTimer: ""
    };
  },
  getters: {
    isLogin: (state: any) => {
      return !!state.userInfo.userId;
    },
  },
  mutations: {
    saveUserInfo(state: any, payload: any) {
      state.userInfo = payload;
    },
    saveUserInfoToCookie(state: any, payload: any) {
      // 将user对象 双层转码 可能是为了更难识别 (上个版本就是这么干的)
      const val = encodeURIComponent(
        encodeURIComponent(JSON.stringify(payload))
      );
      // 存入cookie 有效期30min
      const expireTime = new Date(new Date().getTime() + 30 * 60 * 1000);
      Cookies.set("user", val, { expires: expireTime });
    },
  },
  actions: {
    userStorage({
      dispatch,
      state,
      commit,
    }: {
      dispatch: any;
      state: any;
      commit: any;
    }) {

      const val = Cookies.get("user");

      if (!val) {
        return;
      }

      // 判断是否已取值 值不存在则取值
      if (!state.userInfo.userId) {
        const data = JSON.parse(decodeURIComponent(decodeURIComponent(val)));
        commit("saveUserInfo", data);
      }

      // 重新设置cookie
      const expireTime = new Date(new Date().getTime() + 30 * 60 * 1000);
      Cookies.set("user", val, { expires: expireTime });
    },
  },
};

export default userModule;
