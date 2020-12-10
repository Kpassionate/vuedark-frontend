import VueRouter from 'vue-router'

// 导入路由组件
import Home from './views/homes/Home.vue'
import NewsList from './views/news/NewsList.vue'
import NewsDetail from './views/news/NewsDetail.vue'
import PictureList from './views/pictures/PictureList.vue'
import PictureDetail from './views/pictures/PictureDetail.vue'
import GoodsList from './views/goods/GoodsList.vue'
import GoodsDetail from './views/goods/GoodsDetail.vue'
import GoodsComment from './views/goods/GoodsComment.vue'
import GoodsDesc from './views/goods/GoodsDesc.vue'
import ShopCar from './views/shopcars/ShopCar.vue'
import Member from './views/members/Member.vue'
import Search from './views/searchs/Search.vue'
import Login from './views/members/Login.vue'
import Register from './views/members/Register.vue'
import Balance from './views/balances/Balance.vue'



// 创建路由对象
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsdetail/:id', component: NewsDetail, props:true},
    { path: '/home/picturelist', component: PictureList},
    { path: '/home/picturedetail/:id', component: PictureDetail, props:true},
    { path: '/home/goodslist', component: GoodsList},
    { path: '/home/goodsdetail/:id', component: GoodsDetail, props:true},
    { path: '/home/goodsdesc/:id', component: GoodsDesc, props: true },
    { path: '/home/goodscomment/:id', component: GoodsComment, props: true, name: 'goodscomment' },
    { path: '/shopcar', component: ShopCar},
    { path: '/member', component: Member, name: 'member'},
    { path: '/member/login', component: Login, name: "login"},
    { path: '/member/register', component: Register, name: "register"},
    { path: '/balance', component: Balance, name: "balance"},

    { path: '/search', component: Search, name: "search"},

  ],
  linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
})

export default router