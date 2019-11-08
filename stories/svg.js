import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import Root from '../components/root'
import SVG from '../components/svg'

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
      <style>
        {`.svg-icon.close .fore { fill: #fff; }`}
        {`.svg-icon.info .fore { fill: #8D9EA7; }`}
        {`.svg-icon.info .main { fill: #fff; }`}
      </style>
      <p>
        {
          ['alarm', 'close', 'ellipsis', 'group', 'info', 'question', 'warning_filled']
            .map(it => <SVG key={it} name={it} />)
        }
      </p>

      <h3>Symbols</h3>
      <p>
        {
          ['plus', 'minus', 'times', 'check_filled']
            .map(it => <SVG key={it} name={it} />)
        }
      </p>

      <h3>Actions</h3>
      <p>
        {
          [
            'pin', 'duplicate', 'move', 'trash', 'edit', 'recycle',
            'code', 'play', 'share', 'workflow', 'setting',
            'loading',
            'lock', 'invisible',
            'scale_enlarge', 'scale_reduce',
            'search', 'pen',
          ]
            .map(it => <SVG key={it} name={it} />)
        }
      </p>

      <h3>Misc.</h3>
      <p>
        {
          ['rocket', 'gift']
            .map(it => <SVG key={it} name={`misc/${it}`} />)
        }
      </p>

      <h3>Brand</h3>
      <p>
        {
          ['antd', 'sketch', 'wechat', 'wps']
            .map(it => <SVG key={it} name={`brand/${it}`} />)
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
        {`.widget .svg-icon .main { fill: #8D9EA7; }`}

        {`.panel .svg-icon { color: #5b6b73; }`}
        {`.panel .svg-icon .fore { fill: #8d9ea7; }`}

        {`.gird .svg-icon .main { fill: #7D8694; }`}
        {`.gird .svg-icon .secondary { fill: #C8CDD0; }`}

        {`.select .svg-icon .main { fill: #5B6B73; }`}
        {`.select .svg-icon .fore { fill: #298DF8; }`}

        {`.setting .svg-icon .main { fill: #5B6B73; }`}
        {`.setting .svg-icon .secondary { fill: #8D9EA7; }`}
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
            'text_align_left', 'text_align_center', 'text_align_right', 'text_align_justify',
            'text_align_v_bottom', 'text_align_v_center', 'text_align_v_top',
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
            'eq_triangle', 'triangle',
            'carousel', 'dropdown',
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
          ['common_widget', 'platform_widget', 'smiley', 'screen',
            'layer', 'master', 'dynamic_widget',
            'my_widget', 'attribute_setting', 'link', 'list', 'thumbnail', 'onekey_recovery']
            .map(it => <SVG key={it} name={`design/${it}`} />)
        }
      </p>

      <h3>Font size</h3>
      <p className="size">
        {
          ['font_bold', 'font_italic', 'font_underline', 'font_line_through']
            .map(it => <SVG key={it} name={`design/${it}`} />)
        }
      </p>

      <h3>Misc.</h3>
      <p>
        {
          ['settings', 'trash', 'copy', 'enchase']
            .map(it => <SVG key={it} name={`design/${it}`} />)
        }
      </p>

      <h3>Grid size</h3>
      <p className="gird">
        {
          ['grid', 'grid_column', 'grid_row']
            .map(it => <SVG key={it} name={`design/${it}`} />)
        }
      </p>

      <h3>Select</h3>
      <p className="select">
        {
          ['intersect_select', 'include_select']
            .map(it => <SVG key={it} name={`design/${it}`} />)
        }
      </p>

      <h3>Setting</h3>
      <p className="setting">
        {
          ['screen_portrait', 'screen_landscape', 'preference', 'new_widgets']
            .map(it => <SVG key={it} name={`design/${it}`} />)
        }
      </p>
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
