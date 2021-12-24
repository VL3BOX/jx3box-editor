<template>
    <div class="c-editor-markdown-dialog">
        <span class="c-markdown-toolbar-file c-markdown-toolbar-item" @click="handleClick" title="插入宏">宏</span>

        <el-dialog :visible.sync="visible" title="插入宏" :modal-append-to-body="false">
            <el-input class="u-input u-input-macro" type="textarea" :rows="15" v-model="macro" show-word-limit :maxlength="128"></el-input>

            <div slot="footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="insert">插入</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'markdown_marco',
    data() {
        return {
            visible: false,
            macro: ''
        }
    },
    methods: {
        handleClick() {
            this.visible = true
        },
        cancel() {
            this.visible = false
            this.macro = ''
        },
        insert() {
            const content = `<pre class="e-jx3macro-area w-jx3macro">${this.macro}</pre>`

            this.$emit('insert', content)

            this.macro = ''

            this.visible = false
        }
    }
}
</script>

<style lang="less">
@import '../../../assets/css/markdown/dialog.less';
</style>