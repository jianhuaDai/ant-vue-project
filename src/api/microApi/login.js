import { microAxios } from '@/utils/microRequest'

const MicroUrl = process.env.VUE_APP_MICRO_AUTH_API
const api = {
  Login: `${MicroUrl}/users/sign_in`,
  Logout: `${MicroUrl}/users/logout`,
  UserInfo: `${MicroUrl}/users/user_info`
}

export function login (parameter) {
  return microAxios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}

export function logout (parameter) {
  return microAxios({
    url: api.Logout,
    method: 'post',
    data: parameter
  })
}

export function getInfo (parameter) {
  return microAxios({
    url: api.UserInfo,
    method: 'post',
    data: parameter
  })
}
