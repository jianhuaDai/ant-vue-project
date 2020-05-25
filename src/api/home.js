import { axios } from '@/utils/request'
const api = {
  todo: '/home/query_backlog',
  notice: '/home/query_inform',
  news: '/home/query_news',
  knowledge: '/home/query_repository'
}

export function getTodo (parameter) {
  return axios({
    url: api.todo,
    method: 'get',
    params: parameter
  })
}
export function getNotice (parameter) {
  return axios({
    url: api.notice,
    method: 'get',
    params: parameter
  })
}
export function getNews (parameter) {
  return axios({
    url: api.news,
    method: 'get',
    params: parameter
  })
}
export function getKnowledge (parameter) {
  return axios({
    url: api.knowledge,
    method: 'get',
    params: parameter
  })
}
