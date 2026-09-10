import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: uni.getStorageSync('admin_token') || '',
    userInfo: uni.getStorageSync('admin_user') || {}
  },
  mutations: {
    LOGIN(state, payload) {
      state.token = payload.token;
      state.userInfo = payload.userInfo;
      uni.setStorageSync('admin_token', payload.token);
      uni.setStorageSync('admin_user', payload.userInfo);
    },
    LOGOUT(state) {
      state.token = '';
      state.userInfo = {};
      uni.removeStorageSync('admin_token');
      uni.removeStorageSync('admin_user');
    }
  }
})

export default store