class NobleBarrage {
  constructor({ setting }) {
    this.setting = setting
    this.status = 0
  }

  async noble() {
    let { socketStream: e } = window.socketProxy
      , t = this
      , o = e.MODULE.uenter.throttle
    let s = e.MODULE.chatmsg.throttle
    e.MODULE.chatmsg.throttle = function (e, ...o) {
      try {
        e.uid !== window.socketProxy.info.user.userId || (e.nc = "1",
          e.nl = t.setting.nobleBarrage)
      } catch (es) { }
      return s.call(this, e, ...o)
    }
  }

  install() {
    const { setting } = this
    if (setting.nobleBarrage == '0') {
      return
    }
    this.noble()
    console.log('assistant: module[nobleBarrage] installed...')
  }
}

export default NobleBarrage