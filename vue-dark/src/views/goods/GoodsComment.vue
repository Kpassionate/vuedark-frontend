<template>
  <cmtbox :cid="id"></cmtbox>
</template>

<script>
import cmtbox from "./GoodsCommentContainer.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  props: ["id"],
  components: {
    cmtbox
  }
};
</script>

<style lang="scss" scoped>

</style>
