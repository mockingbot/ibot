import React, { PureComponent } from 'react'

import { Root, Button, User, TeamName, AppName, WidgetName } from '../../components'

const shortName = 'Vincent'
const longName = 'Mitchell Vincent Pritchett'

class ToggleName extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isLong: props.isLong }
  }

  onToggle = () => this.setState({ isLong: !this.state.isLong })

  render() {
    const { isLong } = this.state
    const name = isLong ? longName : shortName

    return (
      <p>
        <User name={name} />
        {' '}
        <Button type="text" onClick={this.onToggle}>Toggle</Button>
      </p>
    )
  }
}

export default class EllipsisII extends PureComponent {
  render() {
    return (
      <Root>
        <style>
        {`#root { line-height: 1.5; }`}
        </style>

        <h2>User</h2>
        <p>
          <User name="Sir Thomas Wade" />
          <br />
          <User name="Her Majesty Elizabeth the Second, by the Grace of God of the United Kingdom of Great Britain and Northern Ireland and of Her other Realms and Territories Queen, Head of the Commonwealth, Defender of the Faith" />
          <br />
          <User name="María del Rosario Mercedes Pilar Martínez Molina Baeza" />
          <br />
          <User name="威妥瑪爵士" />
          <br />
          <User name="伊麗莎白二世陛下，蒙上帝恩典，大不列顛及北愛爾蘭聯合王國領地及海外領土的女王，信仰的守衛者" />
          <br />
          <User name="瑪麗亞・羅薩里奧・梅賽德斯・皮拉爾・馬丁內斯・莫利納・巴埃薩" />
          <br />
          <User id="mockingbot" to="/@mockingbot" />
          <br />
          <User id="AFairlyTallAndDarkAndLeanBot" to="/@AFairlyTallAndDarkAndLeanBot" />
          <br />
          <User id="墨刀" to="/@墨刀" />
          <br />
          <User id="很長很長很長很長的一個用戶ID" to="/@很長很長很長很長的一個用戶ID" />
          <br />
          <User email="support@modao.cc" />
          <br />
          <User email="very.very.very-long-email-id@mockingbot.com" />
        </p>

        <h3>Setting name, ID and email altogether</h3>
        <pre><code>
    {`<User
      {...{
        name: user.name,
        id: user.id,
        email: user.email,
      }}
    />`}
        </code></pre>

        <p>
          Should the name exist, display the name, <User name="John Doe" email="very.very.very-long-email-id@mockingbot.com" />
          <br />
          Then ID if name doesn’t exist, <User name={null} id="super.incredible.man_69" email="very.very.very-long-email-id@mockingbot.com" />
          <br />
          Finally fall back to email, <User name="" id="" email="superman@incredible.rocks" />
        </p>

        <p>
          有名字就顯示名字，<User name="張元一" email="very.very.very-long-email-id@mockingbot.com" />
          <br />
          沒有名字就顯示ID，<User name={null} id="zhangyuanyi" email="very.very.very-long-email-id@mockingbot.com" />
          <br />
          再沒有就顯示email，<User name="" id="" email="zhangyuanyi@mockingbot.com" />
        </p>

        <h3>Toggle</h3>
        <ToggleName />
        <ToggleName isLong={true} />

        <h2>Team</h2>
        <p>
          <TeamName name="MockingBot" />
          <br />
          <TeamName name="Beijing Sharpening Stone Ltd." />
          <br />
          <TeamName name="墨刀" />
          <br />
          <TeamName name="北京磨刀刻石科技有限公司" />
        </p>

        <h2>App</h2>
        <p>
          <AppName name="MockingBot" />
          <br />
          <AppName name="Sketch Plug-in of MockingBot on macOS" />
          <br />
          <AppName name="墨刀" />
          <br />
          <AppName name="［磨刀刻石］墨刀 Sketch 插件（macOS）" />
        </p>

        <h2>Widget</h2>
        <p>
          <WidgetName name="Search bar" />
          <br />
          <WidgetName name="MockingBot exclusive search bar [maroon]" />
        </p>
        <p>
          <WidgetName name="搜索栏" />
          <br />
          <WidgetName name="墨刀专用的深红色背景搜索栏" />
        </p>
      </Root>
    )
  }
}
