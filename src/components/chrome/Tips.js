import React from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { uploadBoxInfo, uploadSettingInfo } from '@/store/action/extend'
import { boxdefault, settingdefault } from '@/store/constant'

const Tips = (props) => {

  return (
    <div>
      <Modal title="新版本已经发布，请更新" visible={false} closable={false} footer={null} style={{ top: 30 }}>
        <div>最新版本:2.2.0</div>
        <div>
          下载地址：<a href="#">crx下载</a
          >&nbsp;
          <a href="#" >zip下载</a>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tips)