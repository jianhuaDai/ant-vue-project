import { axios } from '@/utils/request'

const api = {
  examineScore: '/appraisal/get_appraisals',
  examineBack: '/appraisal/get_appraisals',
  examineSearch: '/appraisal/get_appraisals',
}

export default api

export function getExamineScore (parameter) {
  return axios({
    url: api.examineScore,
    method: 'get',
    params: parameter
  })
}
export function getExamineBack (parameter) {
  return axios({
    url: api.examineBack,
    method: 'get',
    params: parameter
  })
}
export function getExamineSearch (parameter) {
  return axios({
    url: api.examineSearch,
    method: 'get',
    params: parameter
  })
}