//引入vue
import Vue from 'vue';
import axios from 'axios';

//全局状态控制引入
import store from '../store/index';

import router from '../router'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.userInfo.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      // console.log('token存在');
      config.headers.Authorization = `JWT ${store.state.userInfo.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


// http response 拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response;
    switch (res.status) {
      case res.status == 401:
        console.log('401未登录或登录过期');
      case 403:
        console.log('403您无权操作');
      case 500:
        console.log('500服务器错误');
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

