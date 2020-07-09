import Article from './src/Article.vue'

const components = {
    Article,
}

const install = function (Vue, Option) {
     Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

export default {
    install
}