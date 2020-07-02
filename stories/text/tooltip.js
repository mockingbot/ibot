import React, { PureComponent } from 'react'

import Root from '../components/root'
import Button from '../../components/button'
import { Textarea } from '../../components/input'
import Icon from '../../components/icon'
import Tooltip from '../../components/tooltip'
import { CoreTooltip } from '../components/Ellipsis'

export default class TooltipExample extends PureComponent {
  state = {
    isArrowed: true,
    isPlain: true,
  }

  toggle = () => this.setState({ isArrowed: !this.state.isArrowed })

  toggleTheme = () => this.setState({ isPlain: !this.state.isPlain })

  render () {
    const { isArrowed, isPlain } = this.state
    const theme = isPlain ? 'plain' : 'core'

    return (
      <Root>
        <div style={{ position: 'fixed', right: '1em', top: '1em' }}>
          <Button
            type="primary"
            style={{ marginRight: '.5em' }}
            onClick={this.toggleTheme}
          >
            Theme: { isPlain ? 'plain' : 'core' }
          </Button>

          <Button
            type="primary"
            onClick={this.toggle}
          >
            Arrowed: { isArrowed ? 'YES' : 'NO' }
          </Button>
        </div>

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
          <Tooltip arrowed={isArrowed} theme={theme} content="How you greet in English.">Hello</Tooltip>
          <br />
          <Tooltip arrowed={isArrowed} theme={theme} content={null}>Null</Tooltip>
          <br />
          <Tooltip arrowed={isArrowed} theme={theme} content={['The apple of Rachel’s ', <Icon name="eye" key="icon" />]}><span>Ross</span></Tooltip>
          <br />
          <Tooltip
            arrowed={isArrowed} theme={theme}
            id="tt_test"
            content={<ul><li>LOL</li><li>233</li><li>www</li><li>廠廠</li><li>555</li></ul>}
            tipClassName="ul-tip"
          >
            <span>Laughters</span> of the <span>World</span>
          </Tooltip>
        </p>

        <h2>Plain Tooltip</h2>
        <p>
          <Tooltip content="LOL">Plain Tooltip</Tooltip>
        </p>

        <h2>Core Tooltip</h2>
        <p>
          <CoreTooltip content="LOL">Core Tooltip</CoreTooltip>
        </p>

        <h2>Flexible positioning</h2>
        <h3>On top</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="top" content="漢語的問候方式">你好</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="top" content="漢語的問候方式">你好</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="top" content="漢語的問候方式">你好</Tooltip>
        </p>

        <h3>On left</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="left" content="How to laugh subculturally in Chinese">233</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="left" content="How to laugh subculturally in Chinese">233</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="left" content="How to laugh subculturally in Chinese">233</Tooltip>
        </p>

        <h3>On right</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="right" content="How to laugh subculturally in English">LOL</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="right" content="How to laugh subculturally in English">LOL</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="right" content="How to laugh subculturally in English">LOL</Tooltip>
        </p>

        <h3>On bottom</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="bottom" inflexible={false} content="How to laugh subculturally in Thai">555</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="bottom" inflexible={false} content="How to laugh subculturally in Thai">555</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="bottom" inflexible={false} content="How to laugh subculturally in Thai">555</Tooltip>
        </p>

        <h2>Inflexible positioning</h2>
        <h3>On top</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="top" inflexible={true} content="How to luagh subculturally in Chinese">廠廠</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="top" inflexible={true} content="How to luagh subculturally in Chinese">廠廠</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="top" inflexible={true} content="How to luagh subculturally in Chinese">廠廠</Tooltip>
        </p>

        <h3>On left</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="left" inflexible content="How to laugh subculturally in Japanese">www</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="left" inflexible content="How to laugh subculturally in Japanese">www</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="left" inflexible content="How to laugh subculturally in Japanese">www</Tooltip>
        </p>

        <h3>On right</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="right" inflexible content="How to laugh in Español">Jaja</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="right" inflexible content="How to laugh in Español">Jaja</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="right" inflexible content="How to laugh in Español">Jaja</Tooltip>
        </p>

        <h3>On bottom</h3>
        <p className="three">
          <Tooltip arrowed={isArrowed} theme={theme} position="bottom" inflexible content="How to laugh in Korean">ㅎㅎㅎ</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="bottom" inflexible content="How to laugh in Korean">ㅎㅎㅎ</Tooltip>
          <Tooltip arrowed={isArrowed} theme={theme} position="bottom" inflexible content="How to laugh in Korean">ㅎㅎㅎ</Tooltip>
        </p>

        <h2>Tips with regular nodes</h2>
        <p>
          <Tooltip arrowed={isArrowed} theme={theme} content="Am an idiot sandwich." position="left">What are you?</Tooltip>
        </p>

        <p className="button">
          <Tooltip
            arrowed={isArrowed} theme={theme}
            content="三维/三D/three dimensional"
            position="left"
            duration={2000}
          >
            <Button type="primary" icon="cube">3D</Button>
          </Tooltip>

          <Tooltip
            arrowed={isArrowed} theme={theme}
            content={{
              hover: '点选复制一个神祕的东西送你哟～',
              click: '已复制！',
            }}
            position="right"
          >
            <Button type="primary" icon="mobile-copy-link">点我复制</Button>
          </Tooltip>

          <Tooltip
            arrowed={isArrowed} theme={theme}
            content={{ click: '已复制！' }}
            duration={1000}
            position="right"
          >
            <Button type="primary" icon="mobile-copy-link">点我复制</Button>
          </Tooltip>
        </p>

        <Tooltip
          arrowed={isArrowed} theme={theme}
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
