import { axios } from '@/utils/request'

const api = {
    getsourceList: '/common/get_tasks'
}

export function getSourceList (parameter) {
  return axios({
    url: api.getsourceList,
    method: 'get',
    params: parameter
  })
}