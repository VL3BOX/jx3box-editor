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
        ></div>
    </el-popover>
</template>

<script>
    export default {
        name: 'BuffSimple',
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
        })
    }
</script>