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
			handler({ slug, style, remark }) {
				this.html = `<div class="e-letter letter--${slug}"><div class="e-letter-title letter-title--${slug}">${remark}</div></div><style>${style}</style>`;
			},
		},
	},
};
</script>
