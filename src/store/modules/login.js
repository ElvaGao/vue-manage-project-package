import 'babel-polyfill'

const store = {
  namespaced: true,
  state:{
    token: ''
  },
  mutations:{
    clean(state) {
      state.token = '';
    },
    SET_TOKEN: (state, data) => state.token = data,
  },
  actions:{
    logout({ commit }) {
      commit('clean')
    }
  },
  getters: {},
};
export default store