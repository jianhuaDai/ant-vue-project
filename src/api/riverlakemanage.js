import { axios } from '@/utils/request'

const api = {
    getriverlakeList: '/water_infos/page_query'
}

export function getRiverlakeList (parameter) {
  return axios({
    url: api.getriverlakeList,
    method: 'post',
    params: parameter
  })
}
