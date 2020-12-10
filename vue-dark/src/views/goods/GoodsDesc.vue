<template>
  <div class="goodsdesc-container">
    <h3 class="title">{{ info.title }}</h3>
    <hr />
    <div class="content" v-html="contentStr"></div>
  </div>
</template>

<script>
import { goodsPresentation } from '../../api/index.js'
export default {
  data() {
    return {
      contentStr: '',
      goodsId: '',
      info: {} // 商品的描述信息
    };
  },
  created() {
    this.goodsId = this.id;
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      goodsPresentation(this.goodsId).then((response) => {
        //富文本接收到的data中的content数据中的图片链接是相对地址，由于直接显示时图片会出错，需正则匹配替换成绝对地址
        let reg = new RegExp('/media', 'g');
        this.contentStr = response.data.data[0].content.replace(reg, 'http://ppxia.work:233/media');
        this.info = response.data.data[0];
        // console.log(this.info);

      })
    }
  },
  props: ["id"]
};
</script>

<style lang="scss">
.goodsdesc-container {
  .title {
    font-size: 16px;
    margin: 10px 0;
    color: blue;
    text-align: center;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>


