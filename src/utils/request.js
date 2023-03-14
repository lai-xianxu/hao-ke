import axios from "axios";
import { getStorage } from "@/utils/storage";
import { Toast } from "vant";

const request = (config, loading) => {
  const instance = axios.create({
    baseURL: "http://liufusong.top:8080", // 基础路径
    timeout: 8000,
    headers: {
      authorization: getStorage("token"),
    },
  });
  let load;
  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      // 如果有一些接口需要认证才可以访问，就在这统一设置
      // 直接放行
      if (loading) {
        load = Toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });
      }
      return config;
    },
    () => {}
  );

  // 响应拦截
  instance.interceptors.response.use(
    (res) => {
      if (loading) {
        load.clear();
      }
      return res;
    },
    () => {
      // 如果有需要授权才可以访问的接口，统一去login授权
      // 如果有错误，这里面去设置处理，显示错误信息
      if (loading) {
        load.clear();
      }
      Toast.fail("加载失败");
    }
  );
  return instance(config);
};

export default request;
