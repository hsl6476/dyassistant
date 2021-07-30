import { sleep } from '../utils/util'

export async function webpackModulesInit() {
  let num = 0
  while (!window.shark_room_jsonp) {
    num++
    if (num > 300)
      return
    await sleep(33)
  }
  return new Promise(e => {
    let n, r = "assiModule",
      o = ((n = {})[r] = function (t, n, r) {
        e({
          require: r,
          modules: r.c,
          defaultExports: r.n
        })
      }, n)
    window.shark_room_jsonp.push([
      [78622], o, [
        [r]
      ]
    ])
  })
}

export async function getWebpackModules(name) {
  let num = 0
  let flag = false
  while (!flag) {
    await sleep(33)
    num++
    if (!window.shark_room_jsonp_78622) continue
    if (window.shark_room_jsonp_78622.modules.hasOwnProperty(name)) return window.shark_room_jsonp_78622.modules[name].exports.default
    if (num > 300) return
  }
}

export async function getPlayerModules(name) {
  let num = 0
  let flag = false
  while (!flag) {
    await sleep(33)
    num++
    if (!window["shark-microlive-player-aside-jsonp-78622"]) continue
    if (window["shark-microlive-player-aside-jsonp-78622"].hasOwnProperty(name)) return window["shark-microlive-player-aside-jsonp-78622"][name].exports
    if (num > 300) return
  }
}