<template>
  <el-popover v-if="item"
              placement="bottom-start"
              popper-class="m-simple-item-popup"
              width="auto"
              :visible-arrow="false"
              trigger="hover"
              transition="none"
              :close-delay="0"
  >
    <div class="m-simple-item" slot="reference">
      <img class="u-icon" :src="icon_url(item.IconID)" alt="`IconID:${item.IconID}`">
      <span class="u-name" :style="{'color':item_color(item.Quality)}" v-text="item.Name"></span>
      <span class="u-uiid fr" v-text="`ID:${item.id}`"></span>
    </div>
    <jx3-item :item_id="item.id"/>
  </el-popover>
</template>

<script>
  import Item from "./Item";
  import icon_url from '../assets/js/item/icon_url.js';
  import item_color from '../assets/js/item/color.js';

  export default {
    name: "ItemSimple",
    props: ["item"],
    methods: {
      icon_url,
      item_color,
    },
    components: {
      "jx3-item": Item,
    },
  };
</script>

<style lang="less">
  .m-simple-item-popup {
    padding: 0;
    border: none;
    box-shadow: none;
    transform: translateY(-10px);
  }
</style>
<style lang="less" scoped>
  @import "../assets/css/module/item_simple.less";
</style>