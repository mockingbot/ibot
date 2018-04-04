import React, { PureComponent } from 'react'

import { Root, Icon, Button, form, text } from '../../components'

const { Input: { Textarea } } = form
const { Tooltip } = text

export default class TooltipExample extends PureComponent {
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
