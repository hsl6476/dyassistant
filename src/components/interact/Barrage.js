import { Switch, Checkbox, Input } from 'antd'
// import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import barragelibs from '@/inject/modules/barragelibs'
import { store } from '@/store/roomIndex'
import uploadInfo from '@/store/action/room'
import { roomdefault } from '@/store/constant'

const { TextArea } = Input

barragelibs.on('barrage_stop', () => {
  store.dispatch(uploadInfo({ barrage_status: false }))
})

const Barrage = (props) => {
  const changeStatus = (c, e) => {
    if (props.state.barrage_info == '') return
    props.uploadInfo({ barrage_status: c })
    if (c) barragelibs.barrageInit(props.state.barrage_info, props.state.barrage_loop, props.state.barrage_colour, props.state.barrage_time, props.state.barrage_num)
    else barragelibs.stop_send()
  }

  const onChange = (e) => {
    const name = e.target.id
    const value = (e.target.id == 'barrage_loop' || e.target.id == 'barrage_colour') ? e.target.checked : e.target.value
    props.uploadInfo({ [name]: value })
  }

  return (
    <div>
      <div className="row">
        <div className="col_5">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" size="small"
            checked={props.state.barrage_status} onChange={changeStatus} />
        </div>
        <div className="col_5">
          <Checkbox id="barrage_loop" defaultChecked={props.state.barrage_loop} onChange={onChange}>循环弹幕</Checkbox>
        </div>
        <div className="col_5">
          <Checkbox id="barrage_colour" defaultChecked={props.state.barrage_colour} onChange={onChange}>彩色弹幕</Checkbox>
        </div>
      </div>
      <div className="row margin_top_10">
        <div className="col_5">
          <label style={{ "fontSize": "14px" }}>间隔时间:</label>
          <Input id="barrage_time" defaultValue={props.state.barrage_time} placeholder="默认 5s"
            size="small" style={{ "width": "80px" }} onChange={onChange} />
        </div>
        <div className="col_5">
          <label style={{ "fontSize": "14px" }}>发送条数:</label>
          <Input id="barrage_num" defaultValue={props.state.barrage_num} placeholder="默认 无限"
            size="small" style={{ "width": "80px" }} onChange={onChange} />
        </div>
      </div>
      <div className="row margin_top_10">
        <TextArea id="barrage_info" defaultValue={props.state.barrage_info}
          placeholder="弹幕内容...  多条弹幕用回车换行... 发送条数默认无限..." rows={4} onChange={onChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Barrage)