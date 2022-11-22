// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);  

import '@/assets/css/main.css';

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

require('./mock'); //引入mock数据，关闭则注释该行

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | XX系统`;
  const role = store.state.roleList;
  if (!role && to.path !== '/login') {
      next('/login');
  } else {
      next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 引入store
  components: { App },
  template: '<App/>'
})
