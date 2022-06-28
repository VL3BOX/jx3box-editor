<template>
    <div class="w-author" v-loading="loading">
        <div class="w-author-wrapper el-popover" v-if="data">
            <div class="u-author">
                <Avatar class="u-avatar" :uid="uid" :url="data.user_avatar" :size="68" :frame="data.user_avatar_frame" />
                <div class="u-info">
                    <a class="u-name" :href="authorLink(uid)" target="_blank">
                        <span>{{ data.display_name.slice(0, 8) }}</span>
                        <el-tooltip class="item" effect="dark" content="签约作者" placement="top" v-if="isSuperAuthor">
                            <a class="u-superauthor" href="/dashboard/cooperation" target="_blank">
                                <img :src="super_author_icon" alt="superauthor" />
                            </a>
                        </el-tooltip>
                    </a>
                    <div class="u-extend" v-if="isVip">
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">
                                <span class="u-tips">经验值：{{ data.experience }}</span>
                            </div>
                            <span class="u-level" :class="'lv-' + level" :style={backgroundColor:showLevelColor(level)}>Lv.{{ level }}</span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" :content="vipTypeTitle" placement="top" v-if="isVip">
                            <a class="u-vip" href="/vip/premium?from=sidebar_author" target="_blank">
                                <i class="i-icon-vip on">{{ vipType }}</i>
                            </a>
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="u-trophy" v-if="hasTrophy">
                <div class="u-medals" v-if="medals && medals.length">
                    <medal :medals="medals" :showIcon="showMedalIcon"></medal>
                </div>
            </div>
            <div class="u-teams" v-if="teams && teams.length">
                <a class="u-team" v-for="(item, i) in teams" :key="i" :href="teamLink(item.team_id)" target="_blank">
                    <img class="u-team-logo" :src="showTeamLogo(item.team_logo)" />
                    <span class="u-team-name">{{ item.team_name }}@{{ item.team_server }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { authorLink, getLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { getUserInfo, getUserMedals, getUserPublicTeams } from "../service/author";
import { __server, __imgPath,__userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { __userLevel } from "@jx3box/jx3box-common/data/jx3box.json";
import Avatar from "./components/Avatar.vue"
import medal from "./components/medal.vue"
export default {
    name: "Author",
    components: {
        medal,
        Avatar
    },
    props: ["uid"],
    data: () => ({
        data: null,
        medals: [],
        teams: [],
        loading: false
    }),
    computed: {
        super_author_icon: function() {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        isVip: function (){
            return this.data?.is_pro || this.data?.is_pre
        },
        vipTypeTitle: function() {
            return this.data?.is_pro ? "专业版会员" : "高级版会员";
        },
        vipType: function() {
            return this.data?.is_pro ? "PRO" : "PRE";
        },
        level: function() {
            return User.getLevel(this.data && this.data.experience);
        },
        hasTrophy: function() {
            return this.medals.length;
        },
        isSuperAuthor: function() {
            return !!this.data?.sign;
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler (val) {
                if (val) {
                    this.loadData()
                }
            }
        }
    },
    methods: {
        loadData: function() {
            const promises = [getUserInfo(this.uid), getUserMedals(this.uid), getUserPublicTeams(this.uid)];
            this.loading = true;
            Promise.all(promises).then(res => {
                this.data = res[0];
                this.medals = res[1];
                this.teams = res[2];
                this.loading = false;
            });
        },
        loadUserInfo: function (){
            return getUserInfo(this.uid)
                .then((data) => {
                    this.data = data;
                })
        },
        loadMedals: function() {
            return getUserMedals(this.uid).then((data) => {
                this.medals = data;
            });
        },
        loadTeams: function() {
            return getUserPublicTeams(this.uid).then((data) => {
                this.teams = data && data.slice(0, 5);
            });
        },

        showMedalIcon: function(val) {
            return __imgPath + "image/medals/user/" + val + ".gif";
        },
        showMedalDesc: function(item) {
            return item.medal_desc || medal_map[item.medal];
        },
        teamLink: function(team_id) {
            return getLink("org", team_id);
        },
        showTeamLogo: function(val) {
            return getThumbnail(val, 96);
        },
        showLevelColor:function (level){
            return __userLevelColor[level]
        },
        authorLink
    }
}
</script>

<style lang="less">
@import "../assets/css/module/author.less";
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
