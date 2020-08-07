import { axios } from '@/utils/request'

const api = {
    getgatestationList: '/sluice_gate_station/page_query',
    addgatestation: '/sluice_gate_station',
    delgatestation: '/sluice_gate_station/delete/',
    updategatestation: '/sluice_gate_station/'
}

// 查询闸站列表数据
export function getGateStationList (parameter) {
    return axios({
      url: api.getgatestationList,
      method: 'post',
      data: parameter
    })
  }
// 新增闸站
export function addGateStationList (parameter) {
    return axios({
      url: api.addgatestation,
      method: 'post',
      data: parameter
    })
  }
  // 更新闸站
export function updateGateStation (id, parameter) {
  return axios({
    url: api.updategatestation + id,
    method: 'put',
    data: parameter
  })
}
  // 删除闸站
  export function delGateStationList (id) {
    return axios({
      url: api.delgatestation + id,
      method: 'post'
    })
  }
