<template>
    <div class="c-article-box">
        <!-- <div id="c-article-origin" class="c-article-origin" ref="origin"><slot></slot></div> -->
        <div id="c-article" class="c-article" ref="article">
            <div
                class="c-article-chunk"
                v-for="(text, i) in data"
                :key="i"
                v-html="text"
                :class="{ on: i == page - 1 || all == true }"
                :id="'c-article-part' + ~~(i + 1)"
            ></div>
        </div>
        <el-button
            class="c-article-all"
            type="primary"
            v-if="!all && hasPages"
            @click="showAll"
            >加载全部</el-button
        >
        <el-pagination
            class="c-article-pages"
            v-if="!all"
            background
            :page-size="1"
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        <el-popover v-show="hover_item.id" placement="bottom-start" width="auto" trigger="hover" :visible-arrow="false"
                    popper-class="c-item-popover">
            <div slot="reference" class="c-item-popup" v-show="hover_item.id"
                 :style="{top:hover_item.top,left:hover_item.left,width:hover_item.width,height:hover_item.height}">
            </div>
            <jx3-item :item_id="hover_item.id" />
        </el-popover>
    </div>
</template>

<script>
// 语法高亮
import Prism from "prismjs";
// 数学公式
const MathJax = require("../assets/js/tex-mml-chtml.js");

// 基本文本
import lazyload from "../assets/js/img";
import iframeFilter from "../assets/js/iframe";
import fixXSS from "../assets/js/script";
import formatLink from "../assets/js/a";
import splitPages from "../assets/js/nextpage";
import { Pagination, Button, Popover } from "element-ui";
import "@jx3box/jx3box-common/css/element.css";

// 扩展文本
import $ from "jquery";
import fold from "../assets/js/fold";
import directory from "../assets/js/directory";
import macro from "../assets/js/macro";
import qixue from "../assets/js/qixue";
import Gallery from "../assets/js/pswp.js";
import Item from "../assets/js/components/Item";

export default {
    name: "Article",
    props: ["content", "directorybox"],
    data: function() {
        return {
            all: false,
            page: 1,
            data: [],
            mode: '',
            hover_item: {id: null, top: 0, left: 0, width: 0, height: 0},
        };
    },
    computed: {
        total: function() {
            return this.chunks.length;
        },
        hasPages: function() {
            return this.chunks.length > 1;
        },
        origin: function() {
            return this.content;
        },
        chunks: function() {
            return splitPages(this.origin);
        },
    },
    methods: {
        doReg: function(data) {
            if (data) {
                // 过滤内容
                data = lazyload(data);
                data = iframeFilter(data);
                data = fixXSS(data);
                data = formatLink(data);
                return data;
            } else {
                return "";
            }
        },
        doDOM: function($root) {
            // DOM操作
            $root && Prism.highlightAllUnder($root);
            fold($root);
            macro(); //旧版
            qixue(); //旧版
            window.MathJax && window.MathJax.typesetPromise();
            if(this.mode != 'app_web'){
                Gallery.init(this.$refs.article)
            }
        },
        doDir: function() {
            // 显示局部
            let target = "";
            if (this.hasPages && !this.all) {
                target = "#c-article-part" + this.page;
                // 全部
            } else {
                target = "#c-article";
            }
            let dir = directory(target, this.directorybox);
            if (dir) this.$emit("directoryRendered");
        },
        changePage: function(i) {
            this.page = i;
            window.scrollTo(0, 0);
            this.$nextTick(() => {
                this.doDir();
            });
        },
        showAll: function() {
            this.all = true;
            this.$nextTick(() => {
                this.doDir();
            });
        },
        render: function() {
            let result = [];
            for (let chunk of this.chunks) {
                let _chunk = this.doReg(chunk);
                result.push(_chunk);
            }
            this.data = result;
        },
        run: function() {
            this.render();
            // 等待html加载完毕后
            this.$nextTick(() => {
                this.$emit("contentLoaded");

                // 统一DOM处理
                const $root = this.$refs.article;
                this.doDOM($root);
                this.$emit("contentRendered");

                // 目录处理
                this.doDir();
            });
        },
        // 物品dom渲染
        itemRender(selector=".e-jx3-resource[data-type='item']") {
          let that = this;
          $('.c-article-box')
              .delegate(selector, 'mouseenter', function () {
                enter({data:{that: this}});
                $(document).bind('scroll', {that: this}, enter);
              })
              .delegate('.c-item-popup', 'mouseleave', function () {
                $(document).unbind('scroll', enter);
                that.hover_item.id = null;
              })

          function enter(e) {
            if (!e.data || !e.data.that) return;
            let $item = $(e.data.that);
            that.hover_item.id = $item.data('id');
            that.hover_item.top = $item.offset().top - $(document).scrollTop() + 'px';
            that.hover_item.left = $item.offset().left + 'px';
            that.hover_item.width = $item.outerWidth() + 'px';
            that.hover_item.height = $item.outerHeight() + 'px';
          }
        },
    },
    watch: {
        content: function() {
            this.run();
        },
    },
    mounted: function() {
        const params = new URLSearchParams(location.search);
        this.mode = params.get('mode') || ''
        this.run();
        // 物品dom渲染
        this.itemRender();
    },
    components: {
        "el-pagination": Pagination,
        "el-button": Button,
        "el-popover": Popover,
        "jx3-item": Item,
    },
};
</script>

<style lang="less">
@import "../assets/css/article.less";
</style>
