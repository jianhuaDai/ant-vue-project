import { axios } from '@/utils/request'

const api = {
    getsourceList: '/water_infos/page_query'
}

export function getSourceList (parameter) {
  return axios({
    url: api.getsourceList,
    method: 'post',
    params: parameter
  })
}
