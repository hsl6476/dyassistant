import React from 'react'
import { Switch, Card } from 'antd'
import { connect } from 'react-redux'
import { uploadBoxInfo, uploadSettingInfo } from '@/store/action/extend'
import { boxdefault, settingdefault } from '@/store/constant'

const Box = (props) => {
  const { zan, wen, song, silver, day, box } = props.box

  const totalValue = () => {
    return (zan + wen + song) * 100 + silver
  }

  const getToday = () => {
    const obj = new Date()
    return `${obj.getFullYear()}${obj.getMonth()}${obj.getDate()}`
  }

  const checkBox = () => {
    if (getToday() != day) return false
    return true
  }

  const flag = checkBox()
  const boxTitle = (flag && box > 0) ? `今日已捡${box}个宝箱` : "今天空空如也~"
  const boxExtra = (flag && totalValue() > 0) ? `总价值${totalValue()}鱼丸` : ""

  !flag && (zan = wen = song = silver = 0)

  const changeStatus = (c, e) => {
    props.uploadSettingInfo({ pickTreasure: c })
  }

  return (
    <div>
      <div className="row">
        <div className="col_4 row-title div-color">自动捡起宝箱</div>
        <div className="col_5">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" size="small" style={{ marginTop: -4 }}
            checked={props.setting.pickTreasure} onChange={changeStatus} />
          <i className="icon-button el-icon-s-tools" ></i>
        </div>
      </div>
      <div className="row margin_top_10">
        <Card title={boxTitle} extra={boxExtra} style={{ width: 270 }} size="small">
          <div className="row-2">
            <div className="pic-wrapper">
              <img
                className="pic"
                src="https://gfs-op.douyucdn.cn/dygift/1606/ecb0d4c424ff0bafbf4ba52a3284268b.png"
              />
              <div className="count">{zan}</div>
            </div>
            <div className="pic-wrapper margin_left_20">
              <img
                className="pic"
                src="https://gfs-op.douyucdn.cn/dygift/1612/9e8e5a8a3c442933926d877d62b08b1b.png"
              />
              <div className="count">{wen}</div>
            </div>
            <div className="pic-wrapper margin_left_20">
              <img
                className="pic"
                src="https://gfs-op.douyucdn.cn/dygift/1704/2f2d56c74487baaffd52e5c21c62b65e.png"
              />
              <div className="count">{song}</div>
            </div>
            <div className="pic-wrapper margin_left_20">
              <div className="no-pic"><span>丸</span></div>
              <div className="count">{silver}</div>
            </div>
          </div>
        </Card>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Box)