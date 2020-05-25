import { axios } from '@/utils/request'

const api = {
    getdudaorenwu: '/supervision/get_supervision_tasks',
    getdudaofangan: '/supervision/get_supervision_schemes',
    getdudaogc: '/supervision/get_supervision_processes',
    getshijiandc: '/supervision/get_supervision_events'
}
export default api
// 查询督导任务
export function getDudaorenwu (parameter) {
    return axios({
        url: api.getdudaorenwu,
        method: 'get',
        params: parameter
    })
}
// 查询督导方案
export function getDudaofangan (parameter) {
    return axios({
        url: api.getdudaofangan,
        method: 'get',
        params: parameter
    })
}
// 督导过程管理
export function getDudaogc (parameter) {
    return axios({
        url: api.getdudaogc,
        method: 'get',
        params: parameter
    })
}
// 查询事件督查
export function getShijiandc (parameter) {
    return axios({
        url: api.getshijiandc,
        method: 'get',
        params: parameter
    })
}
