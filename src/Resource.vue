<template>
    <div class="c-resource">
        <!-- 上传触发按钮 -->
        <el-button class="u-switch" type="primary" @click="dialogVisible = true"
            ><img
                class="u-icon"
                svg-inline
                src="../assets/img/jx3.svg"
            />剑三资源</el-button
        >

        <!-- 弹出界面 -->
        <el-dialog
            class="c-large-dialog"
            title="剑三数据库"
            :visible.sync="dialogVisible"
        >
            <div class="c-resource-content" v-loading="loading">
                <div class="m-database-search">
                    <el-input
                        placeholder="请输入 ID 或 名称"
                        v-model="query"
                        @change="search"
                        @keyup.enter.native="search"
                    >
                        <template slot="prepend">ID ／名称</template>
                        <template slot="append" v-if="isPC"
                            ><el-switch
                                v-model="strict"
                                active-text="精确匹配"
                                @change="search"
                            >
                            </el-switch
                        ></template>
                    </el-input>
                </div>

                <el-tabs
                    class="m-database-tabs"
                    v-model="type"
                    type="card"
                    @tab-click="changeType"
                >
                    <el-tab-pane label="技能" name="skill">
                        <span slot="label">
                            <img
                                class="u-icon"
                                svg-inline
                                src="../assets/img/skill.svg"
                            />
                            <b>技能</b>
                            <em class="u-count">{{ stat.skill }}</em>
                        </span>
                        <p v-if="skill.length && done" class="m-resource-count">
                            <i class="el-icon-s-data"></i> 共找到
                            <b>{{ skill.length }}</b> 条记录
                        </p>
                        <ul class="m-resource-list">
                            <li
                                v-for="(o, i) in skill"
                                class="u-item"
                                :key="i"
                                :class="{ on: !!o.isSelected }"
                                @click="selectCommon('skill', o, i)"
                                ref="skill"
                            >
                                <span class="u-id">ID:{{ o.SkillID }}</span>
                                <img
                                    class="u-pic"
                                    :title="'IconID:' + o.IconID"
                                    :src="o.IconID | iconURL"
                                />
                                <span class="u-primary">
                                    <span class="u-name"
                                        >{{ o.Name }}
                                        <em v-if="o.SkillName"
                                            >({{ o.SkillName }})</em
                                        >
                                    </span>
                                    <span class="u-content">{{
                                        o.Desc | filterRaw
                                    }}</span>
                                </span>
                            </li>
                        </ul>
                        <el-alert
                            v-if="!skill.length && done"
                            title="没有找到相关条目"
                            type="info"
                            show-icon
                        >
                        </el-alert>
                    </el-tab-pane>
                    <el-tab-pane label="Buff" name="buff">
                        <span slot="label">
                            <img
                                class="u-icon"
                                svg-inline
                                src="../assets/img/buff.svg"
                            />
                            <b>Buff</b>
                            <em class="u-count">{{ stat.buff }}</em>
                        </span>
                        <p v-if="buff.length && done" class="m-resource-count">
                            <i class="el-icon-s-data"></i> 共找到
                            <b>{{ buff.length }}</b> 条记录
                        </p>
                        <ul class="m-resource-list">
                            <li
                                v-for="(o, i) in buff"
                                class="u-item"
                                :key="i"
                                :class="{ on: !!o.isSelected }"
                                @click="selectCommon('buff', o, i)"
                                ref="buff"
                            >
                                <span class="u-id">ID:{{ o.BuffID }}</span>
                                <img
                                    class="u-pic"
                                    :title="'IconID:' + o.IconID"
                                    :src="o.IconID | iconURL"
                                />
                                <span class="u-primary">
                                    <span class="u-name"
                                        >{{ o.Name }}
                                        <em v-if="o.BuffName"
                                            >({{ o.BuffName }})</em
                                        ></span
                                    >
                                    <span class="u-content">{{ o.Desc }}</span>
                                </span>
                            </li>
                        </ul>
                        <el-alert
                            v-if="!buff.length && done"
                            title="没有找到相关条目"
                            type="info"
                            show-icon
                        >
                        </el-alert>
                    </el-tab-pane>
                    <el-tab-pane label="物品" name="item">
                        <span slot="label">
                            <img
                                class="u-icon"
                                svg-inline
                                src="../assets/img/item.svg"
                            />
                            <b>物品</b>
                            <em class="u-count">{{ stat.item }}</em>
                        </span>
                        <p v-if="item.length && done" class="m-resource-count">
                            <i class="el-icon-s-data"></i> 共找到
                            <b>{{ item.length }}</b> 条记录
                        </p>
                        <ul class="m-resource-list" v-if="item.length">
                            <li
                                v-for="(o, i) in item"
                                :key="i"
                                class="u-item"
                                :class="{ on: o.isSelected }"
                                @click="selectItem(o, i)"
                                ref="item"
                            >
                                <span class="u-id">UiID:{{ o.UiID }}</span>
                                <img
                                    class="u-pic"
                                    :title="'IconID:' + o.IconID"
                                    :src="o.IconID | iconURL"
                                />
                                <span class="u-name">{{ o.Name }}</span>
                                <span
                                    class="u-content"
                                    v-html="o.DescHtml"
                                ></span>
                                <span class="u-remark">{{
                                    o.Requirement
                                }}</span>
                            </li>
                        </ul>
                        <el-alert
                            v-if="!item.length && done"
                            title="没有找到相关条目"
                            type="info"
                            show-icon
                        >
                        </el-alert>
                    </el-tab-pane>
                    <el-tab-pane label="图标" name="icon">
                        <span slot="label">
                            <img
                                class="u-icon"
                                svg-inline
                                src="../assets/img/icons.svg"
                            />
                            <b>图标</b>
                            <em class="u-count">{{ stat.icon }}</em>
                        </span>
                        <p v-if="icon.length && done" class="m-resource-count">
                            <i class="el-icon-s-data"></i> 共找到
                            <b>{{ icon.length }}</b> 条记录
                        </p>
                        <ul class="m-resource-iconlist">
                            <li
                                v-for="(o, i) in icon"
                                class="u-item"
                                :key="i"
                                :class="{ on: !!o.isSelected }"
                                @click="selectIcon(o)"
                                ref="icon"
                            >
                                <!-- <el-tooltip
                                    effect="dark"
                                    :content="o.Name || query"
                                    placement="top"
                                > -->
                                <img
                                    class="e-jx3-icon"
                                    :src="o.iconID | iconURL"
                                    :alt="query"
                                />
                                <!-- </el-tooltip> -->
                            </li>
                        </ul>
                        <el-alert
                            v-if="!icon.length && done"
                            title="没有找到相关条目"
                            type="info"
                            show-icon
                        >
                        </el-alert>
                    </el-tab-pane>
                </el-tabs>

                <template v-if="multipage">
                    <!-- 下一页 -->
                    <el-button
                        class="m-archive-more"
                        :class="{ show: hasNextPage }"
                        type="primary"
                        icon="el-icon-arrow-down"
                        @click="appendPage"
                        >加载更多</el-button
                    >
                    <!-- 分页 -->
                    <el-pagination
                        class="m-archive-pages"
                        background
                        layout="total, prev, pager, next,jumper"
                        :hide-on-single-page="true"
                        :page-size="per"
                        :total="total"
                        :current-page.sync="page"
                        @current-change="changePage"
                    >
                    </el-pagination>
                </template>

                <div class="m-database-tip" v-show="isBlank">
                    ❤ 请输入搜索条件查询
                </div>
            </div>

            <!-- 插入按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="insert">{{
                    buttonTXT
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import { loadResource, loadStat, getIcons } from "../service/database";
import { __ossRoot, __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { school } from "@jx3box/jx3box-data/data/xf/school.json";
export default {
    name: "Resource",
    props: [],
    data: function() {
        return {
            dialogVisible: false,

            type: "skill",
            query: "",
            strict: false,

            skill: [],
            buff: [],
            item: [],
            icon: [],

            stat: {
                skill: 0,
                buff: 0,
                item: 0,
                npc: 0,
                icon: 0,
            },

            done: false,
            loading: false,

            isSuper: false,
            schools: school,

            html: "",
            isPC: true,

            per: 10,
            page: 1,
            total: 1,
            pages: 1,
        };
    },
    computed: {
        buttonTXT: function() {
            return this.selectedCount ? "插 入" : "确 定";
        },
        isBlank: function() {
            return !this.query && !this[this.type]["length"];
        },
        selectedCount: function() {
            return !!this.html;
        },
        isNumber: function() {
            return !isNaN(this.query);
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        multipage: function() {
            return this.type !== "icon" && this.done && this.pages > 1;
        },
    },
    watch: {
        html: function(newval) {
            this.$emit("update", newval);
        },
    },
    methods: {
        getData: function(page = 1, append = false) {
            if (!this.query) return;

            this.loading = true;
            this.done = false;
            let query = this.query;
            let params = {
                strict: ~~this.strict,
                per: this.per,
                page: page,
            };

            // 图标
            if (this.type == "icon") {
                if (isNaN(query)) {
                    getIcons(query, params)
                        .then((data) => {
                            this.icon = data;
                        })
                        .finally(() => {
                            this.done = true;
                            this.loading = false;
                        });
                } else {
                    let arr = [
                        {
                            iconID: ~~this.query,
                            isSelected: false,
                        },
                    ];
                    this.icon = arr;
                    this.done = true;
                    this.loading = false;
                }

                // 非图标
            } else {
                loadResource(this.type, query, params)
                    .then((data) => {
                        if (!append) this[this.type] = [];
                        let list;
                        if (this.type == "item") {
                            list = this.transformData(data.data);
                            this.pages = data.last_page;
                            this.total = data.total;
                        } else {
                            list = this.transformData(data.list);
                            this.pages = data.pages;
                            this.total = data.total;
                        }
                        this[this.type] = this[this.type].concat(list);
                    })
                    .finally(() => {
                        this.done = true;
                        this.loading = false;
                    });
            }
        },
        search: function() {
            this.getData();
        },
        appendPage: function() {
            this.getData(++this.page, true);
        },
        changePage: function(i) {
            this.getData(i);
        },
        changeType: function() {
            this.page = 1;
            this.getData();
        },
        insert: function() {
            this.dialogVisible = false;
            this.$emit("insert", this.html);
        },
        transformData: function(data) {
            data.forEach((item) => {
                item.isSelected = false;
            });
            return data;
        },
        selectCommon: function(type, o, i) {
            this.resetItems();
            o.isSelected = true;
            this.html = `<pre data-type="${type}" data-id="${
                o.id
            }" class="e-jx3-resource">${
                this.$refs[this.type][i]["innerHTML"]
            }</pre>`;
        },
        selectItem: function(o, i) {
            this.resetItems();
            o.isSelected = true;
            this.html = `<a class="e-jx3-item e-jx3-item-q${o.Quality}" data-id="${o.id}" data-quality="${o.Quality}" target="_blank" href="${o.Link}">[${o.Name}]</a>`;
        },
        selectIcon: function(o) {
            this.resetItems();
            o.isSelected = true;
            this.html = `<img class="e-jx3-icon" src="${__iconPath}icon/${o.iconID}.png" alt="${o.iconID}"/>`;
            console.log(this.html);
        },
        resetItems: function() {
            let data = this[this.type];
            data.forEach((item) => {
                item.isSelected = false;
            });
        },
        showIcon: function(id) {
            return __iconPath + "icon/" + id + ".png";
        },
        checkUA: function() {
            this.isPC = window.innerWidth > 720;
        },
    },
    filters: {
        filterRaw: function(str) {
            return str && str.replace(/\\n/g, "\n");
        },
        iconURL: function(id) {
            return __iconPath + "icon/" + id + ".png";
        },
    },
    created: function() {
        this.checkUA();
        loadStat().then((data) => {
            this.stat = data;
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/resource.less";
</style>
