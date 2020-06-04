import { axios } from '@/utils/request'
// 水功能列表
export function getWaterFunList (params) {
  return axios({
    url: 'water_functionals/page_query',
    method: 'post',
    data: params
  })
}

// 新增水功能区
export function addWaterFun (params) {
  return axios({
    url: '/water_functionals',
    method: 'post',
    data: params
  })
}

// 修改水功能区
export function editWaterFun (id, params) {
  return axios({
    url: `/water_functionals/${id}`,
    method: 'put',
    data: params
  })
}

// 删除水功能区
export function deleteWaterFun (id) {
  return axios({
    url: `/water_functionals/${id}`,
    method: 'delete'
  })
}
