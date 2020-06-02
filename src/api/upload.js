// common/file_upload_single
import { axios } from '@/utils/request'

const api = {
  UPLOAD_SINGLE: '/common/file_upload_single'
}

export function uploadSingle (parameter) {
  return axios({
    url: api.UPLOAD_SINGLE,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function uploadMulti (params) {
  return axios({
    url: '/common/file_upload_multi',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
