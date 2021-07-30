import interact from '@/components/interact/index'
import { sleep } from '@/utils/util'
import Mute from './mute'

export const interactInit = async () => {
  while (!window.socketProxy.info && !window.socketProxy.info.room) {
    await sleep(200)
  }
  let roomId = window.socketProxy.info.room.roomId
  if (roomId == 78622 || roomId == 520) {
    let medalList
    let num = 0
    while (true) {
      num++
      medalList = window.PlayerAsideApp.container.registry.store.getState().medalListMsgData.medalList
      if (medalList.length != 0) break
      if (medalList.length == 0 && num > 75) return
      await sleep(200)
    }
    let flag = false
    medalList.forEach(element => {
      if (roomId == Number(element.medalRid)) {
        if (element.medalLev > 9) flag = true
      }
    })
    if (!flag) return
  }
  let div = document.createElement("div")
  div.className = 'a12cs-adfx4w'
  // while (document.getElementsByClassName('PlayerToolbar-Wealth').length == 0 || document.getElementsByClassName('PlayerToolbar-getYCBtn').length == 0) {
  //   await sleep(200)
  // }
  while (!window.socketProxy.info.user.userId) {
    await sleep(22)
  }
  document.getElementsByClassName('PlayerToolbar-Wealth')[0].appendChild(div)
  interact()

  const mute = new Mute()
  mute.install()
}
