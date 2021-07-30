import React from 'react'
import HeaderBar from './HeaderBar'
import { Tabs } from 'antd'
import Box from './Box'
import Setup from './Setup'
import Tips from './Tips'
import Reward from './Reward'

const { TabPane } = Tabs

const App = () => {

  return (
    <div id="app">
      <div className="home-wrapper r-box">
        <HeaderBar />
        <Tabs defaultActiveKey="1">
          <TabPane tab="宝箱" key="1">
            <Box />
          </TabPane>
          <TabPane tab="设置" key="2">
            <Setup />
          </TabPane>
          <TabPane tab="打赏" key="3">
            <Reward />
          </TabPane>
        </Tabs>
        <Tips />
      </div>
    </div>
  )
}

export default App