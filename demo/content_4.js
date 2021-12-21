export default `

## 插入宏
<pre class="e-jx3macro-area w-jx3macro">/cast [nobuff:虫兽] 灵蛇引
/cast 蛊虫献祭
/cast [buff:灵蛇献祭] 蛊虫狂暴
/fcast 幻击
/fcast攻击
/cast 蛇影
/cast 百足
/cast 蝎心
/cast 蟾啸</pre>

## 插入奇穴
<p>旧版奇穴</p>
<p><input class="e-jx3qixue-area" type="text" value="{&quot;version&quot;:&quot;v20200113&quot;,&quot;xf&quot;:&quot;焚影圣诀&quot;,&quot;sq&quot;:&quot;2,2,3,1,1,1,1,1,1,3,4,1&quot;}" /></p>
<p>新版奇穴</p>
<div class="e-jx3qixue-area">{"version":"v20200309","xf":"凌海诀","sq":"1,1,1,1,1,1,1,1,1,1,1,1"}</div>

## 插入镇派
..TODO

## 插入配装
..TODO

## 插入视频
<video controls="controls" width="300" height="150">
<source src="https://static.jx3.xoyo.com/video/20090828/CG1_fengqidaoxiang.mp4" type="video/mp4"></video></p>

## 插入音频
..TODO

## 插入iframe
<p>B站<iframe src="//player.bilibili.com/player.html?aid=6083521&amp;cid=10838288&amp;page=5" frameborder="no" scrolling="no" allowfullscreen="allowfullscreen">哈哈</iframe></p>

## 旧版资源插入
<p><img class="e-jx3-icon" title="IconID:2588" src="https://console.cnyixun.com/icon/2588.png" /></p>
<pre class="e-jx3-resource"><span class="u-id">ID:551</span> <img class="u-pic" title="IconID:898" src="https://console.cnyixun.com/icon/898.png" /> <span class="u-name">心鼓弦</span> <span class="u-desc">救治一个重伤的友方目标，可在战斗中使用。</span></pre>
<pre class="e-jx3-resource"><span class="u-id">ID:2712</span> <img class="u-pic" title="IconID:414" src="https://console.cnyixun.com/icon/414.png" /> <span class="u-name">清心静气</span> <span class="u-desc">气血最大值提高点</span></pre>
<pre class="e-jx3-resource"><span class="u-id">ID:28610</span> <img class="u-pic" title="IconID:3116" src="https://console.cnyixun.com/icon/3116.png" /> <span class="u-name">幽月・乱花</span> <span class="u-desc">长两尺六寸，重五十二两
刃宽两寸，两边锋利，刚硬沉静，挥动起来杀气逼人。
当初唐太宗李世民赠与相知山庄的一双剑。据说出自汉朝工匠张蹇之手，后被太宗所得。据说惟有心意相通的有情人才能互相配合使二剑威力发挥到极致，不过又传说七秀坊的心法同样可以将此双剑的威力发挥出来。  </span></pre>
<pre class="e-jx3-resource"><span class="u-id">ID:131</span> <img class="u-pic" title="IconID:1835" src="https://console.cnyixun.com/icon/1835.png" /> <span class="u-name">《猿公剑法・剑灵寰宇》穴位图残页</span> <span class="u-desc">调息时间减少2秒。</span></pre>

## 新版简版资源插入
..TODO


@[toc](目录)

Markdown 语法简介
=============

## 目录
\`\`\`
@[toc](目录)
\`\`\`

## 粗体
\`\`\`
**粗体**
__粗体__
\`\`\`
## 斜体
\`\`\`
*斜体*
_斜体_
\`\`\`
## 下划线
\`\`\`
++下划线++
\`\`\`
## 删除线
\`\`\`
~~删除线~~
\`\`\`
## 上标下标
\`\`\`
上角标 x^2^
下角标 H~2~0
\`\`\`
x^2^  H~2~0

## 标记
\`\`\`
==标记==
\`\`\`
## 标题
\`\`\`
一级标题
====
## 二级标题 ##
二级标题
----
### 三级标题 ###
#### 四级标题 ####
##### 五级标题 #####
###### 六级标题 ######
\`\`\`
## 分割线
\`\`\`
***
---
\`\`\`
## 引用
\`\`\`
> 一级
>> 二级
>>> 三级
\`\`\`
## 列表
\`\`\`
有序列表
1. 列表项
2. 列表项
3. 列表项
无序列表
+ 列表项
+ 列表项
待办列表
- [x] 已完成任务
- [ ] 未完成任务
\`\`\`
## 链接
\`\`\`
[JX3BOX](https://www.jx3box.com)
\`\`\`
[JX3BOX](https://www.jx3box.com)
## 图片
\`\`\`
![JX3BOX](https://img.jx3box.com/image/common/logo.png)
\`\`\`
![JX3BOX](https://img.jx3box.com/image/common/logo.png)
## 脚注
\`\`\`
见底部脚注[^hello]
[^hello]: 一个注脚
\`\`\`
见底部脚注[^hello]
[^hello]: 一个注脚

## 代码
> 代码块
> \\\`\`\`lang
> code block
> \\\`\`\`
> 代码行
> \\\`code inline\\\`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`
## 表格
\`\`\`
| 标题1 | 标题2 | 标题3 |
| :--  | :--: | ----: |
| 左对齐 | 居中 | 右对齐 |
| ---------------------- | ------------- | ----------------- |
\`\`\`
| 标题1 | 标题2 | 标题3 |
| :--  | :--: | ----: |
| 左对齐 | 居中 | 右对齐 |
| ---------------------- | ------------- | ----------------- |

## 折叠
\`\`\`
<details>
<summary>点击展开折叠</summary>
被折叠的文字
</details>
\`\`\`
<details>
<summary>点击展开折叠</summary>
被折叠的文字
</details>

## 表情(emoji)
\`\`\`
:laughing:
:blush:
:smiley:
:)
...
\`\`\`
:laughing::blush::smiley::) [更多](https://www.webpagefx.com/tools/emoji-cheat-sheet/)

## $\KaTeX$公式
\`\`\`
$x_i + y_i = z_i$ 和 $\sum_{i=1}^n a_i=0$
$$\sum_{i=1}^n a_i=0$$
\`\`\`
我们可以渲染公式例如：$x_i + y_i = z_i$和$\sum_{i=1}^n a_i=0$
我们也可以单行渲染
$$\sum_{i=1}^n a_i=0$$
具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)

## 对齐
::: hljs-left
\`::: hljs-left\`
\`居左\`
\`:::\`
:::

::: hljs-center
\`::: hljs-center\`
\`居中\`
\`:::\`
:::

::: hljs-right
\`::: hljs-right\`
\`居右\`
\`:::\`
:::
`