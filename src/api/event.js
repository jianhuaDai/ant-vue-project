import { axios } from '@/utils/request'

const api = {
  eventAccept: '/event_handle/get_event_handles',
  eventInstruct: '/event_handle/get_event_handles',
  eventQuery: '/event_handle/get_event_handles',
  eventTrace: '/event_handle/get_event_handles',
  eventWait: '/event_handle/get_event_handles',
}

export default api

export function getEventAccept (parameter) {
  return axios({
    url: api.eventAccept,
    method: 'get',
    params: parameter
  })
}
export function getEventInstruct (parameter) {
  return axios({
    url: api.eventInstruct,
    method: 'get',
    params: parameter
  })
}
export function getEventQuery (parameter) {
  return axios({
    url: api.eventQuery,
    method: 'get',
    params: parameter
  })
}
export function getEventTrace (parameter) {
  return axios({
    url: api.eventTrace,
    method: 'get',
    params: parameter
  })
}
export function getEventWait (parameter) {
  return axios({
    url: api.eventWait,
    method: 'get',
    params: parameter
  })
}