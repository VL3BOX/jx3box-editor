<template>
  <el-popover v-if="item"
              placement="right-end"
              popper-class="m-simple-item-popup"
              width="auto"
              :visible-arrow="false"
              trigger="hover"
              transition="none"
              :close-delay="0"
              v-model="visible"
              @show="item_id=item.id"
  >
    <div class="m-simple-item" slot="reference" @mousedown="visible=false">
      <img class="u-icon" :src="icon_url(item.IconID)" :alt="`IconID:${item.IconID}`">
      <span class="u-name" :style="{'color':item_color(item.Quality)}" v-text="item.Name" :class="{isHidden : hideName}"></span>
      <span class="u-uiid fr" v-text="`ID: ${item.id}`" :class="{isHidden : hideID}"></span>
    </div>
    <jx3-item :item_id="item_id"/>
  </el-popover>
</template>

<script>
  import Item from "./Item";
  import icon_url from '../assets/js/item/icon_url.js';
  import item_color from '../assets/js/item/color.js';

  export default {
    name: "ItemSimple",
    props: ["item","hideName","hideID"],
    data() {
      return {visible: false, item_id: null};
    },
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
    min-width: initial;
    padding: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;
    transform: translateY(-10px);
  }

  .m-simple-item{
    .isHidden{
      .none !important;
    }
  }

</style>
<style lang="less">
  @import "../assets/css/module/item_simple.less";
</style>