import { TYPENAME } from '../constant'

const roomConfig = {
  roomList: {}
}

export default function room(state = roomConfig, action) {
  const { type, payload, roomId } = action
  switch (type) {
    case TYPENAME.UPLOAD_ROOM_INFO:
      return {
        ...state,
        roomList: {
          ...state.roomList,
          [roomId]: {
            ...state.roomList[roomId],
            ...payload
          }

        }
      }
    default:
      return state
  }
}