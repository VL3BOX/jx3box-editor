<template>
	<div class="c-resource c-resource__jx3box">
		<!-- 上传触发按钮 -->
		<el-button class="u-switch" type="primary" @click="openDialog" :disabled="!enable"> <img class="u-icon" svg-inline :src="boxIcon" />{{ $t('魔盒资源') }} </el-button>

		<!-- 弹出界面 -->
		<el-dialog v-draggable class="c-large-dialog" :title="$t('魔盒资源库')" :visible.sync="dialogVisible">
			<div class="c-resource-content" v-loading="loading">
				<div class="m-database-search">
					<el-radio-group class="u-client" v-model="comboClient" @change="search" v-if="type === 'combo'">
						<el-radio-button label="std">{{ $t('重制') }}</el-radio-button>
						<el-radio-button label="origin">{{ $t('缘起') }}</el-radio-button>
					</el-radio-group>
					<el-input class="u-input" :placeholder="placeholderText" v-model="query" @change="search" @keyup.enter.native="search">
						<template slot="prepend">{{ $t('关键词') }}</template>
						<template slot="append">
							<el-switch v-model="strict" :active-text="$t('精确匹配')"></el-switch>
						</template>
					</el-input>
				</div>

				<el-tabs class="m-database-tabs" v-model="type" type="card" @tab-click="changeType">
					<el-tab-pane :label="$t('魔盒用户')" name="authors">
						<span slot="label" class="u-tab-label">
							<i class="el-icon-s-custom" style="margin-right: 5px"></i>
							<b>{{ $t('用户') }}</b>
							<i class="u-lv-box">Lv2+</i>
						</span>
						<p v-if="total && done" class="m-resource-count">
							<i class="el-icon-s-data"></i> {{ $t('共找到') }} <b>{{ total }}</b> {{ $t('条记录') }}
						</p>
						<ul class="m-resource-list">
							<li v-for="(o, i) in authors" class="u-item" :key="i" :class="{ on: !!o.isSelected }" @click="selectAuthor(o, i)" ref="author">
								<span class="u-id">ID:{{ o.ID }}</span>
								<img class="u-pic" :title="'AuthorID:' + o.display_name" :src="userAvatar(o.user_avatar)" />
								<span class="u-primary">
									<span class="u-name">
										{{ o.display_name }}
									</span>
									<div class="u-remark">
										{{ o.user_bio }}
									</div>
								</span>
							</li>
						</ul>
						<el-alert v-if="!authors.length && done" :title="$t('没有找到相关条目')" type="info" show-icon></el-alert>
					</el-tab-pane>
					<el-tab-pane :label="$t('剑三趣图')" name="emotions">
						<span slot="label" class="u-tab-label">
							<i class="el-icon-sugar" style="margin-right: 5px"></i>
							<b>{{ $t('趣图') }}</b>
						</span>
						<p v-if="total && done" class="m-resource-count">
							<i class="el-icon-s-data"></i> 共找到 <b>{{ total }}</b> 条记录
						</p>
						<ul class="m-resource-emotion">
							<li v-for="o in emotions" class="u-item" :key="o.id" :class="{ on: !!o.isSelected }" @click="selectEmotion(o)" ref="emotion">
								<img class="e-jx3-emotion" :src="resolveImagePath(o.url)" :alt="query" />
							</li>
						</ul>
						<el-alert v-if="!emotions.length && done" :title="$t('没有找到相关条目')" type="info" show-icon></el-alert>
					</el-tab-pane>
					<el-tab-pane :label="$t('连招')" name="combo">
						<span slot="label" class="u-tab-label">
							<i class="el-icon-lollipop" style="margin-right: 5px"></i>
							<b>{{ $t('连招') }}</b>
						</span>
						<ComboVue :query="query" ref="combo" :client="comboClient" :strict="strict"></ComboVue>
					</el-tab-pane>
					<el-tab-pane :label="$t('信纸')" name="letter">
						<span slot="label" class="u-tab-label">
							<i class="el-icon-coffee-cup" style="margin-right: 5px"></i>
							<b>{{ $t('信纸') }}</b>
						</span>
						<div class="m-letter-list">
							<div class="m-letter" :class="{ active: !!o.isSelected }" v-for="o in filterLetter" :key="o.id" @click="selectLetter(o)">
								<LetterPaper :data="o" />
							</div>
						</div>
						<el-alert v-if="!letter.length && done" & type="info" show-icon></el-alert>
					</el-tab-pane>
				</el-tabs>

				<template v-if="multipage && type !== 'combo'">
				<!-- 下一页 -->
				<el-button class="m-archive-more" :class="{ show: hasNextPage }" type="primary" icon="el-icon-arrow-down" @click="appendPage">{{ $t('加载更多') }}</el-button>
					<!-- 分页 -->
					<el-pagination class="m-archive-pages" background layout="total, prev, pager, next,jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page" @current-change="changePage"></el-pagination>
				</template>

				<div class="m-database-tip" v-show="isBlank && type !== 'combo'">❤ {{ $t('请输入搜索条件查询') }}</div>
			</div>

			<!-- 插入按钮 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">{{ $t('取 消') }}</el-button>
				<el-button type="primary" @click="insert">
					{{ buttonTXT }}
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { loadStat } from "../service/database";
import { loadAuthors, loadEmotions, getLetterPaper } from "../service/cms";
import { getUserInfo } from "../service/author";
import { __iconPath, __Root, __OriginRoot, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getLink, showAvatar, resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";

import ComboVue from "./components/Combo.vue";
import LetterPaper from "./components/Letter.vue";
export default {
	name: "BoxResource",
	components: {
		ComboVue,
		LetterPaper,
	},
	props: {
		enable: {
			type: Boolean,
			default: true,
		},
	},
	data: function () {
		return {
			dialogVisible: false,
			actived: false,
			userInfo: {},

			type: "authors",
			query: "",
			strict: false,
			client: location.hostname.includes("origin") ? "origin" : "std",
			comboClient: "std",

			skill: [],
			buff: [],
			item: [],
			icon: [],
			npc: [],
			authors: [],
			selectedAuthor: {},
			emotions: [],
			letter: [],

			done: false,
			loading: false,

			isSuper: false,

			html: "",

			per: 10,
			page: 1,
			total: 1,
			pages: 1,

			placeholderTexts: {
				authors: "请输入 ID 或 名称",
			},
		};
	},
	computed: {
		placeholderText: function () {
			return this.placeholderTexts[this.type];
		},
		buttonTXT: function () {
			return this.selectedCount ? "插 入" : "确 定";
		},
		isBlank: function () {
			return !this.query && !this[this.type]?.["length"];
		},
		selectedCount: function () {
			return !!this.html;
		},
		isNumber: function () {
			return !isNaN(this.query);
		},
		hasNextPage: function () {
			return this.total > 1 && this.page < this.pages;
		},
		multipage: function () {
			return this.type !== "icon" && this.done && this.pages > 1;
		},
		iconDir: function () {
			return this.client === "origin" ? "origin_icon" : "icon";
		},
		userStatus: function () {
			return User.getInfo().status;
		},
		uid: function () {
			return User.getInfo().uid;
		},
		canInsertAuthor: function () {
			return User.getLevel(this.userInfo && this.userInfo.experience) >= 2;
		},
		boxIcon: function () {
			return __imgPath + "image/common/jx3box_white.svg";
		},
		filterLetter() {
			return this.letter;
		},
	},
	watch: {
		html: function (newval) {
			this.$emit("update", newval);
		},
	},
	methods: {
		getData: function (page = 1, append = false) {
			this.loading = true;
			this.per = 10;
			this.done = false;
			let query = this.query;
			let params = {
				strict: ~~this.strict,
				per: this.per,
				page: page,
				client: this.client,
			};

			// 图标
			if (this.type === "authors") {
				if (!this.query) {
					this.loading = false;
					return;
				}

				params = {
					...params,
					name: query,
				};
				loadAuthors(params)
					.then((res) => {
						if (!append) this.authors = [];
						let list = this.transformData(res.data.data.list);
						this.authors = this.authors.concat(list);
						this.pages = res.data.data.pages;
						this.total = res.data.data.total;
					})
					.finally(() => {
						this.done = true;
						this.loading = false;
					});
			} else if (this.type === "emotions") {
				this.per = 24;
				params = {
					per: this.per,
					page: page,
					search: query,
				};
				loadEmotions(params)
					.then((res) => {
						if (!append) this.emotions = [];
						let list = this.transformData(res.data.data.list);
						this.emotions = this.emotions.concat(list);
						this.pages = res.data.data.pages;
						this.total = res.data.data.total;
					})
					.finally(() => {
						this.done = true;
						this.loading = false;
					});
			} else if (this.type === "letter") {
				const { per, page } = params;
				const _params = { per, page };
				if (this.query) _params._search = this.query;
				getLetterPaper(_params)
					.then((res) => {
						if (!append) this.letter = [];
						let list = this.transformData(res.data.data.list);
						this.letter = this.letter.concat(list);
						this.pages = res.data.data.pages;
						this.total = res.data.data.total;
					})
					.finally(() => {
						this.done = true;
						this.loading = false;
					});
			}
		},
		search: function () {
			if (this.type === "combo") {
				this.$refs.combo?.search();
			} else {
				this.page = 1;
				this.getData();
			}
		},
		appendPage: function () {
			this.getData(++this.page, true);
		},
		changePage: function (i) {
			this.getData(i);
		},
		changeType: function () {
			this.page = 1;
			if (this.type === "combo") {
				this.done = false;
				return;
			}
			this.getData();
		},
		setAuthors: function () {
			try {
				let author = sessionStorage.getItem("atAuthor");
				if (author) {
					author = JSON.parse(author);
					author = author.split(",") || [];
					if (this.selectedAuthor.ID && !author.includes(String(this.selectedAuthor.ID))) {
						author.push(this.selectedAuthor.ID);
					}
					sessionStorage.setItem("atAuthor", JSON.stringify(author.join(",")));
				} else {
					sessionStorage.setItem("atAuthor", JSON.stringify(String(this.selectedAuthor.ID)));
				}
			} catch (error) {
				console.log(error);
			}
		},
		insert: function () {
			if (this.type === "authors") {
				if (this.userStatus == 0 && this.canInsertAuthor) {
					if (this.selectedAuthor.ID) {
						this.setAuthors();
						this.$emit("insert", this.html);
						this.dialogVisible = false;
						this.selectedAuthor = {};
					} else {
						this.$message.warning("请选择一个用户");
					}
				} else {
					this.$alert("您的等级不足或无权限（Lv2以上可用）", "消息");
				}
			} else {
				if (this.type === "combo") {
					const html = this.$refs.combo.renderVal();
					this.$emit("insert", html);
				} else {
					this.$emit("insert", this.html);
				}
				this.dialogVisible = false;
			}
		},
		transformData: function (data) {
			data.forEach((item) => {
				item.isSelected = false;
			});
			return data;
		},
		selectAuthor: function (o) {
			this.resetItems();
			this.selectedAuthor = o;
			o.isSelected = true;
			this.html = `<a data-type="author" class="e-jx3-author w-jx3-element" data-mode="" data-id="${o.ID}" target="_blank" href="/author/${o.ID}">@${o.display_name}</a>`;
		},
		selectEmotion: function (o) {
			this.resetItems();
			o.isSelected = true;
			this.html = `<a data-type="emotion" class="e-jx3-emotion w-jx3-element" data-id="${o.id}" target="_blank" href="/emotion/${o.id}"><img class="e-jx3-emotion-img" data-type="emotion" data-id="${o.id}" style="width:180px;" src="${o.url}" alt="${o.id}"/></a>`;
		},
		// 信纸
		selectLetter(o) {
			this.resetItems();
			o.isSelected = true;
			const { slug, style, remark } = o;
			const titleHtml = `<div class="e-letter-title letter-title--${slug}">${remark}</div>`;
			const contentHtml = `<div class="e-letter-content letter-body--${slug}"><div class="u-letter-content--header letter-header--${slug}"><div class="u-letter-content--footer letter-footer--${slug}"><p>~ 魔盒真好玩，魔盒真好用 ~</p></div></div></div>`;
			this.html = `<div class="e-letter letter--${slug}">${titleHtml}<br/> ${contentHtml}</div></div><style>${style}</style>`;
		},
		resetItems: function () {
			let data = this[this.type];
			data.forEach((item) => {
				item.isSelected = false;
			});
			this.html = "";
		},
		getLink: function (type, id) {
			let domain = this.client == "origin" ? __OriginRoot : __Root;
			return domain + getLink(type, id).slice(1);
		},
		userAvatar: function (url) {
			return showAvatar(url, "m");
		},
		loadUserInfo: function () {
			if (!this.uid) return;
			getUserInfo(this.uid).then((res) => {
				this.userInfo = res;
			});
		},

		// 杂项
		// ==============================
		openDialog: function () {
			this.dialogVisible = true;
			if (!this.actived) {
				loadStat().then((data) => {
					this.stat = data;
					this.actived = true;
				});
			}
		},
		resolveImagePath,
	},
	created: function () {
		this.loadUserInfo();
	},
};
</script>

<style lang="less">
@import "../assets/css/resource.less";

.m-item-pop {
	padding: 0 !important;
	background: none !important;
	border: none;
}
.m-database-tabs .m-letter-list {
	.flex;
	flex-wrap: wrap;
	gap: 20px;
	.m-letter {
		.pointer;
		.pr;
		.size(20%,80px);
		box-sizing: border-box;
		border: 3px solid transparent;
		&.active {
			.r(5px);
			border: 3px solid #409eff;
			&::after {
				.none;
			}
		}
		.e-letter {
			.w(100%);
			.e-letter-title {
				.w(100%);
			}
			.e-letter-content {
				.none;
			}
		}
	}
}
</style>
