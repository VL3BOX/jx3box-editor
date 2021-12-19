<template>
    <div>
        <Markdown v-model="content"/>
    </div>
</template>

<script>
import Markdown from "../src/Markdown.vue";
export default {
    name: "MarkdownDemo",
    props: [],
    components: {
        Markdown,
    },
    data: function() {
        return {
            content : ''
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function() {},
    mounted: function() {},
};
</script>
