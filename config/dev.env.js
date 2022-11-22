'use strict'

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  API_ROOT: '"/api"',
  proxyTable: {
      '"/api"': {
        target: '"https://xxx.xxx.xxx.xx"',  // 接口域名
        changeOrigin: true,  //是否跨域
        secure: false,
        pathRewrite: {
          '"^/api"': '""' 
        }
    },
  }
}
