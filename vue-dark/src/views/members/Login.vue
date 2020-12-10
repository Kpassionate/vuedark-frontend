<template>
  <div class="user-login">
    <div class="mui-card">
      <div class="mui-card-header">
        <h4>登录黑洞账户</h4>
      </div>
      <div class="mui-card-content">
        <form class="mui-input-group" autocomplete="off">
            <input
              type="hidden"
              name="csrfmiddlewaretoken"
              value="ywSlOHdiGsK6VFB6iyhnB1B30khmz8SU"
            />
            <div class="mui-input-row">
              <label for="userName">账号：</label>
              <input type="text" v-model="userName" class="mui-input-clear" placeholder="请输入用户名或登录邮箱" />
            </div>
            <div class="mui-input-row">
              <label>密码：</label>
              <input type="password" v-model="parseWord" class="mui-input-clear mui-input-password" placeholder="请输入您的密码" />
            </div>
            <br>
            <mt-button type="primary" size="large" plain @click="Login">立即登录</mt-button>
        </form>
        <br>
      </div>
      <div>
        <img src="../../images/login3.jpg" alt :class="[ isfull ? 'img-full' : 'imgnormal' ]" />
      </div>
      <div class="mui-card-footer btnarea">
        <mt-button type="danger" size="large" plain @click="goRegister">没有账号？立即前往注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "../../../dist/js/cookie.js";
import { login } from "../../api/index.js";

export default {
  data() {
    return {
      isfull: true,
      userName: "",
      parseWord: ""
    };
  },
  methods: {
    Login() {
      const loginData = new FormData();
      loginData.append("username", this.userName);
      loginData.append("password", this.parseWord);
      login(loginData).then(response => {
        cookie.setCookie("name", this.userName, 7);
        cookie.setCookie("token", response.data.data.token, 7);
        this.$store.dispatch("userInfo");
        this.$router.push({ name: "member" });
        // console.log(response.data);
      });
    },
    goRegister() {
      this.$router.push({
        name: "register"
      });
    }
  },
  created() {
    //清除缓存
    cookie.delCookie("token");
    cookie.delCookie("name");
    //重新触发store
    //更新store数据
    // this.$store.dispatch('userInfo');
  }
};
</script>


<style lang="scss" scoped>
.user-login {
  background-color:white;
  overflow: hidden;
}

.run-register {
  background-color: rgba(13, 54, 236, 0.897);
}

</style>
