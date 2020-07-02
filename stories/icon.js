import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import shuffle from 'lodash/shuffle'

import Root from './components/root'
import Button from '../components/button'
import Icon from '../components/icon'

const { DuoIcon } = Icon

storiesOf('Icon', module)
  .add('Dora & MockingBot', () => <IconPreview />)

class IconPreview extends PureComponent {
  state = { dora: [], mb: [], duo: [] }

  fetch = () => (
    Promise.all([
      import('./json/dora'),
      import('./json/mb'),
      import('./json/duo'),
    ])
      .then(([dora, mb, duo]) => this.setState({
        dora: Array.from(dora.default),
        mb: Array.from(mb.default),
        duo: Array.from(duo.default),
      }))
  )

  componentDidMount () {
    this.fetch()
  }

  render () {
    const { dora, mb, duo } = this.state

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

          .icon, .duo-icon {
            margin-right: .25em;
            font-size: 2em;
            color: rgba(235, 86, 72, .5);
          }
          .duo-icon {
            color: inherit;
          }
          .duo-icon .layer:first-child {
            color: rgba(235, 86, 72, .85);
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
          { shuffle(dora).slice(0, 21).map(icon => (
            <div key={icon.id} className="label">
              <Icon type="dora" name={icon.id} />
              { icon.id }
            </div>
          ))}
        </div>

        <h2>Duo-colour icons</h2>
        <div className="duo">
          {
            duo
              .concat(Array(1).fill(''))
              .map(({ id }, idx) => (
                <div key={id || idx} className="label">
                  <DuoIcon name={id} />
                  { id }
                </div>
              ))
          }
        </div>
      </Root>
    )
  }
}
