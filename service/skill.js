import $http from 'axios'
import {__node} from "@jx3box/jx3box-common/data/jx3box.json"

// 获取 skill 信息
const get_skill = (skill_id) => {
  if (!skill_id) return
  return $http({
    method: 'GET',
    url: `${__node}api/skill/${skill_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
    withCredentials: true,
  })
}

export {
  get_skill
}
