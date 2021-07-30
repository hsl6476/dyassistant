import { EventEmitter } from 'events'
import axios from '@/utils/http'

class MuteLibs extends EventEmitter {
  constructor() {
    super()
    this.mute_rules = null
    this.mute_count = 0
    this.chat_mute_flag = false
    this.mute_model = 0
    this.cp = false
  }

  mute_msg_rules(str) {
    let rules_s = this.trimSpace(str.split('\n')),
      rules = []
    for (let i = 0; i < rules_s.length; i++) {
      let map = {}
      let s = rules_s[i].split('~')
      let date = this.repdate(s[3])
      if (s[0].startsWith('regex:')) {
        map.key = new RegExp(s[0].replace('regex:', ''))
      } else {
        map.key = s[0].replace(/\s+/g, "").toLowerCase()
      }
      if (!!s[1]) {
        map.lv = Number(s[1])
      } else {
        map.lv = 10
      }
      map.date = this.repdate(s[2])

      rules.push(map)
    }
    return rules
  }

  repdate(str) {
    try {
      if (!!str) {
        if (str.endsWith('h'))
          str = Number(str.substr(0, str.length - 1)) * 60 * 60
        else if (str.endsWith('m'))
          str = Number(str.substr(0, str.length - 1)) * 60
        else
          str = Number(str) * 24 * 60 * 60
      } else {
        str = 360 * 24 * 60 * 60
      }
    } catch (e) {
      str = 360 * 24 * 60 * 60
    }
    return str
  }

  chatmsg_mute() {
    let { room, user } = window.socketProxy.info
    let t = this
    window.socketProxy.socketStream.subscribe("chatmsg", function (e) {
      const { nn, rg, uid, txt, level, brid } = e
      if (t.chat_mute_flag) {
        if ((t.cp && brid == room.roomId) || rg == '4' || user.userId == uid) {
          return
        }
        const content = txt.replace(/\s+/g, "").toUpperCase()
        for (let i = 0; i < t.mute_rules.length; i++) {
          if (t.checkMute(t.mute_rules[i], content, level)) {
            if (t.mute_model == 0)
              t.muteUser(user.userId, uid, t.mute_rules[i].date, room.roomId, nn, content)
            else if (t.mute_model == 1)
              t.muteUser2(nn, room.roomId, t.mute_rules[i].date / 60, content, true)
            break
          }
        }
      }
    })
  }

  checkMute(map, value, level) {
    try {
      if (map.lv < level)
        return false

      if (typeof map.key == 'string') {
        if (value.indexOf(map.key) != -1) {
          return true
        }
      } else {
        if (map.key.test(value)) {
          return true
        }
      }
    } catch (e) {
      return false
    }
    return false
  }

  async muteUser(uuid, uid, limittime, roomId, name, content) {
    const r = {
      type: "newblackreq",
      uid: uid,
      oid: uuid,
      otype: 1,
      rid: roomId,
      blacktype: 1,
      limittime: limittime,
      reason: 5
    }
    window.socketProxy.sendMessage(r)
    let msg = '用户:' + name + '已被禁言' + limittime / 60 + '分钟' + '弹幕:' + content
    this.emit('mute_user_info', msg)
  }

  async muteUser2(name, room_id, time, content, flag) {
    let data = { "ban_nickname": name, "room_id": room_id, "ban_time": time, "reason": 5 }
    axios.post('https://www.douyu.com/room/roomSetting/addMuteUser', data).then(res => {
      let t = res.data
      if (t.error == 1) {
        let msg = '用户:' + name + '已被禁言' + time + '分钟' + '弹幕:' + content
        if (flag) {
          this.emit('mute_user_info', msg)
        } else {
          PlayerDialog.container.registry.store.dispatch({
            type: "USERCARD_RECEIVE_CARD_DATA",
            payload: { isVisible: !1 }
          })
        }
      }
    })
  }

  trimSpace(arr) {
		return arr.filter(function (s) {
		    return s && s.trim()
		});
	}

  mute(ruleStr, model, cp) {
    try {
      this.mute_model = Number(model)
      this.mute_rules = this.mute_msg_rules(ruleStr)
      this.cp = cp
      this.chat_mute_flag = true
      if (this.mute_count == 0) {
        this.mute_count = 1
        this.chatmsg_mute()
      }
    } catch (e) {
      console.log(e)
    }
  }

  mute_stop() {
    this.chat_mute_flag = false
  }
  
}

export default new MuteLibs