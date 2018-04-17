import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import { Root, Guide as GuideBase } from '../components'

storiesOf('Guide', module)
  .add('Default', () => <GuideExample />)

class GuideExample extends PureComponent {
  state = { openStatusMap: { b: true } }

  componentDidMount() {
    setTimeout(() => this.openGuide('a'), 1000)
    setTimeout(() => this.closeGuide('a'), 6000)
  }

  openGuide = gid => this.setState({
    openStatusMap: { ...this.state.openStatusMap, [gid]: true },
  })

  closeGuide = gid => this.setState({
    openStatusMap: { ...this.state.openStatusMap, [gid]: false },
  })

  createGuideOpener = gid => () => this.openGuide(gid)
  createGuideCloser = gid => () => this.closeGuide(gid)

  render() {
    const { openStatusMap } = this.state

    return (
      <Root>
        <div style={{ paddingLeft: 100, height: 300 }}>
          <GuideBase
            isOpen={openStatusMap.a}
            onClose={this.createGuideCloser('a')}

            header="快速缩放设计图"
            guide="Some kbd shortcuts here…"

            gotItBtn noCloseBtn
            gotItText="我知道了"
            X="right"
          >
            Open with an 1 sec. <code>timeout</code>, and close in 5 sec.
          </GuideBase>
        </div>

        <div style={{ height: 300 }}>
        <GuideBase
          guide="123"
          isOpen={openStatusMap.b}
          onClose={this.createGuideCloser('b')}
          gotItBtn
        >
          Opened by Default
        </GuideBase>
        </div>

        <div style={{ height: 300 }}>
        <GuideBase
          header="页面回收站"
          guide="删除的页面可保存 20 天，请及时恢复重要页面"
          isOpen={openStatusMap.c}
          onClose={this.createGuideCloser('c')}
          className="trash-guide"
        >
          <button onClick={this.createGuideOpener('c')}>Open a Guide via Clicking</button>
        </GuideBase>
        </div>
      </Root>
    )
  }
}
