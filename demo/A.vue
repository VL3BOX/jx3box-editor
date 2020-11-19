<template>
    <div>
        <ItemSimple :item="item1" />
        <ItemSimple :item="item2" />
        <Article
            :content="content"
            directorybox="#directory"
            style="padding: 20px;"
            @contentRendered="test1"
            @directoryRendered="test2"
        ></Article>
    </div>
</template>

<script>
import ItemSimple from "../src/ItemSimple.vue";
import Article from "../src/Article.vue";
import demohtml from "./content";
import {get_item} from "../service/item";
export default {
    name: "A",
    props: [],
    data: function() {
        return {
            content: demohtml,
            item1: null,
            item2: null,
        };
    },
    computed: {},
    methods: {
        test1: function() {
            console.log("文章已渲染");
        },
        test2: function() {
            console.log("目录已渲染");
        },
    },
    mounted: function() {
        // fetch("https://server.jx3box.com/post/find?id=420").then((res) => {
        //     res.json().then((data) => {
        //         this.content = data.data.post.post_content
        //     })
        // });

        get_item('10_310').then((res) => {
            let data = res.data;
            if (data.code === 200) {
                let item = data.data.item;
                this.item1 = JSON.stringify(item) !== "{}" ? item : null;
            }
        });

        get_item('6_4396').then((res) => {
            let data = res.data;
            if (data.code === 200) {
                let item = data.data.item;
                this.item2 = JSON.stringify(item) !== "{}" ? item : null;
            }
        });
    },
    components: {
        Article,
        ItemSimple,
    },
};
</script>

<style lang="less">
html {
    padding: 20px;
}
</style>
