<template>
  <div class="shopcar-container">
    <div class="mui-card">
      <div class="mui-card-header">购物车</div>
      <div class="mui-input-row mui-checkbox mui-left" v-for="(item,index) in goods.goods_list">
        <div class="mui-media-body">
          <input name="checkbox" value="item.goods.id" type="checkbox" />
          <img class="mui-pull-left" :alt="item.goods.title" :src="item.goods.img_url" />
          <span class="mui-ellipsis-2 name">商品：{{ item.goods.title }}</span>
          <span class="mui-ellipsis">单价：￥{{item.goods.sell_price}}元</span>
          <span>
            <a class="mui-ellipsis" @click="deleteGoods(index, item.goods.id)">删除</a>
          </span>
          <span class="mui-pull-right">
            <div class="mui-numbox" data-numbox-min="1">
              <button
                class="mui-btn mui-btn-numbox-minus"
                type="button"
                @click="reduceCarNum(index, item.goods.id);"
              >-</button>
              <input class="mui-input-numbox" type="number" v-model="item.nums" />
              <button
                button
                class="mui-btn mui-btn-numbox-plus"
                @click="addCarNum(index, item.goods.id);"
              >+</button>
            </div>
          </span>
        </div>
      </div>

      <div class="mui-card-footer">
        <div>
          <a @click="delAll">清空购物车</a>
          <span>
            共{{goods.goods_list.length}}件商品，总价：
            <strong>￥{{totalPrice}}元</strong>
          </span>
        </div>
        <div>
          <router-link to="/balance">去结算</router-link>
          <!-- <a to="/balance">去结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import nobox from "./ShopCarNoBox.vue";
import { getShopCar, deleteShopCar, updateShopCar } from "../../api/index.js";

export default {
  data() {
    return {
      totalPrice: 0,
      post_script: "",
      goods: {
        totalPrice: null,
        goods_list: []
      }
    };
  },

  created() {
    // 请求购物车商品
    getShopCar().then(response => {
      // console.log(response.data.data);
      // 更新store数据
      //this.goods_list = response.data;
      var totalPrice = 0;
      this.goods.goods_list = response.data.data;
      response.data.data.forEach(function(entry) {
        totalPrice += entry.goods.sell_price * entry.nums;
        // console.log(entry.goods.sell_price);
      });
      this.goods.totalPrice = totalPrice;
      this.totalPrice = totalPrice;
    });
  },
  methods: {
    addCarNum(index, id) {
      //添加数量
      updateShopCar(id, { nums: this.goods.goods_list[index].nums + 1 }).then(
        response => {
          this.goods.goods_list[index].nums =
            this.goods.goods_list[index].nums + 1;
          // 更新store数据
          this.$store.dispatch("setShopList");
          //更新总价
          this.setTotalPrice();
        }
      );
    },
    setTotalPrice() {
      var goods_list = this.goods.goods_list;
      var totalPrice = 0;
      for (var i = 0; i < goods_list.length; i++) {
        totalPrice =
          totalPrice + goods_list[i].nums * goods_list[i].goods.sell_price;
      }
      this.totalPrice = totalPrice;
    },
    deleteGoods(index, id) {
      //移除购物车
      alert("您确定把该商品移除购物车吗");
      deleteShopCar(id).then(response => {
        // console.log(response.data);
        this.goods.goods_list.splice(index, 1);
        // 更新store数据
        this.$store.dispatch("setShopList");
      });
    },
    reduceCarNum(index, id) {
      //删除数量
      if (this.goods.goods_list[index].nums <= 1) {
        this.deleteGoods(index, id);
      } else {
        updateShopCar(id, { nums: this.goods.goods_list[index].nums - 1 }).then(
          response => {
            this.goods.goods_list[index].nums =
              this.goods.goods_list[index].nums - 1;
            // 更新store数据
            this.$store.dispatch("setShopList");
            //更新总价
            this.setTotalPrice();
          }
        );
      }
    },
    delAll() {
      //清空购物车

      this.$http.post("/shoppingCart/clear", {}).then(response => {
        // console.log(response.data);
        this.goods.goods_list.splice(0, this.goods.goods_list.length);
        // 更新store数据
        this.$store.dispatch("setShopList");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: white;
  overflow: hidden;
}

.mui-pull-left {
  float: left;
  width: 50px;
  height: 50px;
}
</style>
