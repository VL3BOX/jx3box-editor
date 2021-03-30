<template>
    <div class="c-upload-album">
        <el-upload
            :action="API"
            with-credentials
            list-type="picture-card"
            :auto-upload="false"
            :accept="accept"
            :limit="10"
            multiple
            :file-list="fileList"
            :on-change="change"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            ref="uploadbox"
        >
            <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>

<script>
import allow_types from "@jx3box/jx3box-common/data/conf";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
import axios from "axios";
// import draggable from 'vuedraggable'
const imgtypes = ["jpg", "png", "gif", "bmp"];
const API = __server + "upload";
// const API = 'http://localhost:5160/' + "upload";
export default {
    name: "album",
    props: ["data"],
    data: function () {
        return {
            API,
            fileList: this.data || [],
            accept: allow_types.accept,
            sizeLimit: allow_types.sizeLimit,
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
                this.fileList = newval || [];
            },
        },
        fileList: {
            deep: true,
            handler: function (newval) {
                this.$emit("update", this.imglist);
            },
        },
    },
    computed: {
        imglist: function () {
            let imglist = [];
            this.fileList.forEach((img) => {
                imglist.push({
                    name: img.name,
                    url: img.url,
                });
            });
            return imglist;
        },
    },
    methods: {
        change: function (file, fileList) {
            if (file.status != "success") {
                // 判断大小
                if (file.size > this.sizeLimit) {
                    this.$message.error("文件超出大小限制");
                    this.removeFile(fileList, file.uid);
                    return;
                }

                // 构建数据
                let fdata = new FormData();
                fdata.append("file", file.raw);

                // 异步上传
                axios
                    .post(API, fdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                    })
                    .then((res) => {
                        // 提醒
                        this.$message({
                            message: "上传成功",
                            type: "success",
                        });

                        // 修改path
                        file.url = res.data.data.list[0];

                        // // 分析文件类型
                        // let ext = file.name.split(".").pop();
                        // let is_img = imgtypes.includes(ext);

                        // // 额外赋值
                        // file.is_img = is_img;
                        // file.selected = false;

                        // 修改状态加入仓库
                        file.status = "success";
                        this.fileList.push(file);
                    });
            }
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        removeFile: function (fileList, uid) {
            fileList.forEach((file, i) => {
                if (file.uid == uid) {
                    fileList.splice(i, 1);
                }
            });
        },
    },
    mounted: function () {},
    components: {
        // draggable
    },
};
</script>

<style lang="less">
.c-upload-album {
    .el-dialog__body {
        padding-top: 0;
    }

    .el-upload-list li {
        outline: none;
    }

    .el-upload-list__item {
        &:hover {
            border: 1px solid #13ce66;
        }
    }

    // 列表
    .u-file-wrapper {
        .size(100%);
        &.isSelected {
        }
        &.disabled {
            cursor: default;
            opacity: 0.38;
            border-color: #eee;
            .u-fileplaceholder {
                fill: #aaa;
            }
        }
        .pointer;
    }
    .u-filebox {
        .x;
        padding: 37px;
    }
    .u-fileplaceholder {
        width: 40px;
        height: 40px;
        fill: @primary;
    }
    .u-filename {
        .db;
        .nobreak;
    }
}
</style>
