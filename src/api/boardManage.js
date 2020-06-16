import { axios } from '@/utils/request'

// 获取公示牌列表
export function boardManageList (parameter) {
  return axios({
    url: '/billboard/page_billboard',
    method: 'post',
    data: parameter
  })
}

// 删除公示牌
export function deleteBoard (id) {
  return axios({
    url: `/billboard/bill/${id}`,
    method: 'delete'
  })
}

// 修改公示牌
export function editBoard (id, params) {
  return axios({
    url: `/billboard/bill/${id}`,
    method: 'put',
    data: params
  })
}

// 新增公示牌
export function addBoard (params) {
  return axios({
    url: '/billboard/add_billboard',
    method: 'post',
    data: params
  })
}

// 根据id查公示牌
export function getBoardById (id) {
  return axios({
    url: `/billboard/bill/${id}`,
    method: 'get'
  })
}
