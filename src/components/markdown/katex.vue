<template>
    <div class="c-editor-markdown-dialog">
        <span class="c-markdown-toolbar-file c-markdown-toolbar-item u-katex" @click="handleClick" :title="$t('插入Latex')">
            Σ
        </span>

        <el-dialog :visible.sync="visible" :title="$t('插入数学公式')" :modal-append-to-body="false">
            <a class="u-help" href="/tool/16295" target="_blank">💙 {{ $t('查看帮助文档') }}</a>

            <el-input class="u-input u-input-katex" type="textarea" :rows="5" v-model="katex"></el-input>

            <div slot="footer">
                <el-button @click="cancel">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="insert">{{ $t('插入') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "markdown_katex",
    data() {
        return {
            visible: false,
            katex: "",
        };
    },
    methods: {
        handleClick() {
            this.visible = true;
        },
        cancel() {
            this.visible = false;
            this.katex = "";
        },
        insert() {
            const content = `<pre class="e-latex-area w-latex">${this.katex}</pre>`;

            this.$emit("insert", content);

            this.katex = "";

            this.visible = false;
        },
    },
};
</script>

<style lang="less">
.c-markdown-toolbar-item.u-katex {
    display: inline-flex;
    justify-content: center;
    align-content: center;
    width: 26px;
    height: 26px;
}
</style>
