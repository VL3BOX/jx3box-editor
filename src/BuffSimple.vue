<!-- buff浮窗 -->
<template>
    <el-popover
        v-if="buff"
        placement="right-end"
        popper-class="m-simple-buff-popup"
        width="auto"
        :visible-arrow="false"
        trigger="hover"
        transition="none"
        :close-delay="0"
        v-model="visible"
        @show="buff_id = buff.BuffID"
    >
        <div
            class="m-simple-buff"
            slot="reference"
            @mousedown="visible = false"
            :class="{ onlyIcon: onlyIcon, withName: withName }"
        >
            <div class="m-icon">
                <img
                    class="u-icon"
                    :src="icon_url(buff.IconID)"
                    :alt="`IconID:${buff.IconID}`"
                    :style="{ width: iconSize, height: iconSize }"
                />
            </div>
            <span
                class="u-name"
                v-text="buff.BuffName"
            >    
            </span>
            <span class="u-uiid fr" v-text="`ID: ${buff.BuffID}`"></span>
        </div>
        <buff-item :buff_id="buff_id"></buff-item>
    </el-popover>
</template>

<script>
import BuffItem from '../components/BuffItem'
import icon_url from "../assets/js/item/icon_url.js"
export default {
    name: 'BuffSimple',
    components: {
        BuffItem
    },
    props: {
        buff: {
            type: Object,
            default: null
        },
        onlyIcon: {
            type: Boolean,
            default: false
        },
        iconSize: {
            type: String,
            default: ''
        },
        withName: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        visible: false,
        buff_id: null
    }),
    methods: {
        icon_url
    }
}
</script>

<style lang="less">
@import '../assets/css/module/buff_simple.less';
.m-simple-buff-popup {
    min-width: initial;
    padding: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;
    transform: translateY(-10px);
}

.m-simple-buff {
    &.onlyIcon {
        .dbi;
        padding: 0;
        margin: 0;
        background-color: none;
        .u-name,
        .u-uiid {
            .none !important;
        }
        .m-icon {
            margin: 0 !important;
        }
    }
    &.withName {
        background: none;
        .w(90px);
        .x;
        .u-name {
            .db !important;
            color: #555;
            text-shadow: none;
            .mt(5px);
            .bold;
        }
    }
}
</style>