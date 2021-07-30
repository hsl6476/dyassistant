import { TYPENAME } from '../constant'

export default function uploadInfo(params, id) {
  return {
    type: TYPENAME.UPLOAD_ROOM_INFO,
    payload: params,
    roomId: window.socketProxy.info.room.roomId
  }
}