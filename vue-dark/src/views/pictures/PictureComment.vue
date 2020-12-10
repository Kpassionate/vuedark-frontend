<template>
  <div>
    <h4>我要评论：</h4>

    <hr />
    <textarea placeholder="互联网并非法外之地，请勿恶意评论" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postMsg">发表评论</mt-button>

    <!-- 评论列表区域 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in commentlist" :key="i">
        <div
          class="cmt-item-title"
        >第{{ i+1 }}楼&nbsp;用户：{{ item.user_name }}&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-item-body">{{ item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>


<script>
// 引入弹窗组件
import { Toast } from "mint-ui";
import { pictureComment, addPictureComment } from "../../api/index.js";
export default {
  data() {
    return {
      pictureId: "",
      page: 1,
      commentlist: [],
      count: 0,
      msg: "" //即将发表的评论
    };
  },
  created() {
    this.pictureId = this.cid;
    this.getCommentByPage();
  },
  methods: {
    getCommentByPage() {
      pictureComment(this.pictureId, this.page).then(response => {
        this.commentlist = response.data.data.results;
        this.count = response.data.data.count;
      });
    },
    loadMore() {
      if (this.page * 5 < this.count * 1) {
        // 点击按钮，加载更多的评论
        this.page++;
        this.getCommentByPage();
      } else {
        return Toast("没有更多评论了");
      }
    },
    postMsg() {
      const commentData = new FormData();
      commentData.append("user_name", "匿名用户");
      commentData.append("content", this.msg.trim());
      commentData.append("picture", this.cid);
      addPictureComment(commentData).then(response => {
        this.msg = "";
        this.getCommentByPage();
      });
    }
  },
  props: ["cid"]
};
</script>


<style lang="scss" scoped>
textarea {
  font-size: 14px;
  margin: 0;
}
.cmt-list {
  margin-top: 4px;
  .cmt-item {
    line-height: 30px;
    .cmt-item-title {
      font-size: 14px;
      background-color: #ddd;
    }
    .cmt-item-body {
      font-size: 13px;
      text-indent: 2em;
    }
  }
}
</style>
