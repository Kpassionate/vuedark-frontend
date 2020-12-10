import axios from 'axios';


let host = 'http://127.0.0.1:8003/api';

//登录
export const login = params => {
    return axios.post(`${host}/login/`, params)
}

//注册  
export const register = parmas => { return axios.post(`${host}/user/`, parmas) }

//发送邮件
export const sendEmail = parmas => { return axios.post(`${host}/send_email/`, parmas) }

//获取用户信息
export const getUserDetail = () => { return axios.get(`${host}/user/1/`) }

//修改用户信息
export const updateUserInfo = params => { return axios.patch(`${host}/user/1/`, params) }

//获取首页轮播图
export const banner = params => { return axios.get(`${host}/banner/`) }

//获取图片类型列表
export const pictureType = params => { return axios.get(`${host}/picture_type/`) }

//获取图片列表
export const pictureList = categoryId => {
    if (categoryId == 0) {
        return axios.get(`${host}/picture/`);
    } else {
        return axios.get(`${host}/picture/?picture_type=` + categoryId)
    }
}

//获取图片详情
export const pictureDetail = pictureId => { return axios.get(`${host}/picture/${pictureId}` + '/') }

//获取图片评论
export const pictureComment = (pictureId, page) => {
    return axios.get(`${host}/picture_comment/?picture=${pictureId}` + '&&page=' + page)
}

//增加图片评论
export const addPictureComment = params => {
    return axios.post(`${host}/picture_comment/`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}


//获取资讯列表
export const newsList = params => { return axios.get(`${host}/news/`) }

//获取资讯详情
export const newsDetail = newsId => { return axios.get(`${host}/news/${newsId}` + '/') }

//获取资讯评论
export const newsComment = (newsId, page) => {
    return axios.get(`${host}/news_comment/?news=${newsId}` + '&&page=' + page)
}

//增加资讯评论
export const addNewsComment = params => {
    return axios.post(`${host}/news_comment/`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}

//获取商品列表
export const goodsList = page => { return axios.get(`${host}/goods/?page=` + page) }

//商品详情
export const goodsDetail = goodId => { return axios.get(`${host}/goods/${goodId}` + '/') }

//获取商品图片列表
export const goodsImageList = goodId => { return axios.get(`${host}/goods_image/?goods=${goodId}`) }

//获取商品图文详情
export const goodsPresentation = goodId => { return axios.get(`${host}/goods_presentation/?goods=${goodId}`) }

//获取商品评论
export const goodsComment = (goodId, page) => {
    return axios.get(`${host}/goods_comment/?goods=${goodId}` + '&&page=' + page)
}

//增加商品评论
export const addGoodsComment = params => {
    return axios.post(`${host}/goods_comment/`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}


//获取购物车商品
export const getShopCar = params => { return axios.get(`${host}/shop_car/`) }
// 添加商品到购物车
export const addShopCar = params => { return axios.post(`${host}/shop_car/`, params) }
//更新购物车商品信息
export const updateShopCar = (goodsId, params) => { return axios.patch(`${host}/shop_car/`+goodsId+'/', params) }
//删除某个商品的购物记录
export const deleteShopCar = goodsId => { return axios.delete(`${host}/shop_car/`+goodsId+'/') }
