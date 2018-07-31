import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Root, Icon, Dropdown, Input, Select, Check, Tooltip } from '../components'

storiesOf('Dropdown', module)
.add('Default', () => <DropdownExample />)

class DropdownExample extends PureComponent {
  state = { isSettingOpen: true, inputValue: '' }

  onToggleSetting = isSettingOpen => this.setState(
    { isSettingOpen },
    () => action('Dropdown `isOpen`')(isSettingOpen),
  )

  onChangeInput = inputValue => this.setState({ inputValue })

  render() {
    const { isSettingOpen, inputValue } = this.state

    return (
      <Root>
        <style>
        {`
          .dropdown {
            display: flex;
            justify-content: space-between;
            width: 15em;
            font-size: 1rem;
            color: #8D9EA7;
          }
          .dropdown .Dropdown:not(:last-child) {
            margin-right: .5em;
          }

          .palette .color {
            position: relative;
            display: inline-block;
            width: 20px;
            height: 20px;
          }

          .palette .color span {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
          }

          .DropdownMenu.color-control .content {
            width: 7.5em;
          }

          .DropdownMenu.color-control .content div {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            width: 100%;
            text-transform: uppercase;
          }

          .DropdownMenu.color-control .content div .icon {
            color: #C8CDD0;
            cursor: pointer;
          }

          .DropdownMenu.preview-option {
            width: 10em;
          }
          .DropdownMenu.preview-option .content {
            padding: .75em;
          }
          .DropdownMenu.preview-option .content label {
            width: 100%;
            height: 25px;
            line-height: 25px;
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

        <h2 style={{ marginTop: '70vh' }}>Default</h2>
        <p className="dropdown">
          <Dropdown
            opener="Type Something"
            menu={<Input style={{ width: '10rem' }} value={inputValue} placeholder="Type something here." onChange={this.onChangeInput} />}
            menuX="left"
            menuBaseStyle={{ left: 50 }}
          />
        </p>

        <p className="dropdown">
          <Dropdown
            isOpen={isSettingOpen}
            onToggle={this.onToggleSetting}

            opener={<div><Icon type="dora" name="cog" /> Settings</div>}
            menuClassName="preview-option"
            menu={
              <div>
                <Select size="small" optionList={['真实设备边框', '墨刀黑', '无边框']} value="真实设备边框" size="small" unstyled />
                <hr />
                <Check size="small" label="高亮链接区域" />
              </div>
            }
            menuX="left"
          />

          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            menuClassName="preview-option"
            menu={
              <div>
                <Select size="small" optionList={['真实设备边框', '墨刀黑', '无边框']} value="真实设备边框" size="small" unstyled />
                <hr />
                <Check size="small" label="高亮链接区域" />
              </div>
            }
          />

          <Dropdown
            opener={<div><Icon type="dora" name="cog" /> Settings</div>}
            menuClassName="preview-option"
            menu={
              <div>
                <Select size="small" optionList={['真实设备边框', '墨刀黑', '无边框']} value="真实设备边框" size="small" unstyled />
                <hr />
                <Check size="small" label="高亮链接区域" />
              </div>
            }
            menuX="right"
          />
        </p>

        <h2>Arrowed</h2>
        <h3>Arrow-based X</h3>
        <p className="dropdown">
          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="left"

            menuList={['编辑', '标记完成']}
            onSelect={action('Dropdown item selected')}
          />

          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="center"

            menuList={['编辑', '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
          />

          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="right"

            menuList={[{ isDisabled: true, label: '编辑' }, '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
          />
        </p>

        <h3>menu-based X</h3>
        <p className="dropdown">
          <Dropdown
            opener={<div><Icon type="dora" name="cog" /> Settings</div>}
            arrowed menuBasedX
            menuX="left"

            menuList={['编辑', '标记完成']}
            onSelect={action('Dropdown item selected')}
          />

          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="center"

            menuList={['编辑', '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
          />

          <Dropdown
            opener={<div><Icon type="dora" name="cog" /> Settings</div>}
            arrowed menuBasedX
            menuX="right"

            menuList={[{ isDisabled: true, label: '编辑' }, '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
          />
        </p>

        <h2>Preferred-top & arrowed</h2>
        <p className="dropdown">
          <Dropdown
            menuY="top"
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="left"
            menuList={['编辑', '标记完成']}
            onSelect={action('Dropdown item selected')}
          />

          <Dropdown
            menuY="top"
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuList={['编辑', '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
          />

          <Dropdown
            menuY="top"
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="right"
            menuList={[{ isDisabled: true, label: '编辑' }, '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
          />
        </p>

        <h3>Hover to open</h3>
        <p className="dropdown palette">
          <Dropdown
            inflexible
            menuY="top"
            menuX="left"
            arrowed

            shouldOpenOnHover={true}

            onOpen={action('Dropdown `onOpen`')}
            onClose={action('Dropdown `onClose`')}
            onToggle={action('Dropdown `isOpen`')}

            className="color"
            opener={
              <Tooltip
                arrowed={false}
                content={{ click: 'Copied!' }}
                style={{ background: '#4A90E2' }}
              />
            }

            menuClassName="color-control"
            menu={
              <div>
                <span>#4A90E2</span>
                <Icon name="trash" type="dora" />
              </div>
            }
          />
          <Dropdown
            inflexible
            menuY="top"
            menuX="left"
            arrowed

            shouldOpenOnHover={true}

            className="color"
            opener={
              <Tooltip
                arrowed={false}
                content={{ click: 'Copied!' }}
                style={{ background: '#e84030' }}
              />
            }

            menuClassName="color-control"
            menu={
              <div>
                <span>#e84030</span>
                <Icon name="trash" type="dora" />
              </div>
            }
          />
          <Dropdown
            inflexible
            menuY="top"
            menuX="left"
            arrowed

            shouldOpenOnHover={true}

            className="color"
            opener={
              <Tooltip
                arrowed={false}
                content={{ click: 'Copied!' }}
                style={{ background: '#1e292e' }}
              />
            }

            menuClassName="color-control"
            menu={
              <div>
                <span>#1e292e</span>
                <Icon name="trash" type="dora" />
              </div>
            }
          />
          <Dropdown
            inflexible
            menuY="top"
            menuX="left"
            arrowed

            shouldOpenOnHover={true}

            className="color"
            opener={
              <Tooltip
                arrowed={false}
                content={{ click: 'Copied!' }}
                style={{ background: '#415058' }}
              />
            }

            menuClassName="color-control"
            menu={
              <div>
                <span>#415058</span>
                <Icon name="trash" type="dora" />
              </div>
            }
          />
          <Dropdown
            inflexible
            menuY="top"
            arrowed

            shouldOpenOnHover={true}

            className="color"
            opener={
              <Tooltip
                arrowed={false}
                content={{ click: 'Copied!' }}
                style={{ background: '#FFB63D' }}
              />
            }

            menuClassName="color-control"
            menu={
              <div>
                <span>#FFB63D</span>
                <Icon name="trash" type="dora" />
              </div>
            }
          />
          <Dropdown
            inflexible
            menuY="top"
            menuX="right"
            arrowed

            shouldOpenOnHover={true}

            className="color"
            opener={
              <Tooltip
                arrowed={false}
                content={{ click: 'Copied!' }}
                style={{ background: '#009999' }}
              />
            }

            menuClassName="color-control"
            menu={
              <div>
                <span>#009999</span>
                <Icon name="trash" type="dora" />
              </div>
            }
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
            menuX="left"
            menuList={['编辑', '标记完成']}
            onSelect={action('Dropdown item selected')}
            shouldCloseOnSelect={false}
          />

          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="center"
            menuList={['编辑', '标记完成']}
            onSelect={action('Dropdown item selected')}
            shouldCloseOnSelect={false}
          />

          <Dropdown
            opener={<Icon type="dora" name="cog" />}
            arrowed
            menuX="right"
            menuList={['编辑', '已完成']}
            currentMenuListItemIdx={1}
            onSelect={action('Dropdown item selected')}
            shouldCloseOnSelect={false}
          />
        </p>

        <h2>Custom content</h2>
        <p className="dropdown">
          <Dropdown
            menuX="left"
            opener={<Icon type="dora" name="cube" />}
            menu={<div>Your own content, whatever you like.</div>}
            menuClassName="custom-dropdown-menu"
          />
          <Dropdown
            menuX="center"
            opener={<Icon type="dora" name="comment" />}
            menu={<div>Your own content, whatever you like.</div>}
            menuClassName="custom-dropdown-menu"
          />
          <Dropdown
            menuX="right"
            opener={<Icon type="dora" name="arrow_down" />}
            arrowed
            menu={<div>Your own content, with arrow.</div>}
            menuClassName="custom-dropdown-menu"
          />
        </p>

        <div style={{ marginBottom: '70vh' }} />
      </Root>
    )
  }
}
