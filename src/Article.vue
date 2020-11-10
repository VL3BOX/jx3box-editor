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
        <div class="c-item-pop" :style="item_popover_style">
            <jx3-item :item_id="item_id" />
        </div>
    </div>
</template>

<script>
import { Pagination, Button, Popover } from "element-ui";
import "@jx3box/jx3box-common/css/element.css";
// 语法高亮
import Prism from "prismjs";
// 数学公式
const MathJax = require("../assets/js/tex-mml-chtml.js");
// 相册
import Gallery from "../assets/js/pswp.js";
// 剑三物品
import Item from "./Item";
// XSS
import execFilterXSS from "../assets/js/script";
// const execFilterXSS = require("xss");
const xss_options = {
    allowCommentTag: true,
};

// 基本文本
import execLazyload from "../assets/js/img";
import execFilterIframe from "../assets/js/iframe";
import execFilterLink from "../assets/js/a";
import execSplitPages from "../assets/js/nextpage";

// 扩展文本
import $ from "jquery";
import renderFoldBlock from "../assets/js/fold";
import renderDirectory from "../assets/js/directory";
import renderMacro from "../assets/js/macro";
import renderTalent from "../assets/js/qixue";

export default {
    name: "Article",
    props: ["content", "directorybox"],
    data: function() {
        return {
            all: false,
            page: 1,
            data: [],
            mode: "",
            item_id: "",
            item_popover_style: {
                left: 0,
                top: 0,
            },
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
            return execSplitPages(this.origin);
        },
    },
    methods: {
        doReg: function(data) {
            if (data) {
                // 过滤内容
                data = execLazyload(data);
                data = execFilterIframe(data);
                data = execFilterXSS(data, xss_options);
                data = execFilterLink(data);
                return data;
            } else {
                return "";
            }
        },
        doDOM: function($root) {
            // DOM操作

            renderFoldBlock($root);
            renderMacro();
            renderTalent();

            $root && Prism.highlightAllUnder($root);
            window.MathJax && window.MathJax.typesetPromise();
            if (this.mode != "app_web") {
                Gallery.init(this.$refs.article);
            }

            this.renderItem();
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
            let dir = renderDirectory(target, this.directorybox);
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
        renderItem(selector = ".e-jx3-item") {
            const vm = this;
            let outer,inner

            $(".e-jx3-item").on('mouseenter',function(e) {
                vm.item_popover_style.left = $(e.target).offset().left + 'px';
                vm.item_popover_style.top = $(e.target).offset().top + 24 + 'px';
                vm.item_id = $(e.target).attr("data-id");

                clearTimeout(outer)
                $('.c-item-pop').fadeIn()
            });
            $('.e-jx3-item').on('mouseleave',function (e){
                outer = setTimeout(() => {
                    $('.c-item-pop').fadeOut()
                },380)
            })
            $('.c-item-pop').on('mouseenter',function (e){
                clearTimeout(outer)
                $('.c-item-pop').fadeIn()
            })
            $(".c-item-pop").on("mouseleave", function(e) {
                clearTimeout(inner)
                inner = setTimeout(() => {
                    $('.c-item-pop').fadeOut()
                },280)
            });
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
    },
    watch: {
        content: function() {
            this.run();
        },
    },
    mounted: function() {
        const params = new URLSearchParams(location.search);
        this.mode = params.get("mode") || "";
        this.run();
    },
    components: {
        "el-pagination": Pagination,
        "el-button": Button,
        // "el-popover": Popover,
        "jx3-item": Item,
    },
};
</script>

<style lang="less">
@import "../assets/css/article.less";
</style>
