export default `<a class="e-jx3-item e-jx3-item-q4" href="https://www.jx3box.com/item/#/view/10_310" data-id="10_310" data-quality="4" data-mce-href="https://www.jx3box.com/item/#/view/10_310" data-mce-selected="inline-boundary">[我独醒椅]&#65279;</a>  <a class="e-jx3-item e-jx3-item-q5" target="_blank" data-id="6_4396" data-quality="5">[幽月·乱花]</a>

<h1 style="text-align: center;">团队监控数据完全指南</h1>
<h2 style="text-align: center;">（二） 团控数据基本结构</h2>
<h4>空数据</h4>
<p>前一章节中已经了解到团控数据核心内容是一个lua table，故一个空的数据内容则为</p>
<pre class="language-javascript"><code>return {}</code></pre>
<p>&nbsp;</p>
<h4>包含用户信息的空数据</h4>
<p>{} 中格式为 a = b，a为键（key），b为值（value）。其中__meta包含用户的信息，即在导出数据时的角色名亦可在此处修改。</p>
<p>--开头为注释，即用于说明占位。</p>
<pre class="language-javascript"><code>return {
	__meta = {
		szLang = "zhcn",                --语言，默认可不修改
		szAuthor = "角色名",             --导出时的玩家名称
		nTimeStamp = 1589380183,        --时间戳
		szServer = "服务器名",           --导出时的服务器名称
    },
}</code></pre>
<p>&nbsp;</p>
<h4>包含顶层数据分类的空数据</h4>
<p>不同类型的数据在顶层数据里，分别放在指定的分类键下，分别对应插件面板的几个分类。</p>
<p><img src="https://oss.jx3box.com/upload/post/2020/8/24/2165655.png"></p>
<ul>
<li><strong>BUFF</strong> ：<strong>有利气劲</strong>，即增益类型的效果，例如清心静气等</li>
<li><strong>DEBUFF</strong>：<strong>不利气劲</strong>，即减益类型的效果，例如破风等</li>
<li><strong>CASTING</strong>：<strong>武学招式</strong>，即技能，包括玩家或BOSS的技能，同时包括被动技能，奇穴技能等等</li>
<li><strong>NPC</strong>：<strong>系统角色</strong>，包括BOSS、小怪、其它系统角色等</li>
<li><strong>DOODAD</strong>：<strong>交互物件</strong>，包括宝箱、采集物品（铁矿、甘草）、宴席、工作台等</li>
<li><strong>TALK</strong>：<strong>角色喊话</strong>，即包括BOSS的喊话，用以记录某些技能触发时间点或用于制作时间轴</li>
<li><strong>CHAT</strong>：<strong>系统频道</strong>，即系统频道黄字消息</li>
</ul>
<pre class="language-javascript"><code>return {
    BUFF = {},                  --有利气劲
    DEBUFF = {},                --不利气劲
    CASTING = {},				--武学招式
    NPC = {},                   --系统角色
    DOODAD = {},				--交互物件
	TALK = {},					--角色喊话
	CHAT = {},					--系统频道
	__meta = {
		szLang = "zhcn",
		szAuthor = "浮烟@长安城",
		nTimeStamp = 1589380183,
        szServer = "蝶恋花",
    },
}</code></pre>
<p>&nbsp;</p>
<h4>分类数据下的地图分组</h4>
<p>每个分类下的数据，通过地图ID进行分组。</p>
<pre class="language-javascript"><code>return {
    BUFF = {
        [-1] = {},          --通用的条目
        [1] = {},           --地图ID为1的全部条目
        [2] = {}            --地图ID为2的全部条目
    },
}</code></pre>
<p><strong>-1为通用</strong>（即不管在哪个地图，都会被监控），其它对应地图ID，例如1为稻香村。</p>
<p>完整的地图ID映射表请参阅 <a href="https://github.com/JX3BOX/jx3box-data/blob/master/raw/common/MapList.tab">https://github.com/JX3BOX/jx3box-data/blob/master/raw/common/MapList.tab</a></p>
<p><img src="https://oss.jx3box.com/upload/post/2020/8/24/4443437.png"></p>
<h5>相似数据在不同地图中的拷贝</h5>
<p><span style="color: #ff0000;"><strong>例如当在25人普通副本中采集了相应的数据，需要应用在25人英雄副本时，可直接修改地图ID为英雄副本地图ID。</strong></span></p>
<p><span style="color: #ff0000;"><strong>即可快速批量应用于英雄副本，而无需重新一个个采集。</strong></span></p>
<p>在地图{}中为一条条的独立数据。下一节将具体说明。</p>
<p>&nbsp;</p>
<h6>table数据结构的释义</h6>
<p>以下给普通不懂编程的人更容易的方式来解释table这种数据结构：</p>
<p>撇开前面的return，后面为一对花括号{}，里面通过a=b的形式来表示数据，并用半角逗号,隔开。</p>
<pre class="language-javascript"><code>{
    name = "jx3",       -- 名字叫jx3
    age = 11,           -- 年龄为11岁
    color = "red"       -- 颜色为红色
}</code></pre>
<p>当某个属性存在一些子属性时，又可以继续通过{}来扩展包裹，比如扩展上面的例子：</p>
<pre class="language-javascript"><code>{
    name = "jx3",       -- 名字叫jx3
    age = 11,           -- 年龄为11岁
    color = "red",      -- 颜色为红色
    plugins = {         -- 插件有很多
        [1] = "茗伊插件集", -- 第一个叫茗伊插件集
        [2] = "枫影插件集", -- 第二个叫枫影插件集
    }
}</code></pre>
<p>当然也有可能，某个子属性，还包含更多子子属性，则只要继续向下用花括号包裹即可，例如继续扩展上面的例子：</p>
<pre class="language-javascript"><code>{
    name = "jx3",       -- 名字叫jx3
    age = 11,           -- 年龄为11岁
    color = "red",      -- 颜色为红色
    plugins = {         -- 插件有很多
        [1] = {         -- 第一个插件
            name = "茗伊插件集",    --插件名字
            author = "茗伊",        --插件作者
        },
        [2] = {         -- 第二个插件
            name = "枫影插件集",    --插件名字
            author = "枫影",        --插件作者
        },
    }
}</code></pre>
<p>&nbsp;</p>
<h4>全部章节</h4>
<p>《团队监控数据完全指南》 <a href="../../tool/?pid=17340#/">https://www.jx3box.com/tool/?pid=17340#/</a></p>`