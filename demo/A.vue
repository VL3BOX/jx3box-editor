<template>
    <div>
        <Article
            :content="content"
            directorybox="#directory"
            style="padding: 20px;"
            @contentRendered="test1"
            @directoryRendered="test2"
        />
    </div>
</template>

<script>
import Article from "../src/Article.vue";
import demohtml from "./content";
export default {
    name: "A",
    props: [],
    data: function () {
        return {
            content : demohtml
        };
    },
    computed: {},
    methods: {
        test1: function () {
            console.log("文章已渲染");
        },
        test2: function () {
            console.log("目录已渲染");
        },
    },
    mounted: function () {},
    components: {
        Article,
    },
};
</script>

<style lang="less">
    html{
        padding:20px;
    }
</style>