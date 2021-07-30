import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const Reward = () => {

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="支付宝红包" key="1" className="12345">
          <div class="alipay-wrapper">
            <img
              src="https://dy.colrose.cn/static/img/alihb.png"
            />
          </div>
        </TabPane>
        <TabPane tab="打赏(支付宝)" key="2">
          <div class="alipay-wrapper">
            <img
              src="https://dy.colrose.cn/static/img/alipay.jpg"
            />
          </div>
        </TabPane>
        <TabPane tab="打赏(微信)" key="3">
          <div class="alipay-wrapper">
            <img
              src="https://dy.colrose.cn/static/img/zan_weixin.jpg"
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}



export default Reward