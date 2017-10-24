import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

// for now, need to ref the src directly otherwise webpack would resolve to the build version on lib
// TODO: only add module property of package.json in build time to avoid this issue
import ColorPicker from '../packages/color-picker/src/index'
import Switch from '../packages/switch'
import '../packages/switch/dest/index.css'

storiesOf('Color Picker', module)
.add('Default', () => {
  const themes = Array(9).fill(null).map(() => `#${(Math.random() * 0xFFFFFF >> 0).toString(16)}`)

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
