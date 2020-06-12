import { axios } from '@/utils/request'

const api = {
  getanxianguihuaList: '/line_of_plans/page_query',
  getanxianxinxiList: '/rivers_line/page_query',
  addanxianguihua: '/line_of_plans',
  updateanxianguihua: '/line_of_plans/',
  delanxianguihua: '/line_of_plans/delete/',
  getgldwdata: '/enterprise_book/'
}

// 查询岸线规划信息列表
export function getAnxianguihuaList (parameter) {
  return axios({
    url: api.getanxianguihuaList,
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
// 新增岸线规划信息
export function addAnxianguihua (parameter) {
  return axios({
    url: api.addanxianguihua,
    method: 'post',
    data: parameter
  })
}
// 更新岸线工程信息
export function updateAnxianguihua (id, parameter) {
  return axios({
    url: api.updateanxianguihua + id,
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
// 删除岸线规划信息
export function delAnxianguihua (id) {
  return axios({
    url: api.delanxianguihua + id,
    method: 'post'
  })
}
