<template>
  <div>
    
    <!-- 商品列表区域 -->
    <div class="goods-list">

      <router-link tag="div" :to="'/home/goodsdetail/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id">
        <img :src="item.img_url" alt="">
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="new">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </router-link>


      <mt-button type="danger" size="large" style="margin-top: 10px;" @click="getMore">加载更多</mt-button>
    </div>

  </div>
</template>


<script>
import { goodsList } from '../../api/index.js'
export default {
  data(){
    return {
      page: 1,
      goodslist: [],
      isloaded: false
    }
  },
  created() {
    this.getGoodsListByPage();
  },
  methods: {
    getGoodsListByPage() {
      goodsList(this.page).then((response) => {
        if( response.data.code==0){
          if(response.data.data.length <= 0){
            this.isloaded = true
          }
          this.goodslist = response.data.data
        }
      })
    },
    getMore() {
      if (this.isloaded) return;
      this.page++;
      this.getGoodsListByPage();
    }
  },
}
</script>


<style lang="scss" scoped>
.goods-list {
  // 设置父盒子为弹性盒模型
  display: flex;
  // 默认flex 布局的盒子，内部的子元素不会换行，可以使用下面的属性使其换行
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  padding-top: 0;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin-top: 7px;
    box-shadow: 0 0 7px #ccc;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 100%;
      min-height: 170px;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      overflow: hidden;
      p {
        margin: 3px;
      }
      .price {
        .new {
          color: red;
          font-size: 16px;
          font-weight: bold;
          margin-right: 10px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>