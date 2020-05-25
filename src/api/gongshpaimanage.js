import { axios } from '@/utils/request'

const api = {
    getarea: '/regionalism/get_regionalisms',
    getgongshipai: '/billboard/get_billboards'
}
export default api
// 行政区域查询
export function getArea () {
    return axios({
        url: api.getarea,
        method: 'get'
        // params: parameter
    })
}
// 公示牌查询
export function getGongshipai (parameter) {
    return axios({
        url: api.getgongshipai,
        method: 'get',
        params: parameter
    })
}
