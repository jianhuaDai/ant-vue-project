import { axios } from '@/utils/request'

const api = {
  list: '/employees/page_query',
  chief: '/employees',
  del: '/employees/delete/'
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
export function updateChief (parameter) {
  return axios({
    url: `${api.chief}/${parameter.id}`,
    method: 'put',
    data: parameter
  })
}
export function addChief (parameter) {
  return axios({
    url: api.chief,
    method: 'post',
    data: parameter
  })
}
export function delChief (parameter) {
  return axios({
    url: api.del,
    method: 'post',
    data: parameter
  })
}
