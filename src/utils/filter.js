import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const approvalStatusObj = {
  0: '未提交审批',
  1: '审批中',
  2: '通过',
  3: '驳回'
}
Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('statusName', function (value) {
  return value === 1 ? '启用' : '禁用'
})
Vue.filter('statusBadge', function (value) {
  return value === 1 ? 'processing' : 'error'
})

Vue.filter('isExamineName', function (value) {
  return value === 1 ? '是' : '否'
})
Vue.filter('approvalStatus', function (value) {
  return approvalStatusObj[value]
})
