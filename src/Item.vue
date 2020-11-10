<template>
    <div
        v-if="source"
        class="c-item"
        :class="{
            'c-item-equipment': source.AucGenre >= 1 && source.AucGenre <= 4,
        }"
    >
        <div class="c-item-wrapper">
            <!-- 精炼等级 -->
            <div v-if="source.MaxStrengthLevel" class="u-max-strength-level">
                <span
                    v-text="`精炼等级：0 / ${source.MaxStrengthLevel}`"
                ></span>
            </div>
            <!-- 物品名称 -->
            <h4
                class="u-title"
                :style="{ color: color(source.Quality) }"
                v-text="source.Name"
            ></h4>
            <!-- 绑定状态 -->
            <div
                v-if="source.BindType > 1"
                class="u-bind"
                v-text="bind(source.BindType)"
            ></div>
            <!-- 唯一 -->
            <div
                v-if="parseInt(source.MaxExistAmount) === 1"
                class="unique"
                v-text="'唯一'"
            ></div>
            <!-- 存在时间 -->
            <div
                v-if="parseInt(source.MaxExistTime) > 0"
                class="u-max-exist-time"
                v-text="'存在时间：' + second_format(source.MaxExistTime)"
            ></div>
            <!-- 最大拥有数 -->
            <div
                v-if="parseInt(source.MaxExistAmount) > 1"
                class="u-max-exist-amount"
                v-text="'最大拥有数：' + source.MaxExistAmount"
            ></div>
            <!-- 武器类别 -->
            <div v-if="source.AucGenre == 1" class="u-weapon-type-label">
                近身武器
            </div>
            <div v-if="source.AucGenre == 2" class="u-weapon-type-label">
                远程武器
            </div>
            <!-- 物品类型文案 -->
            <div
                v-if="source.TypeLabel"
                class="u-type-label"
                v-text="source.TypeLabel"
            ></div>
            <!-- 装备属性 -->
            <div
                class="u-attributes"
                v-if="source.attributes && source.attributes.length"
            >
                <div
                    v-for="(attribute, key) in source.attributes"
                    :key="key"
                    class="u-field"
                    :class="[`u-${attribute.color}`]"
                >
                    <span
                        v-if="
                            attribute.type == 'atMeleeWeaponAttackSpeedBase' ||
                                attribute.type == 'atRangeWeaponAttackSpeedBase'
                        "
                        class="u-value u-speed"
                        v-text="attribute.label"
                    ></span>
                    <span
                        v-else-if="attribute.type == 'atHorseAttribute'"
                        class="u-value u-horse-attribute"
                    >
                        <img
                            v-if="attribute.icon_id > 0"
                            class="u-horse-icon"
                            :src="icon_url(attribute.icon_id)"
                        />
                        <div
                            class="u-horse-desc"
                            v-html="attribute.label"
                        ></div>
                    </span>
                    <span v-else class="u-value">
                        <span v-text="attribute.label"></span>
                        <span
                            class="u-yellow"
                            v-text="
                                attribute_percent(
                                    attribute.type,
                                    attribute.value
                                )
                            "
                        ></span>
                    </span>
                </div>
            </div>
            <!-- 镶嵌 -->
            <ul v-if="source.Diamonds" class="u-diamonds u-gray">
                <!-- 五行石 -->
                <li
                    class="u-diamond"
                    v-for="(label, key) in source.Diamonds"
                    :key="key"
                >
                    <span class="u-square"></span>
                    <span class="u-text" v-text="`镶嵌孔：${label}`"></span>
                </li>
                <!-- 五彩石 -->
                <li v-if="source.AucGenre == 1" class="u-diamond">
                    <span class="u-square"></span>
                    <span class="u-text">&lt;只能镶嵌五彩石&gt;</span>
                </li>
            </ul>
            <!-- 仅性别可穿戴 -->
            <div
                v-if="source.Requires && source.Requires[7]"
                class="u-require-sex"
                v-text="source.Requires[7]"
            ></div>
            <!-- 需要门派 -->
            <div
                v-if="source.Requires && source.Requires[6]"
                class="u-require-school"
                v-text="source.Requires[6]"
            ></div>
            <!-- 需要等级 -->
            <div
                v-if="source.Requires && source.Requires[5]"
                class="u-require-level"
                v-text="source.Requires[5]"
            ></div>
            <!-- 需要阵营 -->
            <div
                v-if="source.Requires && source.Requires[100]"
                class="u-require-level"
                v-text="source.Requires[5]"
            ></div>
            <!-- 最大耐久度 -->
            <div
                v-if="source.AucGenre >= 1 && source.AucGenre <= 3"
                class="u-max-durability"
                v-text="'最大耐久度' + source.MaxDurability"
            ></div>
            <!-- 套装信息 -->
            <div v-if="source.Set" class="u-set">
                <br />
                <div
                    class="u-yellow"
                    v-text="
                        `${source.Set.name}(1/${source.Set.siblings.length})`
                    "
                ></div>
                <ul class="u-set-siblings u-gray">
                    <li
                        v-for="(sibling, key) in source.Set.siblings"
                        :key="key"
                        v-text="sibling"
                        :class="{ 'u-yellow': sibling == source.Name }"
                    ></li>
                </ul>
                <br />
                <ul class="u-set-attributes u-gray">
                    <li
                        v-for="(attribute, key) in source.Set.attributes"
                        :key="key"
                        v-text="`[${key}]${attribute}`"
                    ></li>
                </ul>
                <br />
            </div>
            <!-- 描述 -->
            <p
                v-if="source.DescHtml"
                class="u-desc u-yellow"
                v-html="source.DescHtml"
            ></p>
            <!-- 五彩石属性 -->
            <p
                v-if="source.WuCaiHtml"
                class="u-desc"
                v-html="source.WuCaiHtml"
            ></p>
            <!-- 品质等级 -->
            <div
                v-if="source.Level"
                class="u-level u-yellow"
                v-text="'品质等级' + source.Level"
            ></div>
            <!-- 装备分数 -->
            <div
                v-if="source.EquipmentRating"
                class="u-equipment-rating u-orange"
                v-text="'装备分数' + source.EquipmentRating"
            ></div>
            <!-- 推荐门派心法 -->
            <div
                v-if="source.Recommend"
                class="u-equipment-recommend"
                v-text="'推荐门派：' + source.Recommend"
            ></div>
            <!-- 冷却时间 -->
            <div
                v-if="source.CoolDown"
                class="u-equipment-recommend"
                v-text="'使用间隔' + second_format(source.CoolDown)"
            ></div>
            <!-- 外观名称 -->
            <div
                v-if="source.Appearance"
                class="u-appearance"
                v-text="'外观名称：' + source.Appearance"
            ></div>
            <!-- 可收集门派 -->
            <div
                v-if="source.CanExterior"
                class="u-can-exterior"
                v-text="'外观：' + source.CanExterior"
            ></div>
            <!-- 储物箱共享 -->
            <div
                v-if="
                    source.CanShared &&
                        !(source.AucGenre >= 1 && source.AucGenre <= 4)
                "
                class="u-can-shared"
            >
                该物品可以放入账号储物箱共享。
            </div>
            <div
                v-if="
                    source.CanShared &&
                        source.AucGenre >= 1 &&
                        source.AucGenre <= 4
                "
                class="u-can-shared"
            >
                该装备未精炼、镶嵌、附魔、穿戴前可以放入账号储物箱共享。
            </div>
        </div>
    </div>
