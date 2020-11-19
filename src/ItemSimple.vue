<template>
  <div class="m-simple-item">
    <img class="u-icon" :src="icon_url(item.IconID)" alt="`IconID:${item.IconID}`">
    <span class="u-name" :style="{'color':item_color(item.Quality)}" v-text="item.Name"></span>
    <span class="u-uiid fr" v-text="`ID:${item.id}`"></span>
  </div>
</template>

<script>
import icon_url from '../assets/js/item/icon_url.js';
import item_color from '../assets/js/item/color.js';

export default {
    name: "ItemSimple",
    props: ["item"],
    methods: {
      icon_url,
      item_color,
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/module/item_simple.less";
</style>