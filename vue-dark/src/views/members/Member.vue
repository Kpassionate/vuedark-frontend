<template>
  <div class="user-info">
    <div class="mui-card">
      <div class="mui-card-header">黑洞名片</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-if="userInfo.name">
          <p>用户名：{{ userinfo.username }}</p>
          <p>昵称：{{ userinfo.nickname }}</p>
          <p>邮箱：{{ userinfo.email }}</p>
          <p>性别：{{ userinfo.gender }}</p>
          <p>生日：{{ userinfo.date_of_birth }}</p>
        </div>
        <div class="mui-card-content-inner" v-else>
          <p>关关雎鸠，在河之洲。</p>
          <p>窈窕淑女，君子好逑。</p>
          <p>参差荇菜，左右流之。</p>
          <p>窈窕淑女，寤寐求之。</p>
          <p><router-link to="/member/login">尚未登录，请你前往登录！</router-link></p>
          <p><router-link to="/member/register">没有账号？快来注册吧！</router-link></p>
        </div>
      </div>
      <div class="mui-card-footer btnarea">
        <mt-button type="primary" size="large" plain @click="goAlert">修改用户信息</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from "../../api/index.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userinfo: {
        username: "",
        nickname: "",
        email: "",
        gender: "",
        date_of_birth: ""
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserDetail().then(response => {
        this.userinfo = response.data.data;
        // console.log(this.userinfo);
      });
    },
    goAlert() {
      this.$router.push("/member/login/");
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="scss" scoped>
</style>




