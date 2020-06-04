import { axios } from '@/utils/request'

const api = {
    getriverlakeList: '/water_infos/page_query',
    delriverlake: '/water_infos/delete/',
    addriverlake: '/water_infos',
    updateriverlake: '/water_infos/'
}

// 查询河湖列表接口
export function getRiverlakeList (parameter) {
  return axios({
    url: api.getriverlakeList,
    method: 'post',
    data: parameter
  })
}
// 删除河湖信息
export function delRiverlake (id) {
  return axios({
      url: api.delriverlake + id,
      method: 'post'
  })
}
// 新增河湖信息
export function addRiverlake (parameter) {
  return axios({
      url: api.addriverlake,
      method: 'post',
      data: parameter
  })
}
// 更新河湖信息
export function updateRiverlake (id, parameter) {
  return axios({
      url: api.updateriverlake + id,
      method: 'put',
      data: parameter
  })
}
