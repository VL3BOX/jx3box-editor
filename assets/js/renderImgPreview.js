import $ from 'jquery'

function renderImgPreview(vm, selector='.c-article img'){
    $(selector).each((i, ele) => {
        // 加载全部src（lazyload）
        vm.images.push($(ele).attr('src'))
        // 绑定事件挂钩索引位置
        $(ele).on('click', (e) => {
            if (e.target.classList.contains('e-jx3-emotion-img')) return
            vm.$hevueImgPreview({
                multiple: true,
                nowImgIndex: i,
                imgList: vm.images,
                controlBar: false,
                clickMaskCLose: true
            })
        })
    })
}

export default renderImgPreview