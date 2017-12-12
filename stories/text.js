import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Button from '../packages/button/index'
import { Textarea } from '../packages/form/index'
import {
  Tooltip, EllipsisSpan, EllipsisParagraph,
  User, TeamName, AppName, WidgetName,
} from '../packages/text/index'

storiesOf('Text', module)
.add('Tooltip', () => <TooltipExample />)
.add('Ellipsis I', () => (
  <Root>
    <style>
    {`#root { line-height: 1.5; }`}
    </style>

    <h2>Max</h2>
    <h3>Three ems</h3>
    <p>
      <EllipsisSpan max={4}>墨刀是？</EllipsisSpan>
      <br />
      <EllipsisSpan max={4}>墨刀是一家有企业社会责任感的公司，对校园机构、学生社团和公益项目等方面格外关注！</EllipsisSpan>
    </p>

    <h3>100px</h3>
    <p>
      <EllipsisSpan max="100px">墨刀是？</EllipsisSpan>
      <br />
      <EllipsisSpan max="100px">墨刀是一家有企业社会责任感的公司，对校园机构、学生社团和公益项目等方面格外关注！</EllipsisSpan>
    </p>

    <h2>Types</h2>
    <ul>
      <li>User: <EllipsisSpan type="user">Zhang Yuanyi</EllipsisSpan></li>
      <li>User: <EllipsisSpan type="user">Addison Forbes Montgomery-Shepherd</EllipsisSpan></li>
      <li>Email: <EllipsisSpan type="email">addison.f.montgomery@private.practice</EllipsisSpan></li>
      <li>Email: <EllipsisSpan type="email">barack@obama.org</EllipsisSpan></li>
      <li>ID: <EllipsisSpan type="id">@realDonaldTrump</EllipsisSpan></li>
      <li>ID: <EllipsisSpan type="id">@theWallStreetJournal</EllipsisSpan></li>
      <li>…</li>
    </ul>

    <h2>Display</h2>
    <ul>
      <li>
        <code>inline-block</code>:
        {' '}
        <EllipsisSpan display="inline-block" max="5">ABCDEFGHIJKLMNOPQRSTUVWXYZ</EllipsisSpan>
      </li>

      <li>
        <code>block</code>:
        {' '}
        <EllipsisSpan display="block" max="5">ABCDEFGHIJKLMNOPQRSTUVWXYZ</EllipsisSpan>
      </li>
    </ul>

    <h2>Links</h2>
    <p>
      <EllipsisSpan max="10" target="_blank" to="https://modao.cc">modao.cc</EllipsisSpan>
      <br />
      <EllipsisSpan max="10" target="_blank" to="https://mockingbot.com">mockingbot.com</EllipsisSpan>
      <br />
      <EllipsisSpan max="10" target="_blank" to="https://pro.modao.cc/posts/8177">pro.modao.cc/posts/8177</EllipsisSpan>
      <br />
      <EllipsisSpan max="10" target="_blank" to="https://mockingbot.com/posts/run-puppeteer-chrome-headless-on-ec2-amazon-linux">mockingbot.com/posts/run-puppeteer-chrome-headless-on-ec2-amazon-linux</EllipsisSpan>
    </p>

    <h2>Tooltip or not</h2>
    <ul>
      <li>With: <EllipsisSpan max="8">Lick The Palm Of The Burning Handshake</EllipsisSpan></li>
      <li>With: <EllipsisSpan max="8" noTooltip={false}>Lick The Palm Of The Burning Handshake</EllipsisSpan></li>
      <li>Without: <EllipsisSpan max="8" noTooltip>Lick The Palm Of The Burning Handshake</EllipsisSpan></li>
      <li>Without: <EllipsisSpan max="8" noTooltip={true}>Lick The Palm Of The Burning Handshake</EllipsisSpan></li>
    </ul>
 </Root>
))
.add('Ellipsis II', () => (
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
))

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

