<template>
    <div class="c-upload-album">
        <Upload @insert="updateFileList" text="批量上传图片" />
        <div class="c-upload-album-list">
            <draggable v-model="imgList" v-if="imgList && imgList.length">
                <transition-group>
                    <div class="u-album-item" v-for="(item,i) in imgList" :key="i">
                        <img class="u-pic" :src="item.url | showThumbnail" />
                        <i class="u-mask"></i>
                        <i class="u-op u-preview el-icon-zoom-in" @click="previewHandle(item)"></i>
                        <i class="u-op u-delete el-icon-delete" @click="deleteHandle(i)"></i>
                    </div>
                </transition-group>
            </draggable>
            <div class="u-null"><i class="el-icon-warning-outline"></i> 当前没有任何图片</div>
        </div>
        <el-dialog class="c-upload-album-preview" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>

<script>
import Upload from "./Upload.vue";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils.js";
import draggable from "vuedraggable";

export default {
    name: "album",
    props: ["data"],
    data: function () {
        return {
            imgList: this.data || [],
            dialogImageUrl: "",
            dialogVisible: false,
        };
    },
    model: {
        prop: "data", //向上同步数据
        event: "update",
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler: function (newval) {
                this.imgList = newval || [];
            },
        },
        imgList: {
            deep: true,
            handler: function (newval) {
                this.$emit("update", newval);
            },
        },
    },
    computed: {},
    methods: {
        updateFileList: function (data) {
            let upload_list = data.list;
            let img_list = [];
            upload_list.forEach((item) => {
                if (item.is_img) {
                    img_list.push({
                        name: item.name,
                        url: item.url,
                    });
                }
            });
            this.imgList = img_list;
        },
        previewHandle: function (item) {
            this.dialogImageUrl = item.url;
            this.dialogVisible = true;
        },
        deleteHandle: function (i) {
            this.imgList.splice(i, 1);
        },
    },
    filters: {
        showThumbnail: function (val) {
            return getThumbnail(val, 146);
        },
    },
    mounted: function () {},
    components: {
        draggable,
        Upload,
    },
};
</script>

<style lang="less">
.c-upload-album-list {
    border: 2px dashed #eee;
    padding: 8px 0 0 8px;
    margin-top: 20px;
    .r(4px);

    @h:148px;
    min-height:@h;
    .u-null{
        .x;
        .fz(12px,@h);
        color:#999;
    }

    .u-album-item {
        .pr;
        .size(@h);
        img {
            .db;
            .size(100%);
        }
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 8px 8px 0;
        display: inline-block;
        &:hover {
            .u-mask,
            .u-op {
                .db;
            }
        }
    }

    .u-mask,
    .u-op {
        .pa;
        .none;
    }
    .u-op {
        .pointer;
    }
    .u-mask {
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        .lt(0);
        .size(100%);
        .none;
        cursor: move;
    }
    .u-delete,
    .u-preview {
        .fz(20px);
        color: #fff;
        .lt(50%);
        .size(20px);
        transform: translate(-50%, -50%);
    }
    .u-delete {
        .ml(20px);
    }
    .u-preview {
        .ml(-20px);
    }
}
</style>
