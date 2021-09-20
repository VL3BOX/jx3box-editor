import $http from "axios";
import {__helperUrl} from "@jx3box/jx3box-common/data/jx3box.json";

// 获取物品
function get_item(item_id, jx3_client_type = 1) {
    if (!item_id) return;
    return $http({
        url: `${__helperUrl}api/item/${item_id}`,
        headers: {
            Accept: "application/prs.helper.v2+json",
            'JX3-Client-Type': jx3_client_type,
        },
        withCredentials: true,
    })
}

// 获取清单
function get_plan(plan_id){
    return $http({
        url: `${__helperUrl}api/item_plan/${plan_id}`,
        headers: {Accept: "application/prs.helper.v2+json"},
        withCredentials: true,
    })
}

export { get_item ,get_plan};
