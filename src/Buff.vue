<template>
    <div class="c-buff" v-if="buffInfo">
        <div class="c-buff-wrapper">
            <!-- buff 名称 -->
            <h4 class="u-title" v-text="buffInfo.Name"></h4>

            <!-- buff 描述 -->
            <div class="u-desc" v-text="buffInfo.Desc"></div>
        </div>
    </div>
</template>

<script>
import { getBuff } from '../service/database.js'
export default {
    name: "Buff",
    props: ["buff", "buff_id"],
    data: () => ({
        buffInfo: null,
    }),
    watch: {
        buff: {
            immediate: true,
            handler(val) {
                if (typeof val !== "undefined") this.buffInfo = val;
            },
        },
        buff_id: {
            immediate: true,
            handler(val) {
                if (val) {
                    // 读取本地数据
                    const cache = sessionStorage.getItem(`buff-${val}`);
                    const cache_created = sessionStorage.getItem(
                        `buff-${val}-created`
                    );

                    // 检查缓存是否有效
                    if (
                        cache &&
                        Math.round(new Date() / 1000) - cache_created <= 3600
                    ) {
                        this.buffInfo = JSON.parse(cache);
                        return;
                    }

                    // 没有缓存则发起请求获取数据
                    getBuff(val).then((res) => {
                        const data = res.data;
                        const [buff] = data.list;
                        // console.log(data)
                        this.buffInfo = buff;

                        // 将数据放入 sessionStorage
                        sessionStorage.setItem(
                            `buff-${buff.BuffID}`,
                            JSON.stringify(buff)
                        );
                        sessionStorage.setItem(
                            `buff-${buff.BuffID}-created`,
                            Math.round(new Date() / 1000)
                        );
                    });
                } else if (typeof this.buff_id !== "undefined") {
                    this.buffInfo = null;
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/module/buff.less";
</style>
