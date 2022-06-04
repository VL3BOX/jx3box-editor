import { $cms } from "@jx3box/jx3box-common/js/https";

function uploadFile(data) {
    return $cms().post(`/api/cms/upload`, data);
}

// 获取用户列表
function loadAuthors(params){
    return $cms().get(`/api/cms/user/list`, {
        params: params
    });
}

// 获取表情列表
function loadEmotions(params){
    return $cms().get(`/api/cms/post/emotions`, {
        params: params
    });
}

export { uploadFile, loadAuthors, loadEmotions };
