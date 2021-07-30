import { getWebpackModules } from '../webpackHelper'

class Other {
  constructor({ setting }) {
    this.setting = setting;
    this.hookName = ["f450d5", "b41c5d"]
  }

  //禁止下播自动跳转
  async hooker() {
    let modules = await getWebpackModules(this.hookName[0])
    if (!modules) return
    let wrappedComponent = modules.WrappedComponent
    let render_orign = wrappedComponent.prototype.render
    wrappedComponent.prototype.render = function () { return null }

    let closingRecommendServices = await getWebpackModules(this.hookName[1])
    if (!closingRecommendServices) return
    closingRecommendServices.instance.setupRecommend = function () { }
  }

  install() {
    const { setting } = this;
    if (!setting.prohibitJump) return
    this.hooker()
    console.log('assistant: module[other] installed...')
  }

}

export default Other