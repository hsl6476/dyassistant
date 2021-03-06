import { sleep } from '@/utils/util'
import { qe } from './libs/boxLibs'

class Box {
  constructor({ setting }) {
    this.setting = setting
    this.pendingBox = []
    this.num = 0
    this.count = 0
    this.state = "free"
    this.audio = null
  }

  isArray(e) {
    return /@\S\//g.test(String(e))
  }

  dataMap(e) {
    return e.map(e => ({
      roomId: window.socketProxy.info.room.roomId,
      treasureId: parseInt(e.rpid, 10),
      treasureType: parseInt(e.rpt, 10),
      senderName: e.snk,
      snk: e.snk,
      senderUid: +e.sid,
      surplusTime: parseInt(e.ot, 10),
      destroyTime: parseInt(e.dt, 10)
    }))
  }

  socketHook() {
    var { socketStream: sc } = window.socketProxy
    sc.subscribe('tslist', e => {
      var t = e.list || [], o = [];
      var c = (this.isArray(t) ? qe(t) : [t])
      c.forEach(element => {
        e && o.push(qe(element))
      })
      this.handlePendingBoxes(this.dataMap([e]))
    })
    sc.subscribe('tsboxb', e => {
      console.log("tsboxb", e)
      this.handlePendingBoxes(this.dataMap([e]))
    })
  }

  httpHook() {
    let e = window.playerSDK2da5b1f3a3deccaa435b("0b1d3").default
    e.applyMiddleWare("post", /\/member\/task\/redPacketReceive/i, e => {
      if (void 0 !== e.geetest) {
        this.state = "gee_testing"
        this.setDocTitle()
        if (this.setting.pickSound) this.ding()
      } else {
        if (e.award_type) {
          window.postMessage({ source: 'treasure_res', data: e }, '*')
        }
        this.state = "free"
        this.handlePendingBoxes()
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

  pushPendingBox(e) {
    this.checkBox(e) && this.pendingBox.push(e)
  }

  handlePendingBoxes(e, t = true) {
    if (e && e instanceof Array ? e.forEach(e => this.pushPendingBox(e)) : e && this.pushPendingBox(e), t) {
      if (this.pendingBox.length != 0 && "free" === this.state) {
        this.state = "wait"
        let data = this.pendingBox.shift()
        let time = Math.max(1e3 * data.surplusTime - Date.now() + 200, 1500)
        setTimeout(() => {
          this.handleTimeupBox(data)
        }, time)
      }
    }
  }

  async setDocTitle() {
    if (!document.title_src) {
      document.title_src = document.title, document.title = "[???????????????] " + document.title
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
//window.PlayerAsideApp.container.registry.store.getState().userRoleData  ??????????????????
//window.PlayerAsideApp.container.registry.store.getState().medalListMsgData  ???????????????

export default Box