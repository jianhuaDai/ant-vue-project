import { axios } from '@/utils/request'

// 获取断面列表
export function getOutfallList (params) {
  return axios({
    url: '/sewage/page_query',
    method: 'post',
    data: params
  })
}

// 新增断面
export function addOutfall (params) {
  return axios({
    url: '/sewage',
    method: 'post',
    data: params
  })
}

// 修改断面
export function editOutfall (id, params) {
  return axios({
    url: `/sewage/${id}`,
    method: 'post',
    data: params
  })
}

// 删除断面
export function deleteOutfall (id) {
  return axios({
    url: `/sewage/${id}`,
    method: 'delete'
  })
}
