import {$helper} from "@jx3box/jx3box-common/js/https";

// 获取物品
function get_item(item_id, jx3_client_type = null) {
    if (!item_id) return;

    let options = {
        url: `api/item/${item_id}`,
    };

    if (jx3_client_type !== null) {
        _.set(options, 'headers.JX3-Client-Type', jx3_client_type);
    }

    return $helper()(options);
}

// 获取清单
function get_plan(plan_id) {
    return $helper()({
        url: `api/item_plan/${plan_id}`,
    });
}

export {get_item, get_plan};
