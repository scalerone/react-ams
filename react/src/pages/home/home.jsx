import React, {Component} from 'react'
import {
  Icon,
  Card,
  DatePicker,
  Timeline
} from 'antd'

import './home.less'

const dateFormat = 'YYYY/MM/DD'
const {RangePicker} = DatePicker

export default class Home extends Component {

  state = {
    isVisited: true
  }

  handleChange = (isVisited) => {
    return () => this.setState({isVisited})
  }

  render() {
    const {isVisited} = this.state

    return (
      <div className='home'>

          <Card title='任务' extra={<Icon type="reload"/>} className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">完成后台界面设计初版</Timeline.Item>
              <Timeline.Item color="green">登录迭代</Timeline.Item>
              <Timeline.Item color="green">基础UI组件</Timeline.Item>
              <Timeline.Item color="green">公共组件</Timeline.Item>
              <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>其他功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Timeline.Item>
            </Timeline>
          </Card>

      </div>
    )
  }
}