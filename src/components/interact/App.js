import React, { useState } from 'react'
import { Tabs } from 'antd'
// import { hot } from 'react-hot-loader/root'
// import Barrage from './Barrage2'
// const Barrage = require('./Barrage2')
import Barrage from './Barrage'
import RoomMange from './Roommanage'

const { TabPane } = Tabs

const App = () => {
  const [flag, setFlag] = useState(false)

  const onClick = () => {
    setFlag(!flag)
  }

  const changeState = (e) => {
    setBarrage_state(e)
  }

  const changeIsRoomAdmin = () => {
    const { isRoomAdmin } = window.PlayerAsideApp.container.registry.store.getState().userRoleData
    return isRoomAdmin ? (
      <TabPane tab="房管禁言" key="2">
        <RoomMange />
      </TabPane>
    ) : null
  }

  const showPanel = () => {
    return flag ? (
      <div className="sai7ewq-90li">
        <div className="c781op-78gts">
          <div className="c781op-78gtsInner"></div>
        </div>
        <div className="home-wrapper">
          <Tabs defaultActiveKey="1" className="xx-tabs">
            <TabPane tab="自动弹幕" key="1" className="12345">
              <Barrage refChange={changeState} />
            </TabPane>
            {changeIsRoomAdmin()}
          </Tabs>
        </div>
      </div>
    ) : null

  }

  return (
    <div>
      <div className="c15qfm-45ygf" onClick={onClick}>互动</div>
      {showPanel()}
    </div>
  )
}

export default App
// export default hot(App)