import { axios } from '@/utils/request'

const api = {
  LIST: '/staff/get_staffs'
}

export function getTasks (parameter) {
  return axios({
    url: api.LIST,
    method: 'get',
    params: parameter
  })
}
