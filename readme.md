# Article & Editor

手动更新 cdn `https://oss.jx3box.com/static/`

## Step.1 Install

```
npm install @jx3box/jx3box-editor
```

## Step.2 Import

-   指定模块

```javascript
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Tinymce from "@jx3box/jx3box-editor/src/Tinymce.vue";
//import Markdown from "@jx3box/jx3box-article/src/Markdown.vue"
```

## Step.3 Usage

文章

```html
<article :content="content" directorybox="#directory" />
```

编辑器

```html
<script src="https://oss.jx3box.com/static/tinymce/tinymce.min.js?v=$version"></script>
<Tinymce
    v-model="content"
    :attachmentEnable="true"
    :resourceEnable="true"
    :height="300"
/>
```

批量附件上传插入/资源快捷查询插入

```html
<Upload @insert="insertWhere" @update="getList" @htmlUpdate="getHTML" />
<Resource @insert="insertWhere" @update="getHTML" />
```

---

# 页面远程引入文章渲染模块

1. 头部引入文件

```html
<script src="https://oss.jx3box.com/static/jx3box-lib/vue.js"></script>
<script src="https://oss.jx3box.com/static/jx3box-common-ui/jx3box_article.umd.min.js"></script>
<link
    rel="stylesheet"
    href="https://oss.jx3box.com/static/jx3box-common-ui/jx3box_article.css"
/>
```

2. 需要插入的位置

```html
<div id="app">
    <jx3box_article id="article" content="loading.."></jx3box_article>
</div>
```

3. 初始化脚本

```html
<script>
    // 1.异步加载设置数据
    fetch("https://server.jx3box.com/post/find?id=420").then((res) => {
        res.json().then((data) => {
            let content = data && data.data && data.data.post.post_content;
            document.getElementById("article").setAttribute("content", content);
            // 2.实例化
            new Vue({
                components: {
                    jx3box_article,
                },
            }).$mount("#app");
        });
    });
</script>
```
