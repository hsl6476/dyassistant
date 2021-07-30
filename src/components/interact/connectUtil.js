import { connect } from 'react-redux'
import uploadInfo from '../../store/action/room'
import {roomdefault} from '../../store/constant'

const mapStateToProps = (state) => {
  return {
    state: {
      ...roomdefault,
      ...state.room.roomList[window.test]
    }
  }
}

const mapDispatchToProps = {uploadInfo}

export const connects = (compt) => connect(mapStateToProps, mapDispatchToProps)(compt)