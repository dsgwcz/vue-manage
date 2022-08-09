import Cookie from "js-cookie";
export default {
  state: {
    token: "",
  },
  mutations: {
    // 缓存并设置 token
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    // 清除 Cookie
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    // 获取 Token
    getToken(state) {
      // 如果当前有token,直接获取 state.token ,如果没有则通过Cookie获取
      state.token = state.token || Cookie.get("token");
    },
  },
};
