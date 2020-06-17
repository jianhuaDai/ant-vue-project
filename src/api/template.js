import { axios } from '@/utils/request'

// 获取模版列表
export function templateList (parameter) {
  return axios({
    url: '/billboard/page_bill_temp',
    method: 'post',
    data: parameter
  })
}
// 新增模版
export function addTemplate (parameter) {
  return axios({
    url: '/billboard/add_bill_temp',
    method: 'post',
    data: parameter
  })
}
// 修改模版
export function editTemplate (id, parameter) {
  return axios({
    url: `/billboard/temp/${id}`,
    method: 'put',
    data: parameter
  })
}
// 删除模版
export function deleteTemplate (id) {
  return axios({
    url: `/billboard/temp/${id}`,
    method: 'delete'
  })
}
// 根据id查单条模版信息
export function oneTemplate (id) {
  return axios({
    url: `/billboard/temp/${id}`,
    method: 'get'
  })
}
