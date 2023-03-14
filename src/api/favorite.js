import request from "@/utils/request";

// 单独给每个url接口封装函数

// 城市列表（热门城市）
export function getFavorite() {
  return request(
    {
      url: "/user/favorites",
      method: "get",
    },
    true
  );
}

export function getLike(params, method) {
  return request({
    url: `/user/favorites/${params}`,
    method,
  });
}
