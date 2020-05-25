import { axios } from '@/utils/request'

const api = {
    getdaiban: '/home/query_backlog'
}
export default api
// 待办事项查询
export function getDaiban (parameter) {
    return axios({
        url: api.getdaiban,
        method: 'get',
        params: parameter
    })
}