import Vue from "vue";
import VueRouter from "vue-router";
// 全局引入
// import Home from "../views/Home.Vue";

// 解决两次访问相同路由报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    // 按需引入
    component: () => import("../views/Main.vue"),
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => import("../views/home"),
      // },
      // {
      //   path: "/user",
      //   name: "user",
      //   component: () => import("../views/User"),
      // },
      // {
      //   path: "/mall",
      //   name: "mall",
      //   component: () => import("../views/mall"),
      // },
      // {
      //   path: "/page1",
      //   name: "page1",
      //   component: () => import("../views/other/pageOne.vue"),
      // },
      // {
      //   path: "/page2",
      //   name: "page2",
      //   component: () => import("../views/other/pageTwo.vue"),
      // },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/login.vue"),
  },
  {
    path: "",
    redirect: "/home",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
