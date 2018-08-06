import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import { Root, SVG } from '../components'

storiesOf('SVG', module)
.add('General', () => (
  <Root>
    <style>
      {`.svg-icon { margin-right: .25em; font-size: 1rem; color: #8D9EA7; }`}
      {`.svg-icon .fore { fill: #FF7100; }`}
      {`.dir .svg-icon { width: 1em; height: 1em; }`}
    </style>

    <h2>General</h2>
    <h3>Directions</h3>
    <p className="dir">
    {
      [
        'angle_bracket_up', 'angle_bracket_down', 'angle_bracket_left', 'angle_bracket_right',
        'triangle_up', 'triangle_down',
      ]
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h3>General</h3>
    <style>{`.svg-icon.close .fore { fill: #fff; }`}</style>
    <p>
    {
      ['alarm', 'close', 'ellipsis', 'group']
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h3>Math</h3>
    <p>
    {
      ['plus', 'times']
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h3>Actions</h3>
    <p>
    {
      [
        'pin', 'duplicate', 'move', 'trash', 'edit',
        'code', 'play', 'share', 'workflow', 'setting',
        'loading',
        'lock', 'invisible',
        'scale_enlarge', 'scale_reduce',
        'pen',
      ]
      .map(it => <SVG key={it} name={it} />)
    }
    </p>

    <h3>Logos</h3>
    <p>
    {
      ['antd']
      .map(it => <SVG key={it} name={it} />)
    }
    </p>
  </Root>
))
.add('Design', () => (
  <Root>
    <style>
      {`.svg-icon { margin-right: .25em; font-size: 1rem; color: #8D9EA7; }`}
      {`.svg-icon .fore { fill: #FF7100; }`}

      {`.alignment .svg-icon .main { fill: #298df8; }`}
      {`.alignment .svg-icon .secondary { fill: #5b6b73; }`}
      {`.alignment .svg-icon .tertiary { fill: #8d9ea7; }`}

      {`.text-alignment .svg-icon .main { fill: #8d9ea7; }`}
      {`.text-alignment .svg-icon .secondary { fill: #5b6b73; }`}

      {`.widget { display: flex; align-items: center; flex-wrap: wrap; }`}
      {`.widget .svg-icon { font-size: 2.125rem; }`}
      {`.widget.shortcut .svg-icon { font-size: 1.5rem; }`}

      {`.panel .svg-icon { color: #5b6b73; }`}
      {`.panel .svg-icon .fore { fill: #8d9ea7; }`}
    </style>

    <h2>Design</h2>
    <h3>Alignment</h3>
    <p className="alignment">
    {
      [
        'align_left', 'align_center_h', 'align_right',
        'align_top', 'align_center_v', 'align_bottom',
        'dist_evenly_h', 'dist_evenly_v',
      ]
      .map(it => <SVG key={it} name={`design/${it}`} />)
    }
    </p>

    <h3>Text alignment</h3>
    <p className="text-alignment">
    {
      [
        'text_align_left',
        'text_align_center',
        'text_align_right',
        'text_align_justify',
      ]
      .map(it => <SVG key={it} name={`design/${it}`} />)
    }
    </p>

    <h3>Widgets</h3>
    <p className="widget">
    {
      [
        'note', 'button', 'gesture',
        'webpage', 'dialog', 'linkarea',
        'file', 'input', 'textarea',
        'map', 'select', 'topbar',
      ]
      .map(it => <SVG key={it} name={`design/${it}`} />)
    }
    </p>

    <h4>Shortcut widgets</h4>
    <p className="widget shortcut">
    {
      ['text', 'rectangle', 'circle', 'line', 'image']
      .map(it => <SVG key={it} name={`design/${it}`} />)
    }
    </p>

    <h3>Panel</h3>
    <p className="panel">
    {
      ['common_widget', 'platform_widget', 'smiley', 'screen', 'layer', 'master']
      .map(it => <SVG key={it} name={`design/${it}`} />)
    }
    </p>

    <h3>Misc.</h3>
    <p><SVG name="design/settings" /></p>
  </Root>
))
.add('Preview', () => (
  <Root>
    <style>
      {`.svg-icon { margin-right: .25em; font-size: 1rem; color: #8D9EA7; }`}
      {`.svg-icon .fore { fill: #FF7100; }`}
      {`.dir .svg-icon { width: 1em; height: 1em; }`}
    </style>

    <h2>Preview</h2>
    <p>
    {
      ['daynight', 'exit', 'fullscreen']
      .map(it => <SVG key={it} name={`preview/${it}`} />)
    }
    </p>
  </Root>
))
