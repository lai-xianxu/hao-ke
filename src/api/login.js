import request from "@/utils/request";

// 单独给每个url接口封装函数
export function setLogin(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

// 获取用户信息
export function getUserInfo(params) {
  return request(
    {
      url: "/user",
      method: "get",
      params,
    },
    true
  );
}
