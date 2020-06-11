import { axios } from '@/utils/request'

const api = {
  getanxianyongdiList: '/line_lands/page_query',
  getanxianxinxiList: '/rivers_line/page_query',
  addyongdi: '/line_lands',
  updateanxianyongdi: '/line_lands/',
  delanxianyd: '/line_lands/delete/',
  getgldwdata: '/enterprise_book/'
}

// 查询岸线用地信息列表
export function getAnxianyongdiList (parameter) {
  return axios({
    url: api.getanxianyongdiList,
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
// 新增岸线用地信息
export function addYongdi (parameter) {
  return axios({
    url: api.addyongdi,
    method: 'post',
    data: parameter
  })
}
// 更新岸线用地信息
export function updateAnxianyongdi (id, parameter) {
  return axios({
    url: api.updateanxianyongdi + id,
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
// 删除岸线用地
export function delAnxianyd (id) {
  return axios({
    url: api.delanxianyd + id,
    method: 'post'
  })
}