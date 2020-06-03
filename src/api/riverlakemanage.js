import { axios } from '@/utils/request'

const api = {
    getriverlakeList: '/water_infos/page_query',
    delriverlake: '/water_infos/delete/'
}

// 查询河湖列表接口
export function getRiverlakeList (parameter) {
  return axios({
    url: api.getriverlakeList,
    method: 'post',
    data: parameter
  })
}
export function delRiverlake (id) {
  return axios({
      url: api.delriverlake + id,
      method: 'post'
  })
}
