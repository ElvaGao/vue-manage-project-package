import 'babel-polyfill'
import axios from 'axios';
import Vue from 'vue'
import ElementUI from 'element-ui'
import store from '@/store/index'
Vue.use(ElementUI)
const Message = ElementUI.Message
const token = store.state.login.token;

axios.defaults.timeout = 50000;
// 第一个代理基础路径配置
axios.defaults.baseURL = process.env.ROOT_API;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8' //配置请求头

const service = axios.create({
  baseURL: process.env.ROOT_API,
  timeout: 50000
})
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8' //配置请求头
    if(token) {
        config.headers['Authorization'] = token;
    }
    return config
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Message({
        message: '接口超时未响应',
        duration: 1000,
        forbidClick: true
      })
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      Message({
          message: '您的登录已失效',
          duration: 1000,
          forbidClick: true
        })
    } else {
      let msg = error.message
      if (error.response) {
        const { data } = error.response
        msg = data.message
      }
      Message({
        message: msg,
        duration: 1000,
        type: 'error'
      })
    }
  }
);

export default axios;
