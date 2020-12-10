<template>
  <div class="user-login">
    <div class="mui-card">
      <div class="mui-card-header">
        <h4>注册黑洞账户</h4>
      </div>
      <div class="mui-card-content">
        <div class="mui-card--inner">
          <form autocomplete="off">
            <input
              type="hidden"
              name="csrfmiddlewaretoken"
              value="ywSlOHdiGsK6VFB6iyhnB1B30khmz8SU"
            />

            <div class="form-group">
              &nbsp;
              <label>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</label>
              <input type="text" v-model="email" class="input-form" placeholder="请输入您的邮箱" />
            </div>

            <div class="form-group">
              &nbsp;
              <label>验证码：</label>
              <input
                type="text"
                v-model="code"
                class="input-form input-form-code"
                placeholder="请输入验证码"
              />
              <input type="button" class="send-code" @click="sendCode" :value="getCodeText" />
            </div>
            <div class="form-group">
              &nbsp;
              <label>密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
              <input
                type="password"
                v-model="parseWord"
                class="input-form"
                placeholder="请输入6-20位非中文字符密码"
              />
            </div>
            <mt-button type="primary" size="large" plain @click="toRegister">立即注册</mt-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "../../../dist/js/cookie.js";
import { sendEmail, register } from "../../api/index.js";

export default {
  data() {
    return {
      getCodeText: "获取验证码",
      isfull: true,
      email: "",
      code: "",
      userName: "",
      parseWord: ""
    };
  },
  methods: {
    // 后台设置验证码发送间隔为一分钟，有效时长3分钟
    sendCode() {
      //开启倒计时
      var that = this;
      var countdown = 60;
      settime();
      function settime() {
        if (countdown == 0) {
          that.getCodeText = "获取验证码";
          countdown = 60;
          return;
        } else {
          that.getCodeText = "重新发送(" + countdown + ")";
          countdown--;
        }
        setTimeout(function() {
          settime();
        }, 1000);
      }
      sendEmail({
        email: this.email
      }).then(response => {
        // console.log(response.data);
      });
    },

    toRegister() {
      var that = this;
      register({
        password: this.parseWord,
        email: that.email,
        code: that.code
      }).then(response => {
        cookie.setCookie("name", response.data.username, 7);
        cookie.setCookie("token", response.data.token, 7);
        //存储在store
        // 更新store数据
        that.$store.dispatch("setInfo");
        //跳转到首页页面
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.user-login {
  background-color: white;
  overflow: hidden;
}

.run-register {
  background-color: rgba(13, 54, 236, 0.897);
}

.input-form {
  width: 250px;
}

.input-form-code {
  width: 150px;
}

.send-code {
  background-color: rgb(16, 132, 226);
}
</style>
