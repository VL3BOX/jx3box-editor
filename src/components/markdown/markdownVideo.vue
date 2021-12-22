<template>
    <div class="c-editor-markdown-dialog m-macro-dialog">
        <span class="c-markdown-toolbar-file c-markdown-toolbar-item" @click="handleClick" title="插入视频">
            <i class="el-icon-video-camera"></i>
        </span>

        <el-dialog :visible.sync="visible" title="插入视频" :modal-append-to-body="false">

            <a class="u-help" href="/tool/686/" target="_blank">💙 点击查看如何获取视频地址</a>

            <el-input class="u-input" type="textarea" :rows="4" v-model="videoUrl"></el-input>

            <div slot="footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="insert">插入</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'markdown_video',
    data() {
        return {
            visible: false,
            videoUrl: ''
        }
    },
    methods: {
        handleClick() {
            this.visible = true
        },
        cancel() {
            this.visible = false
            this.videoUrl = ''
        },
        insert() {
            const content = `<div class="c-article-videox">${this.videoUrl}</div>`

            this.$emit('insert', content)

            this.pz = ''

            this.visible = false
        }
    }
}
</script>

<style lang="less">
@import '../../../assets/css/markdown/common.less';
</style>