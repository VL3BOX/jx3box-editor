<!--
 * @Author: X3ZvaWQ
 * @Date: 2022-08-20 20:23:57
 * @LastEditors: X3ZvaWQ
 * @LastEditTime: 2022-08-24 22:32:56
 * @Description: 用于渲染游戏内Text标签的文本
-->
<template>
    <span v-html="html"></span>
</template>

<script>
import { extractTextContent, getLink } from "@jx3box/jx3box-common/js/utils";
import { getResource } from "../service/resource";
import { escape } from "lodash";

export default {
    name: "GameText",
    props: {
        text: {
            type: String,
            default: "",
        },
        client: {
            type: String,
            default: "std",
        },
    },
    data: function () {
        return {
            html: "",
        };
    },
    methods: {
        /**
         * 渲染某一个单独的Text标签成Span或链接
         * @param {*} school_id
         * @returns
         */
        renderItemHtml: function (item) {
            let content = item.text;
            let style = ``;
            let link = null;
            content = content.replace(/\\n/g, "<br />").replace(/\\/g, "");
            if ([item.r, item.g, item.b].every(v => v != undefined && v > 0)) {
                style = `color: rgb(${item.r}, ${item.g}, ${item.b});`;
            } else if (item.font != undefined && item.font != 100) {
                const fonts = require("../assets/data/game_font.json");
                for (let color in fonts) {
                    if (fonts[color].includes(item.font)) {
                        style = `color: ${color};`;
                        break;
                    }
                }
            }
            if (item.name == "iteminfolink" && item.script) {
                let item_type = item.script?.match(
                    /this\.dwTabType=(\d+)/i
                )?.[1];
                let item_index =
                    item.script?.match(/this\.dwIndex=(\d+)/i)?.[1];
                if (item_type && item_index) {
                    let item_id = `${item_type}_${item_index}`;
                    link = getLink("item", item_id);
                }
            }
            if (link) {
                return `<a style="${style} text-decoration: none;" target="_blank" href="${link}">${content}</a>`;
            } else {
                return `<span style="${style}">${content}</span>`;
            }
        },
        /**
         * 将image标签转换为HTML标签
         */
        renderImageHtml: function (Text) {
            // <image>path="fromiconid" frame=1241 w=29 h=29 </image>
            let matches = Text.match(/<image>(.*?)<\/image>/gims);
            if (!matches) return Text;
            for (let match of matches) {
                let icon_id = match.match(/frame=(\d+)/i)?.[1];
                let w = parseInt(match.match(/w=(\d+)/i)?.[1]) / 1.12;
                let h = parseInt(match.match(/h=(\d+)/i)?.[1]) / 1.12;
                let src = `https://icon.jx3box.com/icon/${icon_id}.png`;
                let html = `<img src="${src}" style="width: ${w}px; height: ${h}px; margin-bottom: -5px" />`;
                Text = Text.replace(match, html);
            }
            return Text;
        },
        /**
         * 将一段游戏内文本转换为Html
         * @param {Object[]} texts 标签对象
         */
        renderTextHtml: function (Text) {
            let result = Text;
            result = this.renderImageHtml(result);
            const matches = Text.match(/<Text>(.*?)<\/text>/gims);
            if (!matches) return Text;
            for (let match of matches) {
                let text = extractTextContent(match);
                let html = this.renderItemHtml(text[0]);
                result = result.replace(match, html);
            }
            return result;
        },
        /**
         * 获取形如<BUFF 110 1 desc>, <ENCHANT 100>的资源字段并转换
         */
        renderBuffResource: function () {
            const matches = this.html.match(/<BUFF (\d+) (\d+) (.*?)>/gim);
            if (!matches) return;
            let need_replaces = {};
            //先统计需要的资源，减少请求数量
            for (let match of matches) {
                let [token, id, level, type] = match.match(
                    /<BUFF (\d+) (\d+) (.*?)>/i
                );
                let buff_token = `${id}_${level}`;
                if (!need_replaces[buff_token]) {
                    need_replaces[buff_token] = [];
                }
                need_replaces[buff_token].push({
                    token,
                    type,
                });
            }
            //对每一个需要的资源发起请求
            for (let buff_token in need_replaces) {
                let token_item = need_replaces[buff_token];
                getResource(`buff.${buff_token}`, this.client)
                    .then(res => {
                        let data = res.data;
                        for (let item of token_item) {
                            item.type = item.type.toLowerCase();
                            let type_map = {
                                desc: "Desc",
                                time: "Interval",
                            };
                            let attr = type_map[item.type] || item.type;
                            let value = data[attr];
                            if (
                                typeof value == "number" &&
                                item.type == "time"
                            ) {
                                let time = value / 16;
                                if (time > 60) {
                                    time = `${Math.floor(time / 60)}分钟`;
                                } else {
                                    time = `${time}秒`;
                                }
                                this.html = this.html.replace(item.token, time);
                                return;
                            }
                            if (!value) return;
                            let _matches = value.match(
                                /<BUFF ([0-9a-zA-Z]+)>/gi
                            );
                            if (!_matches)
                                this.html = this.html.replace(match, value);
                            for (let _match of _matches) {
                                let [, _attr] = _match.match(
                                    /<BUFF ([0-9a-zA-Z]+)>/i
                                );
                                for (let i = 1; i < 15; i++) {
                                    if (data[`BeginAttrib${i}`] == _attr) {
                                        value = value.replace(
                                            _match,
                                            data[`BeginValue${i}A`]
                                        );
                                    }
                                }
                            }
                            this.html = this.html.replace(item.token, value);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        renderEnchantResource: function () {
            const matches = this.html.match(/<ENCHANT (\d+)>/gim);
            if (!matches) return;
            for (let match of matches) {
                let enchant_id = match.match(/<ENCHANT (\d+)>/i)[1];
                getResource(`enchant.${enchant_id}`, this.client)
                    .then(res => {
                        let data = res.data;
                        let time = data.Time;
                        if (time) time = `，持续${parseInt(time) / 60}分钟。`;
                        let result = `${data.AttriName}${time ? time : ""}`;
                        this.html = this.html.replace(match, result);
                    })
                    .catch(err => {
                        this.html = this.html.replace(match, escape(match));
                        console.log(err);
                    });
            }
        },
        renderResource: function () {
            this.renderBuffResource();
            this.renderEnchantResource();
        },
    },
    watch: {
        text: {
            immediate: true,
            handler: function (val) {
                if (!val) return;
                this.html = this.renderTextHtml(val);
                this.renderResource();
            },
        },
    },
};
</script>

<style></style>
