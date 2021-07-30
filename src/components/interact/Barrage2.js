import React from 'react'
import { Switch, Checkbox, Input } from 'antd'
import { connect } from 'react-redux'
// import { hot } from 'react-hot-loader/root'
import uploadInfo from '../../store/action/room'
import 'antd/dist/antd.css'

const { TextArea } = Input

// @connect(
//   state => {return {state: state.barrage.roomList[window.test]}},   // 拿到redux中use部分
//   {uploadInfo}
// )
class Barrage extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
  }

  changeStatus = (c, e) => {
    console.log(c)
    this.props.uploadInfo({ barrage_status: c })
  }

  onChange = (e) => {
    let info;
    switch (e.target.id) {
      case 'loop':
        info = { barrage_loop: e.target.checked }
        break
      case 'colour':
        info = { barrage_colour: e.target.checked }
        break
      case 'time':
        console.log(e.target.value)
        info = { barrage_time: e.target.value }
        break
      case 'num':
        info = { barrage_num: e.target.value }
        break
      case 'info':
        info = { barrage_info: e.target.value }
        break
      default:
        return
    }
    this.props.uploadInfo(info)
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col_5">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" size="small"
              defaultChecked={this.props.state.barrage_status} onChange={this.changeStatus} />
            <label>{this.props.state.barrage_status}</label>
            <div className="col_5">
              <Checkbox id="loop" defaultChecked={this.props.state.barrage_loop} onChange={this.onChange}>循环弹幕</Checkbox>
            </div>
            <div className="col_5">
              <Checkbox id="colour" defaultChecked={this.props.state.barrage_colour} onChange={this.onChange}>彩色弹幕</Checkbox>
            </div>
          </div>
        </div>
        <div className="row margin_top_10">
          <div className="col_5">
            <label style={{ "fontSize": "14px" }}>间隔时间:</label>
            <Input id="time" defaultValue={this.props.state.barrage_time} placeholder="默认 5s"
              size="small" style={{ "width": "80px" }} onChange={this.onChange} />
          </div>
          <div className="col_5">
            <label style={{ "fontSize": "14px" }}>发送条数:</label>
            <Input id="num" defaultValue={this.props.state.barrage_num} placeholder="默认 无限"
              size="small" style={{ "width": "80px" }} onChange={this.onChange} />
          </div>
        </div>
        <div className="row margin_top_10">
          <TextArea id="info" defaultValue={this.props.state.barrage_info == '' ? '' : 111}
            placeholder="弹幕内容...  多条弹幕用回车换行... 发送条数默认无限..." rows={4} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

export default Barrage