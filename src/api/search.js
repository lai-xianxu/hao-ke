import request from "@/utils/request";

// 小区关键词查询
export function getSearchSuggestion(params) {
  return request({
    url: "/area/community",
    methods: "post",
    params,
  });
}
