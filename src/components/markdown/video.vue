<template>
    <div class="c-editor-markdown-dialog">
        <span class="c-markdown-toolbar-video c-markdown-toolbar-item" @click="handleClick" title="插入视频">
            <i class="el-icon-video-camera"></i>
        </span>

        <el-dialog :visible.sync="visible" title="插入视频" :modal-append-to-body="false">
            <div class="u-help">请填入BV号或链接地址。<a style="color: #0366D6;font-weight: normal;" href="/tool/686/" target="_blank">[点击查看帮助]</a></div>

            <el-input class="u-input" placeholder="请输入BV号或链接地址" v-model="videoUrl"></el-input>

            <div slot="footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="insert">插入</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "markdown_video",
    data() {
        return {
            visible: false,
            videoUrl: "",
        };
    },
    methods: {
        handleClick() {
            this.visible = true;
        },
        cancel() {
            this.visible = false;
            this.videoUrl = "";
        },
        insert() {
            const content = `<iframe class="w-player-bilibili" src="//player.bilibili.com/player.html?bvid=${this.videoUrl}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="400" height="300"> </iframe>`;

            this.$emit("insert", content);


            this.videoUrl = "";

            this.visible = false;
        },
    },
};
</script>

