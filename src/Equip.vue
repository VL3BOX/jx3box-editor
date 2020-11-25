<template>
    <div class="c-equip" v-if="plan">
        <div
            class="u-equip"
            :class="'u-equip-' + label"
            v-for="(item, label) in equip"
            :key="label"
        >
            <jx3-item-simple :item="item" :onlyIcon="true" iconSize="56px"/>
        </div>
        <a class="u-author" :href="userpage" target="_blank">
            <img :src="avatar" class="u-author-avatar">
            <span class="u-author-name">{{username}}</span>
        </a>
    </div>
</template>

<script>
import ItemSimple from "./ItemSimple";
import {authorLink} from '@jx3box/jx3box-common/js/utils'
    export default {
        props:['data'],
        data : function(){
            return {
            }
        },
        computed: {
            plan : function (){
                return this.data  
            },
            equip: function() {
                return {
                    weapon_1 : this.plan.relation_items[1][0],
                    weapon_2 : this.plan.relation_items[2][0],
                    cap : this.plan.relation_items['3_2'][0],
                    cloth : this.plan.relation_items['3_1'][0],
                    belt : this.plan.relation_items['3_3'][0],
                    wrist : this.plan.relation_items['3_6'][0],
                    trousers : this.plan.relation_items['3_4'][0],
                    shoes : this.plan.relation_items['3_5'][0],
                    necklace : this.plan.relation_items['4_1'][0],
                    pendant : this.plan.relation_items['4_3'][0],
                    ring_1 : this.plan.relation_items['4_2_1'][0],
                    ring_2 : this.plan.relation_items['4_2_2'][0],
                };
            },
            avatar : function (){
                return this.plan ? this.plan.user_avatar : ''
            },
            username : function (){
                return this.plan ? this.plan.user_nickname : ''
            },
            uid : function (){
                return this.plan ? this.plan.user_id : ''
            },
            userpage : function (){
                return this.uid ? authorLink(this.uid) : ''
            }
        },
        methods:{},
        mounted:function(){},
        components: {
            "jx3-item-simple": ItemSimple,
        },
    }
</script>

<style scoped lang="less">
.c-equip{
    .dbi;
    .size(464px,621px);
    background:url('../assets/img/equip_bg.png') no-repeat 0 0;
    background-color:#324f4a;
    .r(6px);

    .pr;
    .u-equip{
        .pa;
        .u-name{.none;}
        .u-uiid{.none;}
    }

    .u-equip-weapon_1{
        .lt(161px,547px);
    }
    .u-equip-weapon_2{
        .lt(225px,547px);
    }

    .u-equip-cap{
        .lt(11px,88px);
    }

    .u-equip-cloth{
        .lt(11px,225px);
    }

    .u-equip-belt{
        .lt(11px,420px);
    }

    .u-equip-wrist{
        .lt(397px,82px);
    }

    .u-equip-trousers{
        .lt(397px,147px);
    }

    .u-equip-shoes{
        .lt(397px,211px);
    }

    .u-equip-necklace{
        .lt(397px,275px);
    }

    .u-equip-pendant{
        .lt(397px,339px);
    }

    .u-equip-ring_1{
        .lt(397px,404px);
    }

    .u-equip-ring_2{
        .lt(397px,468px);
    }

    .u-author{
        .pa;.lt(50%);
        transform: translate3d(-50%,-50%,0);
        img{
            .r(4px);
        }
        span,img{
            .db;
        }
        span{
            color:#fff;
            .fz(14px,2.5);
        }
    }

    
}
    
</style>