import React from 'react'
import { Avatar } from 'antd'
import { connect } from 'react-redux'
import { vsrsiondefault } from '@/store/constant'

const HeaderBar = (props) => {

  const toWb = () => {
    window.open(props.state.wb_url, "_blank")
  }

  const toRoom = ()=>{
    window.open(props.state.rm_url, "_blank")
  }

  return (
    <div className="header-wrapper">
      <div style={{cursor: "pointer"}} onClick={toRoom}>
        <Avatar size="large" src={props.state.bk_img} />
      </div>
      <label className="header-title">{props.state.xx_name}</label>
      <br />
      <a className="header-extra" href="#" onClick={toWb}>{props.state.by}</a>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: {
      ...vsrsiondefault,
      ...state.version
    }
  }
}


export default connect(mapStateToProps)(HeaderBar)