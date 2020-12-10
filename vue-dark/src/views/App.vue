<template>
  <div class="app-container">
    <!-- 在这里放一个 Header  -->
    <mt-header fixed title="黑洞空间">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <span slot="right" @click="Login" v-show="loginFlag">
        <mt-button icon="login">登录{{ userInfo.name }}</mt-button>
      </span>-->
      <span slot="right" class="user-info-de">
        <template v-if="userInfo.name">
          <router-link :to="'/member'">{{ userInfo.name }}</router-link>&nbsp;[
          <a @click="loginOut">退出</a>]
        </template>
        <template v-else>
          <router-link :to="'/member/login'">登录</router-link>
          <router-link :to="'/member/register'">注册</router-link>
        </template>
      </span>
    </mt-header>

    <!-- 路由的容器坑 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="my-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="my-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="my-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ totalCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="my-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import cookie from "../../dist/js/cookie.js";

export default {
  data() {
    return {
      flag: true, // 默认显示返回按钮
      loginFlag: true
    };
  },
  methods: {
    goBack() {
      // 点击返回按钮，向后跳转
      this.$router.go(-1);
      // console.log(this);
    },
    Login() {
      this.$router.push("/member/login/");
    },
    loginOut() {
      cookie.delCookie("token");
      cookie.delCookie("name");
      //重新触发store
      //更新store数据
      this.$store.dispatch("setInfo");
      //跳转到登录
      this.$router.push({ name: "login" });
    }
  },
  created() {
    if (this.$route.path === "/home") {
      this.flag = false;
      this.loginFlag = true;
    } else {
      this.flag = true;
      this.loginFlag = false;
    }
  },
  watch: {
    // 当页面刷新的时候，不会触发 watch 中监听的 路由地址的变化
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/home") {
        this.flag = false;
        this.loginFlag = true;
      } else {
        this.flag = true;
        this.loginFlag = false;
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo", "totalCount"])
  }
};
</script>


// 这里写的样式，要符合 scss 语法，并且，样式是 当前组件私有的，不会成为全局的样式，也不会应用给子组件
<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  // 当有组件切换动效的时候，一瞬间，页面的宽度会变成 正常宽度的 2 倍，此时，需要隐藏超出屏幕宽度的区域
  overflow: hidden;
}

// 动画效果相关的类样式
.v-enter {
  opacity: 0;
  // 让即将进入的页面，向右偏移 100% 屏幕的宽度
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  // 让即将进入的页面，向右偏移 100% 屏幕的宽度
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.mint-header {
  z-index: 99;
}

.mui-bar-tab .my-tab-item.mui-active {
  color: #007aff;
}

.mui-bar-tab .my-tab-item {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .my-tab-item .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .my-tab-item .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info-de {
  background-color: white;
}
</style>
