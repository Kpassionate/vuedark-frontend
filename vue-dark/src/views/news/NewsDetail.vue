<template>
  <div class="newsdetail-container">
    <h3 class="title">{{ newsdetail.title }}</h3>
    <p class="detail">
      <span>发表时间：{{ newsdetail.add_time | dateFormat }}</span>
      <span>点击：{{ newsdetail.click }}次</span>
    </p>
    <hr />
    <!-- 新闻内容 -->
    <div class="content" v-html="newsdetail.content"></div>

    <!-- 评论组件 -->
    <hr />
    <comment :cid="id"></comment>
  </div>
</template>



<script>
import { newsDetail } from "../../api/index.js";
import comment from "./NewsComment.vue";
export default {
  data() {
    return {
      newsId: "",
      newsdetail: {}
    };
  },
  created() {
    this.newsId = this.id;
    this.getNewsDetail();
  },
  methods: {
    getNewsDetail() {
      newsDetail(this.newsId).then((response) => {
        this.newsdetail = response.data.data;
        // console.log(this.newsId);
        // console.log(this.newsdetail);
      });
    }
  },
  props: ["id"],
  components: {
    comment
  }
};
</script>


<style lang="scss" scoped>
.newsdetail-container {
  padding: 3px;
  .title {
    font-size: 15px;
    text-align: center;
    color: red;
    margin: 15px 0;
  }

  .detail {
    color: #26a2ff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
