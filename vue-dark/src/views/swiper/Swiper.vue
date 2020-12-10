<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="item in banners" :key="item.id">
      <img :src="item.img_url" alt :class="[ isfull ? 'img-full' : 'imgnormal' ]" />
    </mt-swipe-item>
  </mt-swipe>
</template>


<script>
import { banner } from '../../api/index.js'
export default {
  data() {
    return {
      banners: []
    };
  },
  created() {
    this.getBanners()
  },
  methods: {
    getBanners() {
      banner().then((response) => {
        this.banners = response.data.data
      })
    }
  },
  props: ["isfull", "img_url"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 180px;

  .mint-swipe-item {
    text-align: center;
    .img-full {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .img-normal {
      height: 100%;
    }
  }
}
</style>