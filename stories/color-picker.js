import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import ColorPicker from '../packages/color-picker/src/index'

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

