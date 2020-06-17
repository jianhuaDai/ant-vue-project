import protoAxios from 'axios'
import { axios } from '@/utils/request'

const api = {
  SERVER_MAP: 'http://test.susinnovation.com:8080/geoserver/china2019/ows',
  waterInfo: '/monitoring_station/page_query', // 测站列表 station_type: 1水情测站2雨情测站3水质测站4河湖生态测站5视频站
  pollution: '/pollutions/page_query',
  pollutionDetail: '/pollutions',
  NJ_SERVER: 'http://test.susinnovation.com:8080/geoserver/njdemo/ows',
  riverAndLake: '/water_info/get_water_infos',
  getWater: '/get_waters/page_query',
  getWaterDetail: '/get_waters',
  waterEmphasiss: '/info_serve/get_water_emphasiss',
  waterFunction: '/water_functionals/page_query',
  sewage: '/sewage_monitors/list',
  riverLine: '/river_protect/rivers_lines',
  blackWater: '/info_serve/get_water_monitors',
  videoMonitor: '/monitoring_station/page_query'
}
// 初始化河湖地图
export function getAllriver (params) {
  return axios({
    url: '/water_infos/monitor/page_query',
    method: 'post',
    data: params
  })
}
export function loadWFS (parameter) {
  return protoAxios({
    url: api.SERVER_MAP,
    method: 'get',
    params: parameter
  })
}

export function loadNJWFS (parameter) {
  return protoAxios({
    url: api.NJ_SERVER,
    method: 'get',
    params: parameter
  })
}

export function loadPollution (parameter) {
  return axios({
    url: api.pollution,
    method: 'post',
    data: parameter
  })
}
export function getPollutionDetail (id) {
  return axios({
    url: `${api.pollutionDetail}/${id}`,
    method: 'get',
    params: {}
  })
}

export function loadWaterOrRain (parameter) {
  return axios({
    url: api.waterInfo,
    method: 'post',
    data: parameter
  })
}
// 雨情表格数据
export function loadRain (params) {
  return axios({
    url: '/rain_monitors/list',
    method: 'post',
    data: params
  })
}
// 水情表格数据
export function loadWater (params) {
  return axios({
    url: 'water_monitors/list',
    method: 'post',
    data: params
  })
}
export function loadRiverAndLake (parameter) {
  return axios({
    url: api.riverAndLake,
    method: 'get',
    params: parameter
  })
}

export function loadGetWater (parameter) {
  return axios({
    url: api.getWater,
    method: 'post',
    data: parameter
  })
}
// 获取取水口详情上半部分
export function getWaterDetail (id) {
  return axios({
    url: `${api.getWaterDetail}/${id}`,
    method: 'get',
    params: {}
  })
}
// 获取取水口详情图表数据
export function getWaterChart (id) {
  return axios({
    url: `monitoring_count/chart/${id}`,
    method: 'get'
  })
}
// 获取水功能详情部分的水质详情
export function waterQualityDetail (id) {
  return axios({
    url: `/water_fun_monitors/${id}`,
    method: 'get'
  })
}
// 水功能区按编码查询指标趋势数据
export function waterFunTrend (params) {
  return axios({
    url: '/water_fun_monitors/trend',
    method: 'post',
    data: params
  })
}
export function loadWaterEmphasiss (parameter) {
  return axios({
    url: api.waterEmphasiss,
    method: 'get',
    params: parameter
  })
}

export function loadWaterFunction (parameter) {
  return axios({
    url: api.waterFunction,
    method: 'post',
    data: parameter
  })
}

export function loadSewage (parameter) {
  return axios({
    url: api.sewage,
    method: 'post',
    data: parameter
  })
}

export function loadRiverLine (parameter) {
  return axios({
    url: api.riverLine,
    method: 'get',
    params: parameter
  })
}

export function loadBlackWater (parameter) {
  return axios({
    url: api.blackWater,
    method: 'get',
    params: parameter
  })
}

export function loadProject (parameter) {
  return protoAxios({
    url: '/data/project.json',
    method: 'get',
    params: parameter
  })
}
export function loadBoard (parameter) {
  return axios({
    url: '/billboard/page_billboard',
    method: 'post',
    data: parameter
  })
}
export function loadEvent (parameter) {
  return protoAxios({
    url: '/data/event.json',
    method: 'get',
    params: parameter
  })
}
export function loadComplaint (parameter) {
  return protoAxios({
    url: '/data/complaint.json',
    method: 'get',
    params: parameter
  })
}
// 视频站点数据
export function loadVideoMonitor (parameter) {
  return axios({
    url: api.videoMonitor,
    method: 'post',
    data: parameter
  })
}
// 水情测站数据查询
export function waterMonitors (id) {
  return axios({
    url: `/water_monitors/${id}`,
    method: 'get'
  })
}
// 雨情测站数据查询
export function rainMonitors (id) {
  return axios({
    url: `/rain_monitors/${id}`,
    method: 'get'
  })
}
// 排污口getOutFallDetail
export function getOutFallDetail (id) {
  return axios({
    url: `/sewage_monitors/${id}`,
    method: 'get'
  })
}
// 排污口详情
export function getOutFallAttribute (id) {
  return axios({
    url: `/sewage/${id}`,
    method: 'get'
  })
}
