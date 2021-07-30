import React from 'react'
import { Switch, Collapse, Select } from 'antd'
import { connect } from 'react-redux'
import { uploadBoxInfo, uploadSettingInfo } from '@/store/action/extend'
import { boxdefault, settingdefault } from '@/store/constant'

const { Panel } = Collapse
const { Option } = Select

const Setup = (props) => {

  const changeStatus = (c, e) => {
    let name = e.target.id ? e.target.id : e.target.offsetParent.id
    props.uploadSettingInfo({ [name]: c })
  }

  const handleChange = (v) => {
    props.uploadSettingInfo({ boxFilter: v })
  }

  const handleChangeBarrage = (v) => {
    props.uploadSettingInfo({ nobleBarrage: v })
  }

  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1']} style={{ backgroundColor: "transparent", marginLeft: "-15px", marginRight: "-15px", marginTop: "-18px" }} expandIconPosition="right">
        <Panel header="宝箱设置" key="1" style={{ fontSize: 16 }}>
          <div className="row">
            <div className="col_5 row-title div-color">宝箱提醒音效</div>
            <div className="col_5">
              <Switch id="pickSound" checkedChildren="开启" unCheckedChildren="关闭" size="small" style={{ marginTop: -4 }}
                checked={props.setting.pickSound} onChange={changeStatus} />
            </div>
          </div>
          <div className="row margin_top_10">
            <div className="col_5 row-title div-color">自动关闭网页</div>
            <div className="col_5">
              <Switch id="autoClose" checkedChildren="开启" unCheckedChildren="关闭" size="small" style={{ marginTop: -4 }}
                checked={props.setting.autoClose} onChange={changeStatus} />
            </div>
          </div>
          <div className="row margin_top_10">
            <div className="col_5 row-title div-color">宝箱过滤</div>
            <div className="col_5">
              <Select defaultValue={props.setting.boxFilter} size="small" style={{ width: 120 }} onChange={handleChange}>
                <Option value="all">全部</Option>
                <Option value="100">只要飞机</Option>
                <Option value="101">火箭及以上</Option>
              </Select>
            </div>
          </div>
        </Panel>
        <Panel header="斗鱼设置" key="2" style={{ fontSize: 16 }}>
          <div className="row">
            <div className="col_5 row-title div-color">屏蔽直播间广告</div>
            <div className="col_5">
              <Switch id="closePoster" checkedChildren="开启" unCheckedChildren="关闭" size="small" style={{ marginTop: -4 }}
                checked={props.setting.closePoster} onChange={changeStatus} />
            </div>
          </div>
          <div className="row margin_top_10">
            <div className="col_5 row-title div-color">禁止下播跳转</div>
            <div className="col_5">
              <Switch id="prohibitJump" checkedChildren="开启" unCheckedChildren="关闭" size="small" style={{ marginTop: -4 }}
                checked={props.setting.prohibitJump} onChange={changeStatus} />
            </div>
          </div>
          <div className="row margin_top_10">
            <div className="col_5 row-title div-color">贵族弹幕</div>
            <div className="col_5">
              <Select defaultValue={props.setting.nobleBarrage} size="small" style={{ width: 100 }} onChange={handleChangeBarrage}>
                <Option value="0">关闭</Option>
                <Option value="3">伯爵</Option>
                <Option value="4">公爵</Option>
                <Option value="5">国王</Option>
                <Option value="8">超级皇帝</Option>
                <Option value="9">幻神</Option>
              </Select>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    box: {
      ...boxdefault,
      ...state.box
    },
    setting: {
      ...settingdefault,
      ...state.setting
    }
  }
}

const mapDispatchToProps = { uploadBoxInfo, uploadSettingInfo }

export default connect(mapStateToProps, mapDispatchToProps)(Setup)