import { axios } from '@/utils/request'

const api = {
    getsunhaipingu: '/info_serve/get_damage_assessments',
    getarea: '/regionalism/get_regionalisms',
    getshentaigc: '/info_serve/get_ecological_engineers',
    getweifa: '/info_serve/get_illegals',
    getzhencefagui: '/info_serve/get_laws',
    getyanghubaojie: '/info_serve/get_maintenance_cleanings',
    getzhiligongceng: '/info_serve/get_manage_projects',
    getguanhudanwei: 'info_serve/get_manage_protects',
    getshuihuanjfp: '/info_serve/get_risk_evaluations',
    getshuigongnengqu: '/water_resource/water_functionals',
    getpaiwuxinxi: '/water_resource/drains',
    getxiangmuxinxi: '/water_resource/projects',
    gethehuanxian: '/river_protect/rivers_lines',
    getduanmianxinxi: '/water_pollution/fractures',
    getzhongdianwry: '/water_pollution/emphasis_pollutions',
    getwushuiclc: '/water_pollution/sewage_plants',
    getguihuasjfz: '/info_serve/get_plan_schemes',
    getchuxianjggc: '/info_serve/get_reinforcement_projects',
    getshuijg: '/info_serve/get_water_landscapes',

    gethehujiance: '/info_serve/get_rivers_monitors'
}
export default api
// 水污染损害评估
export function getSunhaipingu (parameter) {
    return axios({
        url: api.getsunhaipingu,
        method: 'get',
        params: parameter
    })
}
// 行政区域查询
export function getArea () {
    return axios({
        url: api.getarea,
        method: 'get'
        // params: parameter
    })
}
// 生态工程查询 loadareatree
export function getShentaigc (parameter) {
    return axios({
        url: api.getshentaigc,
        method: 'get',
        params: parameter
    })
}
// 违法信息查询
export function getWeifa (parameter) {
    return axios({
        url: api.getweifa,
        method: 'get',
        params: parameter
    })
}
// 查询政策法规
export function getZhencefagui (parameter) {
    return axios({
        url: api.getzhencefagui,
        method: 'get',
        params: parameter
    })
}
// 查询工程养护与保洁
export function getYanghubaojie (parameter) {
    return axios({
        url: api.getyanghubaojie,
        method: 'get',
        params: parameter
    })
}
// 治理工程查询
export function getZhiligongceng (parameter) {
    return axios({
        url: api.getzhiligongceng,
        method: 'get',
        params: parameter
    })
}
// 查询管护单位
export function getGuanhudanwei (parameter) {
    return axios({
        url: api.getguanhudanwei,
        method: 'get',
        params: parameter
    })
}
// 查询水环境风评
export function getShuihuanjfp (parameter) {
    return axios({
        url: api.getshuihuanjfp,
        method: 'get',
        params: parameter
    })
}
// 查询河湖监测
export function getHehujiance (parameter) {
    return axios({
        url: api.gethehujiance,
        method: 'get',
        params: parameter
    })
}
// 查询水功能区
export function getShuigongnengqu (parameter) {
    return axios({
        url: api.getshuigongnengqu,
        method: 'get',
        params: parameter
    })
}
// 查询排污信息
export function getPaiwuxinxi (parameter) {
    return axios({
        url: api.getpaiwuxinxi,
        method: 'get',
        params: parameter
    })
}
// 查询项目信息
export function getXiangmuxinxi (parameter) {
    return axios({
        url: api.getxiangmuxinxi,
        method: 'get',
        params: parameter
    })
}
// 查询河湖岸线
export function getHehuanxian (parameter) {
    return axios({
        url: api.gethehuanxian,
        method: 'get',
        params: parameter
    })
}
// 查询断面信息
export function getDuanmianxinxi (parameter) {
    return axios({
        url: api.getduanmianxinxi,
        method: 'get',
        params: parameter
    })
}
// 查询重点污染源
export function getZhongdianwry (parameter) {
    return axios({
        url: api.getzhongdianwry,
        method: 'get',
        params: parameter
    })
}
// 查询污水处理厂
export function getWushuiclc (parameter) {
    return axios({
        url: api.getwushuiclc,
        method: 'get',
        params: parameter
    })
}
// 查询规划设计方案
export function getGuihuasjfz (parameter) {
    return axios({
        url: api.getguihuasjfz,
        method: 'get',
        params: parameter
    })
}
// 查询除险加固工程
export function getChuxianjggc (parameter) {
    return axios({
        url: api.getchuxianjggc,
        method: 'get',
        params: parameter
    })
}
// 查询水景观
export function getShuijg (parameter) {
    return axios({
        url: api.getshuijg,
        method: 'get',
        params: parameter
    })
}