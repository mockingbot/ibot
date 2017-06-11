import React from 'react';
import { storiesOf, action, linkTo } from '@storybook/react';
import Welcome from './Welcome';
import ColorPicker from '../packages/color-picker/src';
import Switch from '../packages/switch/index.js';
import ContextMenu from '../packages/contextmenu/index.js'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Color Picker')} />);

storiesOf('Color Picker', module)
  .add('with color picker', () => {
    const color = '#ff0000'
    const opacity = 100

    const themes = []
    for (let i = 0 ; i < 9 ; i ++) {
      themes.push('#' + (Math.random() * 0xFFFFFF >> 0).toString(16))
    }

    return (
      <ColorPicker
        color={color}
        opacity={opacity}
        themes={themes}
        style={{left: 50, top: 30}}
        onChange={()=>{}}
      />
    )
  });

storiesOf('Switch', module)
  .add('on', () => {
    return (
      <Switch checked={true} onChange={()=>{}}></Switch>
    )
  })
  .add('off', () => {
    return (
      <Switch checked={false} onChange={()=>{}}></Switch>
    )
  })

storiesOf('ContextMenu', module)
  .add('click menu', () => {
    const menus = [
      {
        value: '查看',
        handler: () => {}
      },
      {
        value: '运行',
        handler: () => {}
      },
      {
        value: '返回',
        handler: () => {}
      },
      {
        value: '另存为',
        handler: () => {}
      },
      {
        value: '打印',
        handler: () => {}
      }
    ]

    const style = {
      width: 200
    }

    return (
      <ContextMenu menus={menus} style={style}></ContextMenu>
    )
  })
