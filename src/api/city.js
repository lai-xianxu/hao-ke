import request from "@/utils/request";

// 单独给每个url接口封装函数

// 城市列表（热门城市）
export function getHotCitys() {
  return request({
    url: "/area/hot",
    method: "get",
  });
}
// 城市列表
export function getCityList(params) {
  return request(
    {
      url: "/area/city",
      method: "get",
      params,
    },
    true
  );
}
