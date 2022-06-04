<template>
    <div class="w-author">
        <div class="w-skill-wrapper">
            1
        </div>
    </div>
</template>

<script>
import { getUserInfo, getUserMedals, getUserPublicTeams } from "../service/author";
import medal from "./components/medal.vue"
export default {
    name: "Author",
    components: {
        // medal,
    },
    props: ["uid"],
    data: () => ({
        data: null,
        medals: [],
        teams: [],
    }),
    methods: {
        loadData: function() {
            return getUserInfo(this.uid)
                .then((data) => {
                    this.data = data;
                })
                .then(() => {
                    this.loadMedals();
                    this.loadTeams();
                });
        },
        loadMedals: function() {
            getUserMedals(this.uid).then((data) => {
                this.medals = data;
            });
        },
        loadTeams: function() {
            getUserPublicTeams(this.uid).then((data) => {
                this.teams = data && data.slice(0, 5);
            });
        },

        showMedalIcon: function(val) {
            return __imgPath + "image/medals/user/" + val + ".gif";
        },
        showMedalDesc: function(item) {
            return item.medal_desc || medal_map[item.medal];
        },
        showTeamLogo: function(val) {
            return getThumbnail(val, 96);
        },
    }
}
</script>
