import { axios } from '@/utils/request'

const api = {
    getshengtaiList: '/engineering/query_ecolpage',
    addshengtai: '/engineering/add_ecol',
    delshengtai: '/engineering/',
    updateshengtai: '/engineering/'
}
// 查询生态工程列表数据
export function getShengTaiList (parameter) {
    return axios({
      url: api.getshengtaiList,
      method: 'post',
      data: parameter
    })
  }
// 新增生态工程
export function addShengTaiList (parameter) {
    return axios({
      url: api.addshengtai,
      method: 'post',
      data: parameter
    })
  }
  // 更新生态工程
export function updateShengTai (id, parameter) {
  return axios({
    url: api.updateshengtai + id,
    method: 'put',
    data: parameter
  })
}
  // 删除生态工程
  export function delShentTaiList (id) {
    return axios({
      url: api.delshengtai + id,
      method: 'post'
    })
  }
