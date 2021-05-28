import $http from 'axios'
import {__node} from "@jx3box/jx3box-common/data/jx3box.json"

// 获取 skill 信息
const get_skill = (skill_id) => {
  if (!skill_id) return
  return $http({
    method: 'GET',
    // https://node.jx3box.com/skill/id/103?strict=0&per=10&page=1
    url: `${__node}skill/id/${skill_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
    withCredentials: true,
  })
}

export {
  get_skill
}
