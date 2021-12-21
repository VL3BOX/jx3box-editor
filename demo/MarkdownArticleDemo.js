// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);
import "@jx3box/jx3box-common/css/element.css";
Vue.config.productionTip = false

import mavonEditor from "@jx3box/markdown";
import "@jx3box/markdown/dist/css/index.css";
Vue.use(mavonEditor)

import M from './MarkdownArticleDemo.vue'
new Vue({
    render: h => h(M),
}).$mount('#app')
