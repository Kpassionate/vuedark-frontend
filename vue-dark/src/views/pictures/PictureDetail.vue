<template>
  <div class="picturedetail-container">
    <h3 class="title">{{ picturedetail.title }}</h3>

    <p class="info">
      <span>发表时间：{{ picturedetail.add_time | dateFormat }}</span>
      <span>点击：{{ picturedetail.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <div class="thumb-img-list">
      <!-- 使用 v-for 循环渲染缩略图 -->
      <img
        class="preview-img"
        :src="picturedetail.img_url"
        height="100"
        :key="picturedetail.id"
      />
    </div>

    <!-- 内容区域 -->
    <div class="content" v-html="picturedetail.content"></div>
    <!-- 评论组件 -->
    <comment :cid="id"></comment>
  </div>
</template>


<script>
import comment from './PictureComment.vue';
import { pictureDetail } from '../../api/index.js'

export default {
  data() {
    return {
      pictureId: "",
      picturedetail: {}
    };
  },
  created() {
    this.pictureId = this.id;
    this.getPictureDetail();
  },
  methods: {
    getPictureDetail() {
      pictureDetail(this.pictureId).then((response) => {
        // console.log(response.data);
        this.picturedetail = response.data.data;
      })
    }
  },
  props: ["id"],
  components: {
    comment
  }
};
</script>



<style lang="scss" scoped>
.picturedetail-container {
  padding: 3px;
}
.title {
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
  color: #26a2ff;
}
.info {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.content {
  font-size: 13px;
  line-height: 30px;
}

.thumb-img-list {
  img {
    margin: 10px;
    box-shadow: 0 0 7px gray;
  }
}
</style>
