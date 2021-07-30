class PageShow {
  constructor({ setting }) {
    this.setting = setting
    this.status = 0
    this.cssRules = [
      "www.douyu.com##DIV[class='SignBaseComponent-sign-box RoomChat Barrage-chat-ad']",
      "www.douyu.com##DIV[class='recommendAD-54569e']",
      "www.douyu.com##DIV[class='recommendApp-0e23eb']",
      "www.douyu.com##DIV[class='Title-ad']",
      "www.douyu.com##DIV[class='Bottom-ad']",
      "www.douyu.com##DIV[class='GuessGameAdContainer ']",
      "www.douyu.com##DIV[class='PlayerToolbar-signCont']",
      "www.douyu.com##DIV[data-flag='']",
      "www.douyu.com##DIV[class='SysSign-Ad']",
      "www.douyu.com##DIV[class='ad-box-f661ba']",
      "www.douyu.com##DIV[class='DropPane-ad']",
      "www.douyu.com##DIV[class='Prompt-container']",
      "www.douyu.com##DIV[class='DropMenuList-ad']",
      "www.douyu.com##VIDEO[class='video-header']",
      "www.douyu.com##DIV[class='recommendView-3e8b62']"
    ]
  }

  hideEleminit() {
    const url = window.location.href
    let selectorRules = []
    if (this.cssRules.length == 0) {
      return
    }
    for (let i = 0; i < this.cssRules.length; i++) {
      let cssRule, params = this.cssRules[i].split("##")
      if (params.length > 1) {
        cssRule = params[1]
        let flagMatch = (new RegExp(params[0]).test(url)),
          flagExcept = (new RegExp("~").test(params[0]))
        if (!flagMatch || (flagMatch && flagExcept)) {
          continue
        }
      } else {
        cssRule = params[0]
      }
      selectorRules.push(cssRule)
    }
    this.elemHideEmulation(selectorRules);
  }

  elemHideEmulation(selectors) {
    if (!selectors || !selectors.length)
      return
    let selector = selectors.join(", ")
    this.insertStyleRule(selector + "{display: none !important;}")
  }

  insertStyleRule(rule) {
    let styleElement
    let styleElements = document.head.getElementsByTagName("style")
    if (styleElements.length) {
      styleElement = styleElements[0]
    } else {
      styleElement = document.createElement("style")
      document.head.appendChild(styleElement)
    }
    styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length)
  }

  tagRules(rules) {
    let head = document.getElementsByTagName('head')[0],
      style = document.createElement('style')
    style.type = 'text/css'
    if (style.styleSheet) {
      style.styleSheet.cssText = rules
    } else {
      style.appendChild(document.createTextNode(rules))
    }
    head.appendChild(style)
  }

  install() {
    const { setting } = this
    if (!setting.closePoster) return
    this.hideEleminit()
    console.log('assistant: module[pageShow] installed...')
  }
}

export default PageShow