class TooltipExample extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isArrowed: true }
  }

  toggle = () => this.setState({ isArrowed: !this.state.isArrowed })

  render() {
    const { isArrowed } = this.state

    return (
      <Root>
        <Button
          type="primary"
          style={{ position: 'fixed', right: '1em', top: '1em' }}
          onClick={this.toggle}
        >
          Arrowed: { isArrowed ? 'YES' : 'NO' }
        </Button>

        <style>
        {`
          .Tip .icon { margin: 0 .25em; font-size: 1.1em; vertical-align: -.1em; }
          .ul-tip ul { margin: 0; padding-left: 1.5em; }
          p.three { display: flex; justify-content: space-between; }

          p.button { display: flex; align-items: center; }
          p.button .Tooltip { margin-right: .5em; }
          button .icon { margin-right: .5em; font-size: 1.1em; vertical-align: -.05em; }
        `}
        </style>

        <h2>Tips with regular nodes</h2>
        <p>
          <Tooltip arrowed={isArrowed} content="How you greet in English.">Hello</Tooltip>
          <br />
          <Tooltip arrowed={isArrowed} content={['The apple of Rachel’s ', <Icon name="eye" key="icon" />]}><span>Ross</span></Tooltip>
          <br />
          <Tooltip
            arrowed={isArrowed}
            id="tt_test"
            content={<ul><li>LOL</li><li>233</li><li>www</li><li>廠廠</li><li>555</li></ul>}
            tipClassName="ul-tip"
          >
            <span>Laughters</span> of the <span>World</span>
          </Tooltip>
        </p>

        <h2>Flexible positioning</h2>
        <h3>On top</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="top" content="漢語的問候方式">你好</Tooltip>
          <Tooltip arrowed={isArrowed} position="top" content="漢語的問候方式">你好</Tooltip>
          <Tooltip arrowed={isArrowed} position="top" content="漢語的問候方式">你好</Tooltip>
        </p>

        <h3>On left</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="left" content="How to laugh subculturally in Chinese">233</Tooltip>
          <Tooltip arrowed={isArrowed} position="left" content="How to laugh subculturally in Chinese">233</Tooltip>
          <Tooltip arrowed={isArrowed} position="left" content="How to laugh subculturally in Chinese">233</Tooltip>
        </p>

        <h3>On right</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="right" content="How to laugh subculturally in English">LOL</Tooltip>
          <Tooltip arrowed={isArrowed} position="right" content="How to laugh subculturally in English">LOL</Tooltip>
          <Tooltip arrowed={isArrowed} position="right" content="How to laugh subculturally in English">LOL</Tooltip>
        </p>

        <h3>On bottom</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="bottom" inflexible={false} content="How to laugh subculturally in Thai">555</Tooltip>
          <Tooltip arrowed={isArrowed} position="bottom" inflexible={false} content="How to laugh subculturally in Thai">555</Tooltip>
          <Tooltip arrowed={isArrowed} position="bottom" inflexible={false} content="How to laugh subculturally in Thai">555</Tooltip>
        </p>

        <h2>Inflexible positioning</h2>
        <h3>On top</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="top" inflexible={true} content="How to luagh subculturally in Chinese">廠廠</Tooltip>
          <Tooltip arrowed={isArrowed} position="top" inflexible={true} content="How to luagh subculturally in Chinese">廠廠</Tooltip>
          <Tooltip arrowed={isArrowed} position="top" inflexible={true} content="How to luagh subculturally in Chinese">廠廠</Tooltip>
        </p>

        <h3>On left</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="left" inflexible content="How to laugh subculturally in Japanese">www</Tooltip>
          <Tooltip arrowed={isArrowed} position="left" inflexible content="How to laugh subculturally in Japanese">www</Tooltip>
          <Tooltip arrowed={isArrowed} position="left" inflexible content="How to laugh subculturally in Japanese">www</Tooltip>
        </p>

        <h3>On right</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="right" inflexible content="How to laugh in Español">Jaja</Tooltip>
          <Tooltip arrowed={isArrowed} position="right" inflexible content="How to laugh in Español">Jaja</Tooltip>
          <Tooltip arrowed={isArrowed} position="right" inflexible content="How to laugh in Español">Jaja</Tooltip>
        </p>

        <h3>On bottom</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} position="bottom" inflexible content="How to laugh in Korean">ㅎㅎㅎ</Tooltip>
          <Tooltip arrowed={isArrowed} position="bottom" inflexible content="How to laugh in Korean">ㅎㅎㅎ</Tooltip>
          <Tooltip arrowed={isArrowed} position="bottom" inflexible content="How to laugh in Korean">ㅎㅎㅎ</Tooltip>
        </p>

        <h2>Tips with regular nodes</h2>
        <p>
          <Tooltip arrowed={isArrowed} content="Am an idiot sandwich." position="left">What are you?</Tooltip>
        </p>

        <p className="button">
          <Tooltip
            arrowed={isArrowed}
            content="三维/三D/three dimensional"
            position="left"
            duration={2000}
          >
            <Button type="primary" icon="cube">3D</Button>
          </Tooltip>

          <Tooltip
            arrowed={isArrowed}
            content={{
              hover: '点选复制一个神祕的东西送你哟～',
              click: '已复制！',
            }}
            position="right"
          >
            <Button type="primary" icon="mobile-copy-link">点我复制</Button>
          </Tooltip>

          <Tooltip
            arrowed={isArrowed}
            content={{ click: '已复制！' }}
            duration={1000}
            position="right"
          >
            <Button type="primary" icon="mobile-copy-link">点我复制</Button>
          </Tooltip>
        </p>

        <Tooltip
          arrowed={isArrowed}
          type="block"
          content={<ul><li>LOL</li><li>233</li><li>www</li><li>廠廠</li><li>555</li></ul>}
          tipClassName="ul-tip"
          position="left"
        >
          <Textarea defaultValue={
    `- LOL
    - 233
    - 廠廠
    - www
    - 555`}
          />
        </Tooltip>
      </Root>
    )
  }
}
