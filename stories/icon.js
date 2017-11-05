import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import shuffle from 'lodash/shuffle'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Button from '../packages/button/index'

import iconList from '../packages/icon/icon-list'

storiesOf('Icon', module)
.add('MockingBot', () => (
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

      .icon {
        margin-right: .25em;
        font-size: 2em;
        color: #eb5648;
      }
    `}
    </style>

    <h2>
      21 randomly-picked icons
      <Button type="primary" onClick={() => location.reload()}>Get A New Batch</Button>
    </h2>

    <div>
    { shuffle(iconList).slice(0, 21).map(icon => (
      <div key={icon.id} className="label">
        <Icon name={icon.id} />
        { icon.id }
      </div>
    )) }
    </div>
  </Root>
))
