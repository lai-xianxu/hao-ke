import request from "@/utils/request";

// 单独给每个url接口封装函数

// 城市列表（热门城市）
export function getMyRent() {
  return request(
    {
      url: "/user/houses",
      method: "get",
    },
    true
  );
}
