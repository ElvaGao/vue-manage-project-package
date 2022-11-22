import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: to => {
          if(!store.state.token) {
              return '/login'
          }else {
              
              const getNamesByType = (target, init = []) => {
                  target.forEach(item => {
                      if(!item.subs || (item.subs&&item.subs.length==0)){
                          init.push(item.path)
                      } else {
                          getNamesByType(item.subs, init)
                      }
                  });
                  return init;
              };
              if(store.state.softwareInfo.menus || store.state.role.menuInfos){
                  let arr = getNamesByType(store.state.softwareInfo.menus || store.state.role.menuInfos);
                  return '/'+arr[0]
              } else {
                  return '/404'
              }
              
          } 
        },
  },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home.vue'),
      children: [
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import('@/components/welcome.vue'),
            meta: {
              title: '欢迎登陆'
            }
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/components/setting.vue'),
          meta: {
            title: '设置'
          }
      }
      ]
    }
  ]
})
