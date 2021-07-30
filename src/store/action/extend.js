import { TYPENAME } from '../constant'

export const uploadBoxInfo = (params) => {
  return {
    type: TYPENAME.UPLOAD_BOX_INFO,
    payload: params
  }
}


export const uploadSettingInfo = (params) => {
  return {
    type: TYPENAME.UPLOAD_SETTING_INFO,
    payload: params
  }
}

export const uploadVersionInfo = (params) => {
  return {
    type: TYPENAME.UPLOAD_VERSION_INFO,
    payload: params
  }
}