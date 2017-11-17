import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import shuffle from 'lodash/shuffle'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Button from '../packages/button/index'

storiesOf('Icon', module)
.add('MockingBot', () => <IconPreview />)

class IconPreview extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { dora: [], mb: [] }
  }

  fetch = () => (
    Promise.all([
      import('./json/dora'),
      import('./json/mb'),
    ])
    .then(([dora, mb]) => this.setState({ dora, mb }))
  )

  componentWillMount() {
    this.fetch()
  }

  render() {
    const { dora, mb } = this.state

    return (
      <Root>
        <style>
        {`
          h2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          h2 button {
            font-size: .875rem;
          }

          h2 + div {
            margin-top: -1em;
            columns: 3;
          }

          .label {
            display: flex;
            align-items: center;
            height: 3em;
            color: #999;
          }

          .Icon {
            margin-right: .25em;
            font-size: 2em;
            color: rgba(235, 86, 72, .5);
          }
        `}
        </style>

        <h2>
          21 randomly-picked MockingBot icons
          <Button type="primary" onClick={() => this.forceUpdate()}>Get A New Batch</Button>
        </h2>

        <div>
        { shuffle(mb).slice(0, 21).map(icon => (
          <div key={icon.id} className="label">
            <Icon name={icon.id} />
            { icon.id }
          </div>
        ))}
        </div>

        <h2>21 randomly-picked Dora icons</h2>
        <div>
        { shuffle(dora.slice(0, 21)).map(icon => (
          <div key={icon.id} className="label">
            <Icon type="dora" name={icon.id} />
            { icon.id }
          </div>
        ))}
        </div>
      </Root>
    )
  }
}
