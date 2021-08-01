import axios from '@/utils/http'
import { store } from '@/store/extendIndex'
import { uploadVersionInfo } from '@/store/action/extend'

function installBackGround(v) {
  const script = document.createElement('script');
  script.src = process.env.NODE_ENV === 'development' ? './static/js/background-index.js' : 'https://dy.colrose.cn/static/js/background-index-' + v + '.js';
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

async function getVNumber() {
  let params = {timestamp:  Date.now()}
  axios.get('https://dy.colrose.cn/config/version', {
    params
  }).then(res => {
    console.log(res)
    store.dispatch(uploadVersionInfo(res.data))
    installBackGround(res.data.backgroundjs)
  })
}

function init() {
  if (process.env.NODE_ENV === 'development') {
    installBackGround()
  } else {
    getVNumber()
  }
}

init()