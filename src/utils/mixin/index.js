import moment from 'moment'

const statusMap = {
  0: {
    status: 'default',
    text: '禁用'
  },
  1: {
    status: 'processing',
    text: '正常'
  }
}
export default {
    filters: {
        statusFilter (type) {
          return statusMap[type].text
        },
      statusTypeFilter (type) {
        return statusMap[type].status
      },
      dateFilter (val) {
            return moment(new Date(val)).format('YYYY-MM-DD')
        }
    },
    methods: {
        deepCopy (obj) {
            if (Object.prototype.toString.call(obj) !== '[object Object]') return obj
            return JSON.parse(JSON.stringify(obj))
        },
        changePage (args) {
            this.$router.push(args)
        },
        back () {
            history.back()
        }
    }
}
