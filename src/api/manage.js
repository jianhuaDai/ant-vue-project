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
  departments: '/departments',
  depSort: '/departments/change_sort'
}

export default api
export function getEnterprises (parameter) {
  return axios({
    url: api.enterprises,
    method: 'get',
    params: parameter
  })
}
export function addEnterprises (parameter) {
  return axios({
    url: api.enterprises,
    method: 'post',
    data: parameter
  })
}
export function modifyEnterprises (parameter) {
  return axios({
    url: `${api.enterprises}/${parameter.enterprise_id}`,
    method: 'put',
    data: parameter
  })
}
export function delEnterprises (parameter) {
  console.log(parameter)

  return axios({
    url: `${api.enterprises}/${parameter.enterprise_id}`,
    method: 'delete',
    data: {}
  })
}

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

export function changeDeptSort (parameter) {
  const form = new FormData()
  Object.keys(parameter).forEach(key => {
    form.append(key, parameter[key])
  })
  return axios({
    url: api.depSort,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function getEmployeeByDept (parameter) {
  return axios({
    url: api.employees,
    method: 'get',
    params: parameter
  })
}

export function saveEmploy (parameter, isEdit = true) {
  let method = 'post'
  let url = api.employees
  if (isEdit) {
      method = 'put'
      url += `/${parameter.employee_id}`
  }
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}

export function delEmployee (employeeId) {
  return axios({
    url: `${api.employees}/${employeeId}`,
    method: 'delete'
  })
}

export function saveDept (parameter) {
  let method = 'post'
  let url = api.departments
  if (parameter.dept_id) {
    method = 'put'
    url += `/${parameter.dept_id}`
  }
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}

export function delDept (deptId) {
  return axios({
    url: `${api.departments}/${deptId}`,
    method: 'delete'
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
