import request from "@/utils/request";

// 单独给每个url接口封装函数
// 轮播图
export function getSwipes() {
  return request({
    url: "/home/swiper",
    method: "get",
  });
}
// 租房小组
export function getGroups(params) {
  return request({
    url: "/home/groups",
    method: "get",
    params,
  });
}
