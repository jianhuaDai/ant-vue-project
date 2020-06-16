import { axios } from '@/utils/request'

// 获取排污口列表
export function getOutfallList (params) {
  return axios({
    url: '/sewage/page_query',
    method: 'post',
    data: params
  })
}

// 新增排污口
export function addOutfall (params) {
  return axios({
    url: '/sewage',
    method: 'post',
    data: params
  })
}

// 修改排污口
export function editOutfall (id, params) {
  return axios({
    url: `/sewage/${id}`,
    method: 'put',
    data: params
  })
}

// 删除排污口物理删除
export function deleteOutfall (id) {
  return axios({
    url: `/sewage/${id}`,
    method: 'delete'
  })
}
