import { $cms } from "@jx3box/jx3box-common/js/https";

function uploadFile(data) {
    return $cms().post(`/api/cms/upload`, data);
}

export { uploadFile };
