import $ from "jquery";
function directory(from, to) {
    // 装载容器设置
    const $box = $(to);
    if (!to && $box.length) return;

    // 遍历节点
    let directories = $(from).find("h1,h2,h3,h4,h5,h6");

    // 存在目录
    if (directories.length > 1) {

        $box.html(
            `<div class="c-article-directory" id="c-article-directory">
                <div class="c-article-directory-title" id="c-article-directory-title">
                    <span class="c-article-directory-title-label" class="c-go-top"><i class="el-icon-s-promotion"></i> 导读</span>
                    <span class="c-article-directory-title-skip" class="c-go-top">↑ 顶部</span>
                    <span class="c-article-directory-title-folder" class="c-go-top">↕ 折叠</span>
                </div>
                <div class="c-article-directory-content" id="c-article-directory-content"></div>
            </div>`
        );

        const $directory = $('#c-article-directory-content')
        const $skip = $('.c-article-directory-title-skip')
        const $folder = $('.c-article-directory-title-folder')

        // 顶部按钮
        $folder.on('click',function (){
            $('#c-article-directory-content').slideToggle()
        })
        $skip.on('click',function (){
            $(document).scrollTop(0)
        })

        // 遍历捕获的目录项
        directories.each(function(i, item) {
            // 进行克隆
            let _item = $(item).clone();
            // 解决懒加载跳转位置问题
            $(item).append(`<a id="directory-${i}"></a>`)

            // 过滤行内样式
            _item.removeAttr('style');
            _item.removeAttr('align');
            _item.removeAttr('color');
            _item.html($(item).text())

            // 设置原始元素所在的位置
            // _item.attr("data-skip", ~~$(this).offset().top - 112);
            _item.data("raw", $(item));

            // 排除最后一个
            if (i < directories.length - 1) {

                // 判断相邻节点类型
                let current = $(item)[0].tagName;
                let next = directories.eq(i + 1)[0].tagName;

                // 下一个节点与当前节点不同，并且是它的下级时
                const relations = ['H1','H2','H3','H4','H5','H6']
                let current_pos = relations.indexOf(current)
                let next_pos =relations.indexOf(next)
                if(current_pos != next_pos && next_pos > current_pos){
                    _item.addClass("hasChild");
                }

            }

            //追加到目录盒中
            $directory.append(_item);
        });

        // 进行事件委托
        $directory.on('click','h1,h2,h3,h4,h5,h6',function (){
            let target = $(this).data('raw').offset().top
            $(document).scrollTop(target - 112)
            $(this).data('raw').addClass('isScrollFocus')
            setTimeout(()=>{
                $(this).data('raw').removeClass('isScrollFocus')
            },3500)
        })

        return true
    }

    // 不存在目录
    return false;
}
export default directory;
