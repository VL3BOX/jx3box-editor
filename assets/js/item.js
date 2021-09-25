import $ from "jquery";

function renderItem(vm, selector = ".e-jx3-item") {
    let outer, inner;
    $(selector).on("mouseenter", function(e) {
        clearTimeout(outer);

        vm.item_id = $(e.target).attr("data-id");
        vm.item_client = $(e.target).attr("data-client") == 'origin' ? 2 : 1;
        $(".c-item-pop").fadeIn();

        let self_height = $(".c-item-pop").height();
        let win_height = window.innerHeight;
        let current_y = e.clientY;
        let will_stay_y = e.clientY + 10;

        if (self_height && win_height - current_y < self_height) {
            will_stay_y =
                current_y - (self_height - (win_height - current_y)) - 100;
        }
        vm.item_popover_style.left = e.clientX + 10 + "px";
        vm.item_popover_style.top = will_stay_y + "px";
    });
    $(selector).on("mouseleave", function(e) {
        outer = setTimeout(() => {
            $(".c-item-pop").fadeOut();
        }, 380);
    });
    $(".c-item-pop").on("mouseenter", function(e) {
        clearTimeout(outer);
        $(".c-item-pop").fadeIn();
    });
    $(".c-item-pop").on("mouseleave", function(e) {
        clearTimeout(inner);
        inner = setTimeout(() => {
            $(".c-item-pop").fadeOut();
        }, 280);
    });
}

export default renderItem;
