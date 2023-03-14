import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/layout"),
    redirect: "/home",
    children: [
      // 首页
      {
        path: "/home",
        name: "Home",
        component: {
          render(e) {
            return e("router-view");
          },
        },
        children: [
          {
            path: "/home",
            name: "Home",
            component: () => import("@/views/Home"),
          },
          {
            path: "city",
            name: "CityList",
            component: () => import("@/views/CityList"),
          },
        ],
      },
      // 找房
      {
        path: "/house",
        name: "FindHouse",
        component: () => import("@/views/FindHouse"),
      },

      // 信息
      {
        path: "/message",
        component: () => import("@/views/Messages"),
      },
      // 我的
      {
        path: "/my",
        name: "My",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "/my",
            name: "My",
            component: () => import("@/views/My"),
          },
          {
            path: "login",
            name: "Login",
            component: () => import("@/views/Login"),
          },
        ],
      },
    ],
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/search"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("@/views/My/favorites"),
  },
  {
    path: "/myrent",
    name: "MyRent",
    component: () => import("@/views/My/myRent"),
  },
  {
    path: "/gorent",
    name: "goRent",
    component: () => import("@/views/Home/goRent"),
  },
  {
    path: "/deatils",
    name: "Deatils",
    component: () => import("@/views/Deatils"),
  },
  {
    path: "map",
    name: "Map",
    component: () => import("@/views/Map"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
