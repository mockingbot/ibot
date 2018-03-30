import React from 'react'
import { storiesOf } from '@storybook/react'

import { Root, ColorPicker } from '../components'

storiesOf('Color Picker', module)
.add('Default', () => {
  const themes = Array(9).fill(null).map(() => `#${(Math.random() * 0xFFFFFF >> 0).toString(16)}`)

  return (
    <Root>
      <ColorPicker
        color="#ccaa55"
        opacity={100}
        themes={themes}
        style={{left: 50, top: 30}}
        onChange={() => null}
      />
    </Root>
  )
})
