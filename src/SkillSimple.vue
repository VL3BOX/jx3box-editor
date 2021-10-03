<template>
    <div class="m-simple-skill">
        <el-popover
            v-if="skill && mode !== 'full'"
            placement="right-end"
            popper-class="m-simple-skill-popup"
            width="auto"
            :visible-arrow="false"
            trigger="hover"
            transition="none"
            :close-delay="0"
            v-model="visible"
            @show="skill_id = skill.SkillID"
        >
            <div
                class="m-simple-skill"
                slot="reference"
                @mousedown="visible = false"
                :class="{
                    onlyIcon: mode === 'icon',
                    withName: mode === 'text',
                }"
            >
                <div class="m-icon">
                    <img
                        class="u-icon"
                        :src="icon_url(skill.IconID)"
                        :alt="`IconID:${skill.IconID}`"
                        :style="{ width: iconSize, height: iconSize }"
                    />
                </div>
                <span class="u-name">[{{ skill.SkillName }}]</span>
                <span class="u-uiid fr" v-text="`ID: ${skill.SkillID}`"></span>
            </div>
            <skill-item :skill_id="skill_id" :skill="skill"></skill-item>
        </el-popover>

        <pre class="m-full-skill" v-if="skill && mode === 'full'">
            <span class="u-id">ID:{{ skill.SkillID }}</span>
            <img
                class="u-pic"
                :src="icon_url(skill.IconID)"
                :alt="`IconID:${skill.IconID}`"
            />
            <div class="u-skill-name">{{ skill.Name }}</div>
            <div class="u-skill-desc">{{ skill.Desc }}</div>
        </pre>
    </div>
</template>

<script>
import icon_url from "../assets/js/item/icon_url.js";
import skillItem from "./Skill.vue";
export default {
    components: {
        skillItem,
    },
    props: {
        mode: {
            type: String,
            default: "icon", // text full icon
        },
        skill: {
            type: Object,
            default: null,
        },
        iconSize: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            visible: false,
            skill_id: null,
        };
    },
    methods: {
        icon_url,
    },
};
</script>

<style lang="less">
@import "../assets/css/module/skill_simple.less";
.m-simple-skill-popup {
    min-width: initial;
    padding: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;
    transform: translateY(-10px);
}

.m-simple-skill {
    .u-name {
        color: #fff;
    }
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
        .u-icon,
        .u-uiid {
            .none !important;
        }
        .u-name {
            .db !important;
            cursor: pointer;
            text-decoration: underline;
            color: #555;
            text-shadow: none;
            .mt(5px);
            .bold;
        }
    }
}
.m-full-skill {
    display: block;
    border: 1px solid #eee;
    background: #fafafa;
    margin-bottom: 10px;
    padding: 5px 5px 5px 60px;
    min-height: 60px;
    box-sizing: border-box;
    .pr;
    white-space: normal;
    font-family: -apple-system, "Microsoft YaHei", Trebuchet MS, Calibri,
        BlinkMacSystemFont, Segoe UI, Helvetica Neue, Helvetica, sans-serif;
    text-rendering: optimizelegibility;
    text-shadow: none;

    .u-id {
        font-size: 10px;
        color: #555;
        position: absolute;
        right: 5px;
        top: 5px;
        text-align: right;
    }

    .u-pic {
        border: none;
        outline: none !important;
        padding: 0;
        margin: 0;
        display: block;
        position: absolute;
        left: 5px;
        top: 5px;
        width: 48px;
        height: 48px;
        border-radius: 6px;
        box-shadow: 0 0 1px inset rgb(0 0 0 / 20%);
    }

    .u-skill-name {
        font-size: 14px;
        line-height: 2;
        font-weight: bold;
        display: block;
        cursor: pointer;
        &:hover {
            color: @pink;
        }
    }

    .u-skill-desc {
        font-size: 12px;
        display: block;
        white-space: pre-wrap;
        color: #3d454d;
    }
}
</style>
