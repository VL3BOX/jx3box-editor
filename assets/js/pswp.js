import $ from "jquery";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import tpl from "./pswp_template.js";
// https://photoswipe.com/documentation/options.html

class Gallery {
    constructor(options) {
        this._picbox = "";
        this.pwsp = "";
        this.options = options || {
            index: 0,
            bgOpacity: 0.8,
            shareEl: false,
            zoomEl: true,
        };
        this.bucket = [];
    }
    init($root, $selector = "img") {
        // 创建容器
        let isExist = document.querySelectorAll(".pswp").length;
        if (!isExist) $("body").append(tpl);
        this._picbox = document.querySelectorAll(".pswp")[0];

        // 获取图片
        let items = [];
        $($root)
            .find("img")
            .each((i, $pic) => {
                this.bucket.push($pic);
                items.push({
                    $el: $pic,
                    src: $pic.src,
                    w: $pic.naturalWidth || $pic.width || 0,
                    h: $pic.naturalHeight || $pic.height || 0,
                });
            });

        // 初始化
        let pwsp = new PhotoSwipe(
            this._picbox,
            PhotoSwipeUI_Default,
            items,
            this.options
        );
        this.pwsp = pwsp
        pwsp.initController();      //需要手动调这个API，否则访问不到items什么鬼，api文档里也没写啊
        pwsp.listen("imageLoadComplete", function(index, item) {
            pwsp.items[index]["w"] = item.$el.naturalWidth || item.$el.width;
            pwsp.items[index]["h"] = item.$el.naturalHeight || item.$el.height;
            pwsp.updateSize(true);
        });

        // 绑定事件
        $($root).on("click", $selector, (e) => {
            this.open(e.target);
        });
    }
    open(target) {
        let pwsp = this.pwsp;
        let i = this.bucket.indexOf(target);
        pwsp.init();    //为什么打开的api不叫open要叫init太歧义了，我脑壳疼，这组件太高端
        pwsp.goTo(i);
        console.log(pwsp);
    }
}

export default new Gallery();
