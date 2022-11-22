import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';
import config from "@/store/utils/index.js";
import vuexStorage from "@/store/utils/vuexStorage.js";
import login from "@/store/modules/login"

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    menuList: [],
    roleList: [],
    role: ''
  },
  mutations:{
    SET_MENULIST: (state, data) => state.menuList = data,
    SET_ROLELIST: (state, data) => state.roleList = data,
    SET_ROLE: (state, data) => state.role = data,
  },
  actions:{},
  getters: {},
  modules:{
    login
  },
  plugins: [
    vuexStorage.init(config.storageKeys, config.sessionKeys),
    // ({ state }) => {
    //   if (state.token) {
    //     // _axiosGlobal.headers.Authorization = state.token;
    //   }
    // },
  ],
});
export default store