import request from '../request';
import qs from 'qs'
// post
export const login = data => {
  return request({
      url: '/login',
      method: 'post',
      data: data
  });
};

// get
export const post = (code) => {
  return request({
      url: '/template/resource/apply?pageCode=' + code,
      method: 'get'
  });
};

// get
export const get = query => {
  return request({
      url: '/test/takeMiddlewareList',
      method: 'get',
      params: query
  });
};

// 下载
export const download = (query) => {
  return request({
    url: '/deploy2/doc',
    method: 'get',
    params: query,
    responseType: "blob"
  });
};