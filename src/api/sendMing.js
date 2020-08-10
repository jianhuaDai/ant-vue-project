import { axios } from '@/utils/request'

// 获取采砂列表
export function getSendMingList (params) {
  return axios({
    url: '/sand_mining/page_query',
    method: 'post',
    data: params
  })
}

// 新增采砂
export function addSendMing (params) {
  return axios({
    url: '/sand_mining',
    method: 'post',
    data: params
  })
}

// 修改采砂
export function editSendMing (id, params) {
  return axios({
    url: `/sand_mining/${id}`,
    method: 'put',
    data: params
  })
}

// 删除采砂
export function deleteSendMing (id) {
  return axios({
    url: `/sand_mining/delete/${id}`,
    method: 'post'
  })
}
