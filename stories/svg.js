import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import { Root, SVG } from '../components'

storiesOf('SVG', module)
.add('default', () => (
  <Root>
    <style>
      {`.svg-icon { margin-right: .25em; font-size: 1rem; color: #8D9EA7; }`}
      {`.svg-icon .fore { fill: #FF7100; }`}
      {`.dir .svg-icon { width: 1em; height: 1em; }`}
    </style>

    <h2>Directions</h2>
    <p className="dir">
    {
      [
        'angle_bracket_up', 'angle_bracket_down', 'angle_bracket_left', 'angle_bracket_right',
        'triangle_up', 'triangle_down',
      ]
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h2>General</h2>
    <style>{`.svg-icon.close .fore { fill: #fff; }`}</style>
    <p>
    {
      ['alarm', 'close', 'ellipsis']
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h2>Math</h2>
    <p>
    {
      ['plus', 'times']
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h2>Actions</h2>
    <p>
    {
      [
        'pin', 'duplicate', 'move', 'trash',
        'code', 'play', 'share', 'workflow', 'setting',
        'loading', 'scale_enlarge', 'scale_reduce',
      ]
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h2>Preview</h2>
    <p>
    {
      ['daynight', 'exit', 'fullscreen']
      .map(it => <SVG key={it} name={it} />)
    }
    </p>
  </Root>
))
