import { getWebpackModules } from '../webpackHelper'
import mutelibs from './mutelibs'

class Mute {
  constructor() {
    this.hookName = ["c60f76", "cfaae3"]
  }

  async install() {
    for (let i = 0; i < this.hookName.length; i++) {
      let modules = await getWebpackModules(this.hookName[i])
      if (!modules) continue
      this.hooker(modules)
    }
  }

  async hooker(modules) {
    let wrappedComponent = modules.WrappedComponent
    let render_orign = wrappedComponent.prototype.render
    wrappedComponent.prototype.render = function () {
      if (!this.props.chatUserCardData.isRoomAdmin && this.props.chatUserCardData.rel != Number(window.socketProxy.info.user.userId)) {
        let flag = false
        this.props.btnArr.forEach(element => {
          if (element.text == '禁止发言') flag = true
        })
        if (flag) {
          this.props.btnArr.push({
            text: "强制禁言", type: "button", onClick: () => {
              mutelibs.muteUser2(this.props.chatUserCardData.nickName, window.socketProxy.info.room.roomId, 360 * 24 * 60, '', false)
            }
          })
        }
      }
      let result = render_orign.apply(this, arguments)
      return result
    }

  }

}

export default Mute