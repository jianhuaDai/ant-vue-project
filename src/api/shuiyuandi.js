import { axios } from '@/utils/request'

const api = {
    getshuiyuandiList: '/water_sources/page_query',
    addshuiyuandi: '/water_sources',
    updateshuiyuandi: '/water_sources/',
    delshuiyuandi: '/water_sources/delete/',
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
// 查询水源地列表接口
export function getShuiyuandiList (parameter) {
  return axios({
    url: api.getshuiyuandiList,
    method: 'post',
    data: parameter
  })
}
// 新增水源地接口
export function addShuiyuandi (parameter) {
  return axios({
    url: api.addshuiyuandi,
    method: 'post',
    data: parameter
  })
}
// 更新水源地信息
export function updateShuiyuandi (id, parameter) {
  return axios({
      url: api.updateshuiyuandi + id,
      method: 'put',
      data: parameter
  })
}
// 删除水源地信息
export function delShuiyuandi (id) {
    return axios({
        url: api.delshuiyuandi + id,
        method: 'post'
    })
  }
