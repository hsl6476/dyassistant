import { TYPENAME } from '../constant'

const boxConfig = {
  box: 0,
  zan: 0,
  wen: 0,
  song: 0,
  silver: 0,
  day: null,
}

const settingConfig = {
  pickTreasure: false,
  pickSound: false,
  autoClose: false,
  boxFilter: 'all'
}

const vsrsionConfig = {
  bk_img: 'https://apic.douyucdn.cn/upload/avatar_v3/201807/dca3c7ece148ee546d611ed0815fbbd0_middle.jpg',
  by: '\u4e8c\u73c2\u0043\u0068\u006c\u006f\u0065',
  xx_name: '斗鱼助手 2.1.0',
  version: '2.2.0',
  wb_url: 'https://weibo.com/u/1910672761',
  rm_url:'https://www.douyu.com/78622'
}

export const box = (state = boxConfig, action) => {
  const { type, payload } = action
  switch (type) {
    case TYPENAME.UPLOAD_BOX_INFO:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export const setting = (state = settingConfig, action) => {
  const { type, payload } = action
  switch (type) {
    case TYPENAME.UPLOAD_SETTING_INFO:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export const version = (state = vsrsionConfig, action) => {
  const { type, payload } = action
  switch (type) {
    case TYPENAME.UPLOAD_VERSION_INFO:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}