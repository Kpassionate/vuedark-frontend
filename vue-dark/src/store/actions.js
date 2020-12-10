import * as types from './mutation-types.js';
// 提交mutation

function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args)
};

export const setInfo = makeAction(types.SET_INFO);

export const setShopList = makeAction(types.SET_SHOPLIST);
