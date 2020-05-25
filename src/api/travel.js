import { axios } from '@/utils/request'

const api = {
  patrolAlert: '/patrol_water/get_patrol_alerts',
  patrolEvent: '/patrol_water/get_patrol_events',
  patrolQuestion: '/patrol_water/get_patrol_questions',
  patrolRecord: '/patrol_water/get_patrol_records',
  patrolTask: '/patrol_water/get_patrol_tasks',
}

export default api

export function getPatrolEvent (parameter) {
  return axios({
    url: api.patrolEvent,
    method: 'get',
    params: parameter
  })
}
export function getPatrolTask (parameter) {
  return axios({
    url: api.patrolTask,
    method: 'get',
    params: parameter
  })
}
export function getPatrolRecord (parameter) {
  return axios({
    url: api.patrolRecord,
    method: 'get',
    params: parameter
  })
}
export function getPatrolQuestion (parameter) {
  return axios({
    url: api.patrolQuestion,
    method: 'get',
    params: parameter
  })
}
