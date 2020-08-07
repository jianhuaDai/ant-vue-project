import { axios } from '@/utils/request'

const api = {
    getpumpList: '/pump_station/page_query',
    addpump: '/pump_station',
    delpump: '/pump_station/delete/',
    updatepump: '/pump_station/'
}

// 查询泵站列表数据
export function getPumpList (parameter) {
    return axios({
      url: api.getpumpList,
      method: 'post',
      data: parameter
    })
  }
// 新增泵站
export function addPumpList (parameter) {
    return axios({
      url: api.addpump,
      method: 'post',
      data: parameter
    })
  }
  // 更新泵站
export function updatePump (id, parameter) {
  return axios({
    url: api.updatepump + id,
    method: 'put',
    data: parameter
  })
}
  // 删除泵站
  export function delPumpList (id) {
    return axios({
      url: api.delpump + id,
      method: 'post'
    })
  }
