import { waitSocket } from '@/utils/util'
import PageShow from './modules/pageShow'
import Box from './modules/box'
import { interactInit } from './modules/interact'
import Other from './modules/other'
import { loadjscssfile } from '@/utils/util'
import NobleBarrage from './modules/nobleBarrage'
import {webpackModulesInit} from './webpackHelper'

export default () => {
  const init = async (setting) => {
    const pageShow = new PageShow({ setting })
    pageShow.install()

    const module_flag = await waitSocket()
    if (!module_flag) return

    window.shark_room_jsonp_78622 = await webpackModulesInit()

    const box = new Box({ setting })
    box.install()

    interactInit()

    const nobleBarrage = new NobleBarrage({ setting })
    nobleBarrage.install()

    const other = new Other({ setting })
    other.install()

  }

  const cssinit = (v) => {
    loadjscssfile('https://dy.colrose.cn/static/css/room-' + v + '.css', 'css')
  }

  window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'setting_msg') {
      init(evt.data.data)
      cssinit(evt.data.data.roomcss)
    }
  })

  window.postMessage({ source: 'room_installed' }, '*')
}