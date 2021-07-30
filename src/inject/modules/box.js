import { sleep } from '@/utils/util'
import { getPlayerModules } from '../webpackHelper'

class Box {
  constructor({ setting }) {
    this.setting = setting
    this.hookName = ["eb733"]
    this.pendingBox = []
    this.num = 0
    this.count = 0
    this.state = "free"
    this.audio = null
  }

  async hooker() {
    var r = this
    let modules = await getPlayerModules(this.hookName[0])
    if (!modules) return
    let a = modules.a
    let dataMap_orign = a.prototype.dataMap
    a.prototype.dataMap = function () {
      let result = dataMap_orign.apply(this, arguments)
      if (result instanceof Array) {
        let data = []
        result.forEach(element => {
          if (r.checkBox(element)) {
            data.push(element)
            r.pendingBox.push(element)
          }
        })
        r.count = data.length
        r.handlePendingBoxes()
        return data
      } else {
        if (r.checkBox(result)) {
          r.count++
          r.pendingBox.push(result)
          r.handlePendingBoxes()
          return result
        }
      }
      return null
    }
    let showDrawTips_orign = a.prototype.showDrawTips
    a.prototype.showDrawTips = function () {
      r.num++
      console.log(arguments[0])
      if (arguments[0].code == 0) {
        window.postMessage({ source: 'treasure_res', data: arguments[0] }, '*')
      }
      if (r.setting.autoClose && r.num >= count) {
        window.close()
      }
      showDrawTips_orign.apply(this, arguments);
      r.state = "free"
      r.handlePendingBoxes()
    }
    let mapping_orign = a.prototype.mapping
    a.prototype.mapping = function () {
      let r = mapping_orign.apply(this, arguments), o = Math.floor(r.delayTime), i = Math.floor(Date.now() / 1e3)
      return r.surplusTime - i - o > 0 && (r.destroyTime -= o, r.surplusTime -= o, r.delayTime = 1), r
    }
  }

  httpHook() {
    let e = window.playerSDK2da5b1f3a3deccaa435b("0b1d3").default
    e.applyMiddleWare("post", /\/member\/task\/redPacketReceive/i, e => {
      if (void 0 !== e.geetest) {
        this.state = "gee_testing"
        this.setDocTitle()
        if (this.setting.pickSound) this.ding()
      }
      return e
    })
  }

  checkBox(e) {
    let { boxFilter: b } = this.setting
      , tt = parseInt(e.treasureType, 10)
    return "all" == b || ("100" == b ? [100, 104, 105].includes(tt) : "101" == b ?
      tt >= 101 && ![104, 105].includes(tt) : "102" == b ? tt >= 103 && ![104, 105, 119].includes(tt) : "103" == b ? 127 == tt : false)
  }

  async handleTimeupBox(e) {
    if (parseInt((Date.now() + 100) / 1e3, 10) > e.destroyTime) return this.state = "free", this.handlePendingBoxes();
    this.state = "pick";
    window.PlayerAsideApp.container.registry.store.dispatch({
      type: "DRAW_TREASURE",
      payload: {
        type: "init",
        data: e
      }
    })
  }

  handlePendingBoxes() {
    if (this.state != "free" || this.pendingBox.length == 0) return
    let data = this.pendingBox.shift()
    let time = Math.max(1e3 * data.surplusTime - Date.now() + 200, 1000)
    this.state = "wait"
    setTimeout(() => {
      this.handleTimeupBox(data)
    }, time)
  }

  async setDocTitle() {
    if (!document.title_src) {
      document.title_src = document.title, document.title = "[新箱子验证] " + document.title
      while (true) {
        if (!document.hidden) {
          document.title = document.title_src, delete document.title_src
          break
        }
        await sleep(1000)
      }
    }
  }

  ding() {
    this.audio.play()
  }

  audioInit() {
    this.audio = document.createElement("audio")
    let s = document.createElement("source")
    s.setAttribute("src", "https://dy.colrose.cn/resources/ding.mp3")
    s.setAttribute("type", "audio/mpeg")
    this.audio.appendChild(s)
    this.audio.volume = 0.5
    document.body.appendChild(this.audio)
  }

  async install() {
    const { setting } = this
    if (!setting.pickTreasure) return
    this.hooker()
    this.httpHook()
    this.audioInit()
    console.log('assistant: module[box] installed...')
  }


}
//window.PlayerAsideApp.container.registry.store.getState().userRoleData  房间权限列表
//window.PlayerAsideApp.container.registry.store.getState().medalListMsgData  粉丝牌详情

export default Box