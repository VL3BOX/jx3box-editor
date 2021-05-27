import $http from 'axios'
import {__node} from "@jx3box/jx3box-common/data/jx3box.json"

// 获取 buff 信息
const get_buff = (buff_id) => {
  if (!buff_id) return
  return $http({
    method: 'GET',
    // https://node.jx3box.com/buff/id/103?strict=0&per=10&page=1
    url: `${__node}buff/id/${buff_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
    withCredentials: true,
  })
}

export {
  get_buff
}
