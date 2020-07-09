# Article & Editor

## Step.1 Install
```
npm install @jx3box/jx3box-editor
```  

## Step.2 Import
+ 指定模块
```javascript
import Article from "@jx3box/jx3box-editor/src/Article.vue"
import Tinymce from "@jx3box/jx3box-editor/src/Tinymce.vue"
//import Markdown from "@jx3box/jx3box-article/src/Markdown.vue"
```
## Step.3 Usage
文章
```html
<Article :content="content" directorybox="#directory"/>
```

编辑器
```html
<script src="https://console.cnyixun.com/static/tinymce/tinymce.min.js?v=$version"></script>
<Tinymce v-model="content" :attachmentEnable="true" :resourceEnable="true" :height="300"/>
```

批量附件上传插入/资源快捷查询插入
```html
<Upload @insert="insertWhere" @update="getList" @htmlUpdate="getHTML"/>
<Resource @insert="insertWhere" @update="getHTML"/>
```

<!-- 手动更新cdn `https://oss.jx3box.com/static/jx3box-editor/tinymce.css` -->