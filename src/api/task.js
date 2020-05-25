import { axios } from '@/utils/request'

const api = {
  list: '/common/get_tasks',
  solution: '/common/get_schemes',
  addSolution: '/common/create_scheme',
  updateSolution: '/common/update_scheme',
  delSolution: '/common/delete_scheme',
  getAirData: '/common/get_atmosphere',
  getWaterData: '/common/get_water',
  getAreaAirData: '/common/get_atmosphere_area',
  getAreaWaterData: '/common/get_water_area'
}

export function getTasks (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function getSolutions (parameter) {
  return axios({
    url: api.solution,
    method: 'get',
    params: parameter
  })
}

export function delSolution (parameter) {
  return axios({
    url: api.delSolution,
    method: 'get',
    params: parameter
  })
}

export function addSolution (parameter) {
  return axios({
    url: api.addSolution,
    method: 'post',
    data: parameter
  })
}

export function updateSolution (parameter) {
  return axios({
    url: `${api.updateSolution}?id=${parameter.id}`,
    method: 'put',
    data: parameter
  })
}

export function getAirData (parameter) {
  return axios({
    url: api.getAirData,
    method: 'get',
    params: parameter
  })
}

export function getWaterData (parameter) {
  return axios({
    url: api.getWaterData,
    method: 'get',
    params: parameter
  })
}
export function getAreaAirData (parameter) {
  return axios({
    url: api.getAreaAirData,
    method: 'get',
    params: parameter
  })
}

export function getAreaWaterData (parameter) {
  return axios({
    url: api.getAreaWaterData,
    method: 'get',
    params: parameter
  })
}
