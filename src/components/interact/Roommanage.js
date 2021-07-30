import { Switch, Button, Select, Checkbox, Input, notification } from 'antd'
import { connect } from 'react-redux'
import uploadInfo from '@/store/action/room'
import { roomdefault } from '@/store/constant'
import mutelibs from '../../inject/modules/mutelibs'
import { store } from '@/store/roomIndex'

const { Option } = Select
const { TextArea } = Input

mutelibs.on('mute_user_info', (e) => {
  let info = store.getState().room.roomList[window.socketProxy.info.room.roomId].mute_user
  let mute_info = info ? info : ''
  store.dispatch(uploadInfo({ mute_user: mute_info + e + "\n" }))
})

const RoomMange = (props) => {

  const changeStatus = (c, e) => {
    if (props.state.mute_rules == '') return
    props.uploadInfo({ mute_status: c })
    if (c) mutelibs.mute(props.state.mute_rules, props.state.mute_model, props.state.mute_cp_checked)
    else mutelibs.mute_stop()
  }

  const onChange = (e) => {
    const name = e.target.id
    const value = e.target.id == 'mute_cp_checked' ? e.target.checked : e.target.value
    props.uploadInfo({ [name]: value })
  }

  const handleChange = (v) => {
    props.uploadInfo({ mute_model: v })
  }

  const openNotification = () => {
    notification.open({
      message: '规则提示',
      description:
        '封禁规则: 关键字~用户等级~封禁时间 -- 每条规则换行 -- 用户等级大于设置等级将自动忽略,封禁时间纯数字表示天,以h结尾表示小时,以m结尾表示分钟 用户等级默认10, 封禁时间默认360 -- 当关键字以regex:开头表示以正则匹配 -- 勾选粉丝牌免禁则全部忽略 -- 强制模式聊天列表不显示禁言信息',
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col_5">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" size="small" checked={props.state.mute_status} onChange={changeStatus} />
        </div>
        <div className="col_5">
          <Button type="primary" size="small" onClick={openNotification}>禁言说明</Button>
        </div>
      </div>
      <div className="row margin_top_10">
        <div className="col_5">
          <label style={{ "fontSize": "14px" }}>模式:</label>
          <Select defaultValue={props.state.mute_model} style={{ width: 120 }} size="small" onChange={handleChange}>
            <Option value={0}>常规模式</Option>
            <Option value={1}>强制模式</Option>
          </Select>
        </div>
        <div className="col_5">
          <Checkbox id="mute_cp_checked" defaultChecked={props.state.mute_cp_checked} onChange={onChange}>粉丝牌免禁</Checkbox>
        </div>
      </div>
      <div className="row margin_top_10">
        <TextArea id="mute_rules" value={props.state.mute_rules} placeholder="注意规则格式，否则可能出错..." rows={4} onChange={onChange} />
      </div>
      <div className="row margin_top_10">
        <TextArea id="mute_user" value={props.state.mute_user} placeholder="封禁列表" onChange={onChange} rows={3} />
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    state: {
      ...roomdefault,
      ...state.room.roomList[window.socketProxy.info.room.roomId]
    }
  }
}

const mapDispatchToProps = { uploadInfo }

export default connect(mapStateToProps, mapDispatchToProps)(RoomMange)