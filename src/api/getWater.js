import { axios } from '@/utils/request'

// 获取取水口列表
export function getWaterList (parameter) {
  return axios({
    url: '/get_waters/page_query',
    method: 'post',
    data: parameter
  })
}

// 新增取水口
export function addWater (params) {
  return axios({
    url: '/get_waters',
    method: 'post',
    data: params
  })
}

// 编辑取水口
export function editWater (id, params) {
  return axios({
    url: `/get_waters/${id}`,
    method: 'put',
    data: params
  })
}

// 删除取水口
export function deleteWater (id) {
  return axios({
    url: `/get_waters/${id}`,
    method: 'delete'
  })
}

export function getTasks (params) {
  return axios({})
 }
