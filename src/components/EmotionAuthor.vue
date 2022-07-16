<template>
    <div class="w-author" v-loading="loading">
        <div class="w-author-wrapper el-popover" v-if="data">
            <div class="u-author">
                <Avatar class="u-avatar" :uid="data.user_id" :url="data.user_info.user_avatar" :size="68" />
                <div class="u-author-info">
                    <div class="u-author-name">{{ data.user_info.display_name }}</div>
                    <div class="u-author-time">{{ data.created_at }}</div>
                </div>
                <div class="u-desc">{{ data.desc }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { authorLink, getLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { getEmotion } from "../../service/author";
import { __server, __imgPath,__userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
import Avatar from "./Avatar.vue"
export default {
    name: "EmotionAuthor",
    components: {
        Avatar
    },
    props: ["id"],
    data: () => ({
        data: null,
        loading: false
    }),
    computed: {
    },
    watch: {
        id: {
            immediate: true,
            handler (val) {
                if (val) {
                    this.loadData()
                }
            }
        }
    },
    methods: {
        authorLink,
        loadData() {
            this.loading = true;
            getEmotion(this.id).then(res => {
                this.data = res.data.data;
                this.loading = false;
            });
        }
    }
}
</script>

<style lang="less">
@import "../../assets/css/module/author.less";
.w-author {
    .w-author-wrapper {
        .u-author{
            padding:5px 0 15px 0;
        }
        .u-avatar {
            .fl;
            .mr(15px);
        }
        img {
            border: none;
            margin:0;
            padding:0;
        }
        a {
            .lh(28px);
            text-decoration: none;
            &:hover {
                text-decoration: none;
                box-shadow: none;
            }
        }
    }
}
</style>
