import { axios } from '@/utils/request'

const api = {
  list: '/employees/page_query',
  chief: '/employees',
  del: '/employees/delete',
  riverData: '/water_infos/page_query'
}

export function getList (parameter) {
  for (const key in parameter) {
    if (parameter[key] === '') { delete parameter[key] }
  }
  return axios({
    url: api.list,
    method: 'post',
    data: parameter
  })
}
export function getChief (id) {
  return axios({
    url: `${api.chief}/${id}`,
    method: 'get',
    params: {}
  })
}
export function saveChief (parameter) {
  const method = parameter.employee_id ? 'put' : 'post'
  const url = parameter.employee_id ? `${api.chief}/${parameter.employee_id}` : api.chief
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}
export function delChief (id) {
  return axios({
    url: `${api.del}/${id}`,
    method: 'post',
    data: {}
  })
}
export function getRiverData (parameter) {
  return axios({
    url: api.riverData,
    method: 'post',
    data: parameter
  })
}
// 河湖长管理状态切换
export function statusChange (params) {
  return axios({
    url: '/employees/status',
    method: 'post',
    data: params
  })
}
