import Vue from "vue";
import Vuex from "vuex";
import { setStorage, getStorage } from "@/utils/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //data
    token: getStorage("token"),
    state_city: {
      label: "上海",
      pinyin: "shanghai",
      short: "sh",
      value: "AREA|dbf46d32-7e76-1196",
    },
    state_commity: {},
  },
  getters: {
    // computed
    getters_token(state) {
      return state.token;
    },
  },
  mutations: {
    // methods
    getToken(state, params) {
      // params是传参
      state.token = params;
      setStorage("token", params);
    },
    mutations_setcity(state, params) {
      state.state_city = params;
    },
    mutations_commity(state, params) {
      state.state_commity = params;
    },
  },
  actions: {}, // 异步请求
  modules: {}, // 模块
});
