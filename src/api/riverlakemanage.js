import { axios } from '@/utils/request'

const api = {
    getriverlakeList: '/water_infos/page_query',
    delriverlake: '/water_infos/delete/',
    addriverlake: '/water_infos',
    updateriverlake: '/water_infos/',
    getgldwdata: '/enterprise_book/'
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
// 查询管理单位下拉数据
export function getGldwdata (parameter) {
  return axios({
      url: api.getgldwdata + parameter,
      method: 'get'
      // params: parameter
  })
}
// 状态切换
export function statusChange (params) {
  return axios({
    url: '/water_infos/status',
    method: 'post',
    data: params
  })
}
