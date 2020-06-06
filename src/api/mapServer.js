import protoAxios from 'axios'
import { axios } from '@/utils/request'

const api = {
  SERVER_MAP: 'http://test.susinnovation.com:8080/geoserver/china2019/ows',
  waterInfo: '/monitor/water_rain',
  pollution: '/pollutions/page_query',
  pollutionDetail: '/pollutions',
  NJ_SERVER: 'http://test.susinnovation.com:8080/geoserver/njdemo/ows',
  riverAndLake: '/water_info/get_water_infos',
  getWater: '/get_waters/page_query',
  getWaterDetail: '/get_waters',
  waterEmphasiss: '/info_serve/get_water_emphasiss',
  waterFunction: '/water_functionals/page_query',
  sewage: '/sewage/page_query',
  riverLine: '/river_protect/rivers_lines',
  blackWater: '/info_serve/get_water_monitors',
  videoMonitor: '/monitor/video_monitor'
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
    method: 'get',
    params: parameter
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

export function getWaterDetail (id) {
  return axios({
    url: `${api.getWaterDetail}/${id}`,
    method: 'get',
    params: {}
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
    params: parameter
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
  return protoAxios({
    url: '/data/board.json',
    method: 'get',
    params: parameter
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
export function loadVideoMonitor (parameter) {
  return axios({
    url: api.videoMonitor,
    method: 'get',
    params: parameter
  })
}
