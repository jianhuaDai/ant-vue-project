import { axios } from '@/utils/request'

const api = {
  enterprises: '/enterprises',
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/enterprises/tree',
  employees: '/employees',
  departments: '/depts/page_query',
  depSort: '/departments/change_sort',
  enterpriseBook: '/enterprise_book'
}

export function getEmployee (id) {
  return axios({
    url: `${api.employees}/${id}`,
    method: 'get',
    param: {}
  })
}
export function getDeptList (parameter) {
  return axios({
    url: api.departments,
    method: 'post',
    data: parameter
  })
}
export function getEnterpriseBook (parameter) {
  return axios({
    url: `${api.enterpriseBook}/${parameter.id}`,
    method: 'get',
    param: {}
  })
}
