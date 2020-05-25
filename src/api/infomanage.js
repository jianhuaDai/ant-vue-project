import { axios } from '@/utils/request'

const api = {
    getarea: '/regionalism/get_regionalisms',
    gethehuxinxi: '/water_info/get_water_infos',
    gethehuzhangxinxi: '/staff/get_staffs'
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
// 查询河湖信息
export function getHehuxinxi (parameter) {
    return axios({
        url: api.gethehuxinxi,
        method: 'get',
        params: parameter
    })
}
// 查询河湖长信息
export function getHehuzhangxinxi (parameter) {
    return axios({
        url: api.gethehuzhangxinxi,
        method: 'get',
        params: parameter
    })
}
