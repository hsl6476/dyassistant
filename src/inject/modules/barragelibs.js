import { sleep } from '@/utils/util'
import { EventEmitter } from 'events'

class BarrageLibs extends EventEmitter {
  constructor() {
    super()
    this.init = false
    this.send_msg_status = false
    this.send_msg = null
    this.send_msg_count = 0
    this.send_msg_loop = false
    this.send_smg_colour = false
    this.colour_list = []
  }

  hasClass(elem, cls) {
    cls = cls || ''
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
  }

  async waitForIsSend(btn) {
    while (true) {
      if (!this.hasClass(btn, 'is-gray')) {
        return
      }
      await sleep(2000)
    }
  }

  async sendMsg(value, time, num) {
    if (!this.checkSend(num)) return

    let area = document.getElementsByClassName('ChatSend-txt')[0],
      maxLength = area.getAttribute('maxlength'),
      btn = document.getElementsByClassName('ChatSend-button ')[0]
    await this.waitForIsSend(btn)
    if (this.send_smg_colour) {
      if (this.colour_list.length == 0) {
        this.checkColour()
      }
      let colour = this.colour_list.shift()
      if (!this.init) this.colour_default = window.PlayerAsideApp.container.registry.store.getState().chatToolBar.color, this.init = true
      window.PlayerAsideApp.container.registry.store.getState().chatToolBar.color = colour
    }
    if (btn.innerHTML === '发送') {
      area.value = value
      btn.click()
      this.send_msg_count++
    }
    if (!this.checkSend(num)) return
    let t = this
    setTimeout(function () {
      if (t.send_msg_status) {
        t.sendMsg(t.send_msg_loop ? t.send_msg[t.send_msg_count % t.send_msg.length] : t.send_msg[0], time, num)
      }
    }, time ? Number(time) * 1000 : 5000)
  }

  stop_send() {
    if (this.send_smg_colour) window.PlayerAsideApp.container.registry.store.getState().chatToolBar.color = this.colour_default
    this.send_msg_status = false
  }

  barrageInit(value, barrage_loop, barrage_colour, time, barrage_num) {
    try {
      if (this.send_msg_status) return
      this.send_msg = this.trimSpace(value.split('\n'))
      this.send_msg_loop = barrage_loop
      this.send_smg_colour = barrage_colour
      this.send_msg_status = true
      this.send_msg_count = 0
      if (barrage_num != '') {
        barrage_num = Number(barrage_num)
      } else {
        barrage_num = -1
      }
      this.sendMsg(this.send_msg[0], time, barrage_num)
    } catch (error) {
      console.log(error)
    }
  }

  trimSpace(arr) {
    return arr.filter(function (s) {
      return s && s.trim()
    })
  }

  checkSend(num) {
    if (num != -1 && this.send_msg_count >= num) {
      this.stop_send()
      this.emit('barrage_stop')
      return false
    }
    return true
  }

  checkColour() {
    window.PlayerAsideApp.container.registry.store.getState().chatToolBar.fansBarrageLv.forEach(element => {
      if (element.status == 1) this.colour_list.push(element.color)
    })
    if (this.colour_list.length >= 2) this.colour_list.shift()
    this.colour_list.sort(function () {
      return Math.random() - 0.5
    })
  }
}

export default new BarrageLibs