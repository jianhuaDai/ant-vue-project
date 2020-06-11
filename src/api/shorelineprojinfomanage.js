import { axios } from '@/utils/request'

const api = {
  getanxianxinxigcList: '/line_projects/page_query',
  getanxianxinxiList: '/rivers_line/page_query',
  addanxiangc: '/line_projects',
  updateanxiangc: '/line_projects/',
  delanxiangc: '/line_projects/delete/',
  getgldwdata: '/enterprise_book/'
}

// 查询岸线工程信息列表
export function getAnxianxinxigcList (parameter) {
  return axios({
    url: api.getanxianxinxigcList,
    method: 'post',
    data: parameter
  })
}
// 查询具体岸线下拉数据
export function getAnxianxinxiList (parameter) {
  return axios({
    url: api.getanxianxinxiList,
    method: 'post',
    data: parameter
  })
}
// 新增岸线工程信息
export function addAnxiangc (parameter) {
  return axios({
    url: api.addanxiangc,
    method: 'post',
    data: parameter
  })
}
// 更新岸线工程信息
export function updateAnxiangc (id, parameter) {
  return axios({
    url: api.updateanxiangc + id,
    method: 'put',
    data: parameter
  })
}
// 查询管理单位下拉数据
export function getGldwdata (parameter) {
  return axios({
    url: api.getgldwdata + parameter,
    method: 'get'
    // params: parameter
  })
}
// 删除岸线工程
export function delAnxiangc (id) {
  return axios({
    url: api.delanxiangc + id,
    method: 'post'
  })
}
