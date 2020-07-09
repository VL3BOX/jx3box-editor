# Article & Editor

## Step.1 Install
```
npm install @jx3box/jx3box-article
```  

## Step.2 Import
+ 指定模块
```javascript
import Article from "@jx3box/jx3box-article/src/Article.vue"
import Tinymce from "@jx3box/jx3box-article/src/Tinymce.vue"
//import Markdown from "@jx3box/jx3box-article/src/Markdown.vue"
```
## Step.3 Usage
```html
<Article :content="content" directorybox="#directory"/>
<Tinymce v-model="content" :attachmentEnable="true" :resourceEnable="true" :height="300"/>
<Upload @insert="insertWhere" @update="getList" @htmlUpdate="getHTML"/>
<Resource @insert="insertWhere" @update="getHTML"/>
```