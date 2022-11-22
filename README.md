# system

> A vue-webpack project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```



## 增加功能

```bash

## 1.vuex中增加存储功能
1.sessionStorage和localStorage存储
2.可以在vuex模块化中使用存储

## 2.增加axios请求封装
1.携带token
2.axios二次封装

## 3.按需封装打包命令
1.对不同环境，进行不同命令的打包
2.增加cross-env组件

## 4.增加本地开发跨域功能封装
1.在dev中配置proxyTable跨域

## 5.增加登录页面
1.登录页面

## 6.增加菜单
1.增加树形菜单

## 7.koa mock接口数据
1.登录
2.菜单

```


## 问题以及处理办法

```bash

# 问题1：使用element框架的icon时候，开发环境下是没有问题的，打包完以后出现小方块，页面不显示
解决办法：build/utils.js文件，return ExtractTextPlugin.extract({})里加 publicPath: '../../'

# 问题2：打包命令npm run build执行，卡住
解决办法：build/check-version.js文件，注释检查更新的代码if (shell.which('npm')) {...}) 


```