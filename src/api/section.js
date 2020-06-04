import { axios } from '@/utils/request'

// 获取断面列表
export function getSectionList (params) {
  return axios({
    url: '/fracture/page_query',
    method: 'post',
    data: params
  })
}

// 新增断面
export function addSection (params) {
  return axios({
    url: '/fracture/add_save',
    method: 'post',
    data: params
  })
}

// 修改断面
export function editSection (params) {
  return axios({
    url: '/fracture/edit_save',
    method: 'post',
    data: params
  })
}

// 删除断面
export function deleteSection (id) {
  return axios({
    url: `/fracture/${id}`,
    method: 'delete'
  })
}

// 批量删除
export function deleteSections (ids) {
  return axios({
    url: `/fracture/delete/${ids}`,
    method: 'post',
    data: {
      ids
    }
  })
}
