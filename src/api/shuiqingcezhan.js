import { axios } from '@/utils/request'

const api = {
    getshuiqingcezhanList: '/monitoring_station/page_query',
    addshuiqincezhan: '/monitoring_station',
    updateshuiqincezhan: '/monitoring_station/',
    delshuiqincezhan: '/monitoring_station/delete/',
    getgldwdata: '/enterprise_book/'
}

// 查询水情测站列表
export function getShuiqingcezhanList (parameter) {
  return axios({
    url: api.getshuiqingcezhanList,
    method: 'post',
    data: parameter
  })
}
// 新增水情测站
export function addShuiqincezhan (parameter) {
    return axios({
      url: api.addshuiqincezhan,
      method: 'post',
      data: parameter
    })
  }
  // 更新水情测站
export function updateShuiqincezhan (id, parameter) {
    return axios({
      url: api.updateshuiqincezhan + id,
      method: 'put',
      data: parameter
    })
  }
// 删除水情测站
export function delShuiqincezhan (id, parameter) {
    return axios({
      url: api.delshuiqincezhan + id,
      method: 'post',
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
