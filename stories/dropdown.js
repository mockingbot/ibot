import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Dropdown from '../packages/dropdown/index'

import { Select, Check } from '../packages/form/index'

storiesOf('Dropdown', module)
.add('Default', () => (
  <Root>
    <style>
    {`
      .dropdown {
        width: 15em;
        font-size: 1rem;
        text-align: end;
        color: #8D9EA7;
      }
      .dropdown .Dropdown:not(:last-child) {
        margin-right: .5em;
      }

      .DropdownMenu.preview-option {
        width: 10em;
      }
      .DropdownMenu.preview-option .content {
        padding: .75em;
      }
      .DropdownMenu.preview-option .content label {
        width: 100%;
        height: 32px;
        line-height: 32px;
      }
      .DropdownMenu.preview-option .content .Select .caret {
        margin: 0;
      }
      .DropdownMenu.preview-option .content hr {
        width: 98%;
        border: 0;
        border-top: 1px solid #dedee4;
      }
    `}
    </style>

    <h2>Default</h2>
    <p className="dropdown">
      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        menuClassName="preview-option"
        menu={
          <div>
            <Select optionList={['真实设备边框', '墨刀黑', '无边框']} currentOptionIdx="0" size="unstyled" />
            <hr />
            <Check label="高亮链接区域" />
          </div>
        }
      />

      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        menuClassName="preview-option"
        menu={
          <div>
            <Select optionList={['真实设备边框', '墨刀黑', '无边框']} currentOptionIdx="1" size="unstyled" />
            <hr />
            <Check label="高亮链接区域" />
          </div>
        }
      />
    </p>

    <h2>Arrowed</h2>
    <p className="dropdown">
      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        arrowed
        menuList={['编辑', '标记完成']}
        onSelect={action('Dropdown item selected')}
      />

      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        arrowed
        menuList={['编辑', '已完成']}
        currentMenuListItemIdx={1}
        onSelect={action('Dropdown item selected')}
      />

      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        arrowed
        menuList={[{ isDisabled: true, label: '编辑' }, '已完成']}
        currentMenuListItemIdx={1}
        onSelect={action('Dropdown item selected')}
      />
    </p>

    <h2>Disabled</h2>
    <p className="dropdown">
      <Dropdown opener={<Icon type="dora" name="cog" />} disabled />
      <Dropdown opener={<Icon type="dora" name="cog" />} isDisabled />
    </p>

    <h2>Not closing after selected</h2>
    <p className="dropdown">
      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        arrowed
        menuList={['编辑', '标记完成']}
        onSelect={action('Dropdown item selected')}
        shouldCloseOnSelect={false}
      />

      <Dropdown
        opener={<Icon type="dora" name="cog" />}
        arrowed
        menuList={['编辑', '已完成']}
        currentMenuListItemIdx={1}
        onSelect={action('Dropdown item selected')}
        shouldCloseOnSelect={false}
      />
    </p>

    <h2>Custom content</h2>
    <p className="dropdown">
      <Dropdown
        opener={<Icon type="dora" name="cube" />}
        menu={<div>Your own content, whatever you like.</div>}
        menuClassName="custom-dropdown-menu"
      />
      <Dropdown
        opener={<Icon type="dora" name="arrow_down" />}
        arrowed
        menu={<div>Your own content, with arrow.</div>}
        menuClassName="custom-dropdown-menu"
      />
    </p>
  </Root>
))
