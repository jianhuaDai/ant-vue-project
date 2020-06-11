import { axios } from '@/utils/request'

const api = {
  getanxianxinxiList: '/rivers_line/page_query',
  addanxian: '/rivers_line',
  updateanxian: '/rivers_line/',
  delanxian: '/rivers_line/delete/',
  getgldwdata: '/enterprise_book/'
}

// 查询岸线信息列表
export function getAnxianxinxiList (parameter) {
  return axios({
    url: api.getanxianxinxiList,
    method: 'post',
    data: parameter
  })
}
// 新增岸线信息
export function addAnxian (parameter) {
  return axios({
    url: api.addanxian,
    method: 'post',
    data: parameter
  })
}
// 更新岸线信息
export function updateAnxian (id, parameter) {
  return axios({
    url: api.updateanxian + id,
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
// 删除岸线
export function delAnxian (id) {
  return axios({
    url: api.delanxian + id,
    method: 'post'
  })
}
