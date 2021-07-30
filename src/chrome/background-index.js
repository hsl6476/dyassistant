import { store, persis } from '@/store/extendIndex'
import { uploadBoxInfo, uploadSettingInfo } from '@/store/action/extend'
import { settingdefault } from '@/store/constant'

chrome.webRequest.onBeforeRequest.addListener(function () {
  return { cancel: true }
}, {
  urls: [
    '*://pubads.g.doubleclick.net/*',
    '*://staticlive.douyucdn.cn/common/simplayer/assets/gameAdversion.swf?*',
    '*://staticlive.douyucdn.cn/common/simplayer/assets/videoAd.swf?*',
  ],
}, ['blocking'])

chrome.webRequest.onBeforeRequest.addListener(function (details) {
  let url = details.url
  if (url.indexOf("shark2.douyucdn.cn/front-publish/live-player-aside-master/js/TreasureGee") != -1) {
    return { redirectUrl: "https://dy.colrose.cn/static/js/TreasureGee-62l6pkm8.js" }
  }
  return true
}, {
  urls: [
    '*://shark2.douyucdn.cn/front-publish/live-player-aside-master/js/TreasureGee*'
  ],
}, ['blocking'])

chrome.runtime.onConnect.addListener(async port => {
  if (port.name === 'install') {
    const { setting, version } = JSON.parse(localStorage.getItem('persist:dyconfig'))
    const roomcss = JSON.parse(version).roomcss
    port.postMessage({
      type: 'setting',
      data: {
        ...settingdefault,
        ...JSON.parse(setting),
        roomcss
      }
    })
    port.onMessage.addListener(msg => {
      const { type, data } = msg
      if (type == 'treasure_res') {
        let { box } = store.getState()
        let today = getToday()
        if (box.day != today) {
          resetStat(box, today)
        }
        ++box.box;
        const { award_type, silver, prop_count, prop_id, prop_name } = data;
        if (award_type == '1') {
          box.silver += parseInt(silver, 10);
        } else if (award_type == '2') {
          if (prop_name == '赞') {
            box.zan += parseInt(prop_count, 10);
          } else if (prop_name === '稳') {
            box.wen += parseInt(prop_count, 10);
          } else if (prop_name === '怂') {
            box.song += parseInt(prop_count, 10);
          } else {
            //console.log('unknown prop_name:', data);
          }
        } else {
          //console.log('unknown prop_name:', data);
        }
        store.dispatch(uploadBoxInfo(box))
      }
    });
  }
  if (port.name === 'version') {
    port.postMessage({
      type: 'bv',
      data: store.getState().version
    });
  }
});

const getToday = () => {
  const obj = new Date()
  return `${obj.getFullYear()}${obj.getMonth()}${obj.getDate()}`
}

const resetStat = (box, today) => {
  box.day = today
  box.box = 0
  box.zan = 0
  box.wen = 0
  box.song = 0
  box.silver = 0
}