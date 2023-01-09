<template>
    <div class="w-author" v-loading="loading">
        <div class="w-author-wrapper el-popover" v-if="data" :style="decoration">
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
                    <div class="u-extend">
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
import { getUserInfo, getUserMedals, getUserPublicTeams } from "../../service/author";
import { getDecoration } from "../../service/cms";
import { __server, __imgPath,__userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { __userLevel } from "@jx3box/jx3box-common/data/jx3box.json";
import Avatar from "./Avatar.vue"
import medal from "./medal.vue"
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
        loading: false,
        decoration:''
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
                    this.getDecoration()
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
        getDecoration(){
            let decoration_atcard=sessionStorage.getItem('decoration_atcard'+this.uid)
            if(decoration_atcard == 'no'){
                return;
            }
            //已有缓存，读取解析
            if(decoration_atcard){
                this.setDecoration(JSON.parse(decoration_atcard))
                return;
            }
            getDecoration({using:1,user_id:this.uid}).then(data=>{
                let res=data.data.data
                if(res.length==0){
                //空 则为无主题，不再加载接口，界面设No
                    sessionStorage.setItem('decoration_atcard'+this.uid,'no')
                    return;
                }
                let decoration=res.filter(val => {
                    return val.type === 'atcard'
                })
                if(decoration.length>0){
                    sessionStorage.setItem('decoration_atcard'+this.uid,JSON.stringify(decoration[0]))
                    this.setDecoration(decoration[0])
                }else{
                //空 则为无主题，不再加载接口，界面设No
                    sessionStorage.setItem('decoration_atcard'+this.uid,'no')
                }
            })
        },
        setDecoration(decoration_sidebar){
            this.decoration={
                'background-image':'url('+this.showDecoration(decoration_sidebar.val,decoration_sidebar.type)+')'
            }
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
        showDecoration:function(val,type){
            return __imgPath + `decoration/images/${val}/${type}.png`;
        },
        authorLink
    }
}
</script>

<style lang="less">
@import "../../assets/css/module/author.less";
.w-author {
    .w-author-wrapper {
        // background-image: url(https://img.jx3box.com/decoration/images/1_CAT/atcard.png);
        background-repeat: no-repeat;
        background-position: top right;
        background-size: contain;
        .u-author{
            padding:5px 0 15px 5px;
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
