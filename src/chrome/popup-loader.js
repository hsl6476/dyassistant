import { loadjscssfile } from '@/utils/util'

function installPopup(v) {
  const script = document.createElement('script')
  script.src = process.env.NODE_ENV === 'development' ? './static/js/popup-index.js' : 'https://dy.colrose.cn/static/js/popup-index-' + v + '.js'
  document.documentElement.appendChild(script)
  script.parentNode.removeChild(script)
}

function getVNumber() {
  const port = chrome.runtime.connect({ name: 'version' })
  port.onMessage.addListener(msg => {
    const { type, data } = msg
    if (type == 'bv') {
      installPopup(data.popupjs)
      loadjscssfile('https://dy.colrose.cn/static/css/popup-index-' + data.popupcss + '.css', 'css')
    }
  })
}

function init() {
  if (process.env.NODE_ENV === 'development') {
    installPopup()
  } else {
    getVNumber()
  }
}

init()