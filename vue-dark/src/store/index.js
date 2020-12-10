import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';


//全局注册vueX
Vue.use(Vuex);
//全局引用cookie方法类
import cookie from '../../dist/js/cookie.js';

const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || ''
};

const totalCount = 0


const goods_list =  {
  totalPrice:'',
  goods_list:[]
}

// let car = window.JSON.parse(localStorage.getItem('cart') || '[]')


const state = {
  totalCount,
  userInfo,
  goods_list,
  // cart: car
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})




