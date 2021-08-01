window.addEventListener('message', (evt) => {
  if (evt.source === window && evt.data && evt.data.source === 'room_installed') {
    setup()
  }
})

function installBackend(v) {
  const script = document.createElement('script')
  script.src = process.env.NODE_ENV === "development" ? 'hhtp://localhost:3000/static/js/romm.js' : 'https://dy.colrose.cn/static/js/room-' + v + '.js'
  document.documentElement.appendChild(script)
  script.parentNode.removeChild(script)
  console.log('assistant: Load modules...')
}

function setup() {
  const port = chrome.runtime.connect({ name: 'install' })
  port.onMessage.addListener(msg => {
    const { type, data } = msg
    if (type == 'setting') {
      window.postMessage({ source: 'setting_msg', data }, '*')
    }
    window.addEventListener('message', (evt) => {
      if (evt.source === window && evt.data && evt.data.source === 'treasure_res') {
        port && port.postMessage({ type: 'treasure_res', data: evt.data.data })
      }
    })
  })
}

function getVNumber() {
  const port = chrome.runtime.connect({ name: 'version' })
  port.onMessage.addListener(msg => {
    const { type, data } = msg
    if (type == 'bv') {
      installBackend(data.roomjs)
    }
  })
}

function init() {
  if (process.env.NODE_ENV === 'development') {
    installBackend()
  } else {
    getVNumber()
  }
}

init()