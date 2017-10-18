import React from 'react'
import { storiesOf, action, linkTo } from '@storybook/react'

import Welcome from './Welcome'
import ColorPicker from '../packages/color-picker/src'
import Switch from '../packages/switch'

const getRandomColor = () => `#${(Math.random() * 0xFFFFFF >> 0).toString(16)}`

storiesOf('Welcome', module)
.add('to Storybook', () => <Welcome showApp={linkTo('Color Picker')} />)

storiesOf('Color Picker', module)
.add('Default', () => {
  const themes = Array(9).fill(null).map(getRandomColor)

  return (
    <ColorPicker
      color="#ccaa55"
      opacity={100}
      themes={themes}
      style={{left: 50, top: 30}}
      onChange={() => null}
    />
  )
})

storiesOf('Switch', module)
.add('On/off', () => (
  <Switch onChange={action('checked')} />
))