</template>

<script>
import { get_item } from "../service/item.js";
import icon_url from "../assets/js/item/icon_url.js";
import second_format from "../assets/js/item/second_format.js";
import attribute_percent from "../assets/js/item/attribute_percent.js";
import bind from "../assets/js/item/bind.js";
import color from "../assets/js/item/color.js";

export default {
    name: "Item",
    props: ["item", "item_id"],
    data() {
        return {
            source: null,
        };
    },
    methods: {
        icon_url,
        second_format,
        attribute_percent,
        bind,
        color,
    },
    watch: {
        item: {
            immediate: true,
            handler() {
                this.source = this.item;
            },
        },
        item_id: {
            immediate: true,
            handler() {
                if (this.item_id) {
                    // 提取本地数据
                    let cache = sessionStorage.getItem(`item-${this.item_id}`);
                    let cache_created = sessionStorage.getItem(
                        `item-${this.item_id}-created`
                    );
                    // 查看是否存在缓存
                    if (
                        (cache === false || cache) &&
                        Math.round(new Date() / 1000) - cache_created <= 3600
                    ) {
                        this.source =
                            cache === false ? null : JSON.parse(cache);
                        return;
                    }

                    // 没有缓存则发起请求获取
                    get_item(this.item_id).then((res) => {
                        let data = res.data;
                        if (data.code === 200) {
                            let item = data.data.item;
                            this.source =
                                JSON.stringify(item) !== "{}" ? item : null;
                            // 记录本地数据
                            sessionStorage.setItem(
                                `item-${this.item_id}`,
                                this.source
                                    ? JSON.stringify(this.source)
                                    : false
                            );
                            sessionStorage.setItem(
                                `item-${this.item_id}-created`,
                                Math.round(new Date() / 1000)
                            );
                        }
                    });
                } else {
                    this.source = null;
                }
            },
        },
    },
};
</script>

<style lang="less" scoped>
@import "../assets/css/module/item.less";
</style>
