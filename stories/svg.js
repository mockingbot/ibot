import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import { Root, SVG } from '../components'

storiesOf('SVG', module)
.add('default', () => (
  <Root>
    <h2>Preview</h2>

    <SVG name="daynight" />
    <SVG name="exit" />
    <SVG name="fullscreen" />
  </Root>
))
