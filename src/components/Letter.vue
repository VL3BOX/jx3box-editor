<template>
	<div class="e-letter" v-html="html"></div>
</template>

<script>
export default {
	name: "Letter", 
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			html: "",
		};
	},
	watch: {
		data: {
			immediate: true,
			deep: true,
			handler(obj) {
				this.html = this.htmlDemo(obj);
			},
		},
	},
	methods: {
		// 默认html
		htmlDemo({ slug, style }) {
			const titleHtml = `<div class="e-letter-title letter-title--${slug}">我是标题</div>`;
            const contentHtml = `<div class="e-letter-content letter-body--${slug}"><div class="u-letter-content--header letter-header--${slug}"><div class="u-letter-content--footer letter-footer--${slug}"><p contenteditable="true">明月几时有，把酒问青天。</p></div></div></div>`;
			return `<div class="e-letter letter--${slug}">${titleHtml}<br/> ${contentHtml}</div></div><style>${style}</style>`;
		},
	},
};
</script>
