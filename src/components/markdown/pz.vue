<template>
    <div class="c-editor-markdown-dialog ">
        <span class="c-markdown-toolbar-file c-markdown-toolbar-item" @click="handleClick" :title="$t('插入配装方案')">{{ $t('装') }}</span>

        <el-dialog :visible.sync="visible" :title="$t('配装方案')" :modal-append-to-body="false">

            <p>👘 {{ $t('请填入魔盒配装方案的') }}<a target="_blank" href="/tool/32032">{{ $t('【嵌入版】') }}</a>{{ $t('编码') }}</p>

            <el-input class="u-input" type="textarea" :rows="4" v-model="pzCode"></el-input>

            <div slot="footer">
                <el-button @click="cancel">{{ $t('取消') }}</el-button>
                <el-button type="primary" @click="insert">{{ $t('插入') }}</el-button>
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
            pzCode: ''
        }
    },
    methods: {
        handleClick() {
            this.visible = true
        },
        cancel() {
            this.visible = false
            this.pzCode = ''
        },
        insert() {
            const content = `${this.pzCode}`

            this.$emit('insert', content)

            this.pz = ''

            this.visible = false
        }
    }
}
</script>
