<template>
    <div class="c-skill">
        <div class="c-skill-wrapper">
            <h4 class="u-title" v-if="skillInfo.Name">{{ skillInfo.Name }}</h4>

            <div class="u-desc">{{ skillInfo.Desc }}</div>
        </div>
    </div>
</template>

<script>
import { getSkill } from '../service/database.js';
import weaponTypes from '../assets/data/weapon_type.json';
import { school } from '@jx3box/jx3box-data/data/xf/school.json'
export default {
    name: 'Skill',
    props: ['skill', 'skill_id'],
    data() {
        return {
            skillInfo: null,

            // maps
            weaponTypes,
        }
    },
    watch: {
        skill: {
            immediate: true,
            handler(val) {
                if (typeof val !== "undefined") this.skillInfo = val;
            },
        },
        skill_id: {
            immediate: true,
            handler(val) {
                if (val) {
                    // 读取本地数据
                    const cache = sessionStorage.getItem(`skill-${val}`);
                    const cache_created = sessionStorage.getItem(
                        `skill-${val}-created`
                    );

                    // 检查缓存是否有效
                    if (
                        cache &&
                        Math.round(new Date() / 1000) - cache_created <= 3600
                    ) {
                        this.skillInfo = JSON.parse(cache);
                        return;
                    }

                    // 没有缓存则发起请求获取数据
                    getSkill(val, 'std').then((res) => {
                        const data = res.data;
                        const [skill] = data.list;
                        // console.log(data)
                        this.skillInfo = skill;

                        // 将数据放入 sessionStorage
                        sessionStorage.setItem(
                            `skill-${skill.SkillID}`,
                            JSON.stringify(skill)
                        );
                        sessionStorage.setItem(
                            `skill-${skill.SkillID}-created`,
                            Math.round(new Date() / 1000)
                        );
                    });
                } else if (typeof this.skill_id !== "undefined") {
                    this.skillInfo = null;
                }
            },
        },
    },
    filters: {
        schoolName: function (val){
            let name = ''
            Object.entries(school).forEach(([school, key]) => {
                if (key == val) {
                    name = school
                }
            })
            return name
        }
    }
}
</script>

<style lang="less">
@import '../assets/css/module/skill.less';
</style>
