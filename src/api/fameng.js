import { axios } from '@/utils/request'

const api = {
    getfamenList: '/water_value/page_query',
    addfamen: '/water_value',
    delfamen: '/water_value/delete/',
    updatefamen: '/water_value/',
    getproject: '/engineering'
}
// 查询工程信息
export function getProjectList (parameter) {
  return axios({
    url: api.getproject,
    method: 'get',
    data: parameter
  })
}
// 查询阀门列表数据
export function getFaMenList (parameter) {
    return axios({
      url: api.getfamenList,
      method: 'post',
      data: parameter
    })
  }
// 新增阀门
export function addFaMenList (parameter) {
    return axios({
      url: api.addfamen,
      method: 'post',
      data: parameter
    })
  }
  // 更新阀门
export function updateFaMen (id, parameter) {
  return axios({
    url: api.updatefamen + id,
    method: 'put',
    data: parameter
  })
}
  // 删除阀门
  export function delFaMenList (id) {
    return axios({
      url: api.delfamen + id,
      method: 'post'
    })
  }
