import $http from "axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

// 获取物品
function get_item(item_id) {
    if (!item_id) return;
    return $http({
        url: `${__helperUrl}api/item/${item_id}`,
        headers: {Accept: "application/prs.helper.v2+json"},
        withCredentials: true,
    })
}

export { get_item };
