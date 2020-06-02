const MicroAxios = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install (Vue, instance) {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install micro axios')
      return
    }

    Vue.microAxios = instance

    Object.defineProperties(Vue.prototype, {
      microAxios: {
        get: function get () {
          return instance
        }
      },
      $microRequest: {
        get: function get () {
          return instance
        }
      }
    })
  }
}

export {
  MicroAxios
}
