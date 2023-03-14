import request from "@/utils/request";

// 找房（下拉弹窗）
export function getAreas(params) {
  return request({
    url: "/houses/condition",
    method: "get",
    params,
  });
}

// 房屋列表
export function getHouseList(params) {
  return request(
    {
      url: "/houses",
      method: "get",
      params,
    },
    true
  );
}

// 去出租（小图表）/houses/params
export function getRentIcon() {
  return request({
    url: "/houses/params",
    method: "get",
  });
}

// 房屋详情
export function getHouseDetails(params) {
  //这里的params是字符串
  return request({
    url: `/houses/${params}`,
    method: "get",
  });
}
