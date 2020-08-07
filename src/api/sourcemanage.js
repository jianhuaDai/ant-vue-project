import { axios } from '@/utils/request'

const api = {
    getsourceList: '/pollutions/page_query',
    addsource: '/pollutions',
    delsource: '/pollutions/delete/',
    updatesource: '/pollutions/',
    getriverlakeList: '/water_infos/page_query'
}

// 查询河湖列表--为获取所属河道信息
export function getRiverlakeList (parameter) {
  return axios({
    url: api.getriverlakeList,
    method: 'post',
    data: parameter
  })
}
// 查询污染源列表
export function getSourceList (parameter) {
  return axios({
    url: api.getsourceList,
    method: 'post',
    data: parameter
  })
}
// 添加污染源
export function addSource (parameter) {
  return axios({
    url: api.addsource,
    method: 'post',
    data: parameter
  })
}

// 更新污染源
export function updateSource (id, parameter) {
  return axios({
    url: api.updatesource + id,
    method: 'put',
    data: parameter
  })
}

// 删除污染源
export function delSource (id) {
  return axios({
    url: api.delsource + id,
    method: 'post'
  })
}
