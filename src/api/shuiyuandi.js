import { axios } from '@/utils/request'

const api = {
    getshuiyuandiList: '/water_sources/page_query',
    delshuiyuandi: '/water_sources/delete'
}

// 查询水源地列表接口
export function getShuiyuandiList (parameter) {
  return axios({
    url: api.getshuiyuandiList,
    method: 'post',
    data: parameter
  })
}
// 删除水源地信息
export function delShuiyuandi (id) {
    return axios({
        url: api.delshuiyuandi + id,
        method: 'post'
    })
  }
