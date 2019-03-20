import React from 'react'
import { action } from '@storybook/addon-actions'

import { Root, Icon, Button, Select } from '../../components'

export default class SelectExample extends React.PureComponent {
  state = {
    isSmall: false,
    isCore: false,
    isCoreMenu: false,

    forcedChangingValue: 5,
    longerSelectValue: 'Taller Men',
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })
  toggleCore = () => this.setState({ isCore: !this.state.isCore })
  toggleCoreMenu = () => this.setState({ isCoreMenu: !this.state.isCoreMenu })
  toggleWithActiveCheck = () => this.setState({ withActiveCheck: !this.state.withActiveCheck })

  onChangeForcedChangingSelect = forcedChangingValue => this.setState(
    { forcedChangingValue },
    action('Select changed')(forcedChangingValue),
  )

  onChangeLongerSelect = longerSelectValue => this.setState(
    { longerSelectValue },
    action('Select changed')(longerSelectValue),
  )

  render() {
    const { isSmall, isCore, isCoreMenu, withActiveCheck } = this.state

    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'
    const menuTheme = isCoreMenu ? 'core' : 'plain'

    return (
      <Root>
        <style>
        {`
          .Select > button .icon,
          .CoreSelect > button .icon,
          .select-menu-with-icons .icon {
            margin-right: .25em;
            font-size: 1.2em;
            vertical-align: -.1em;
          }

          p .Select,
          p .CoreSelect {
            margin-right: 1em;
            margin-bottom: .5em;
          }
        `}
        </style>

        <div
          style={{
            position: 'fixed',
            top: '1em',
            right: '1em',
          }}
        >
          <Button
            type="primary"
            onClick={this.toggleCore}
            style={{ marginRight: '.5em' }}
          >
            Theme: {theme}
          </Button>

          <Button
            type="primary"
            onClick={this.toggleCoreMenu}
            style={{ marginRight: '.5em' }}
          >
            Menu Theme: {menuTheme}
          </Button>

          <Button
            type="primary"
            onClick={this.toggleWithActiveCheck}
            style={{ marginRight: '.5em' }}
          >
            With { withActiveCheck ? '' : 'No' } Active Check
          </Button>

          <Button
            type="primary"
            onClick={this.toggleSize}
          >
            Toggle Size
          </Button>
        </div>

        <h2>Select with empty option list</h2>
        <p>
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={[]} />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} isDisabled={false} optionList={[]} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} isDisabled={true} optionList={[]} />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} isDisabled optionList={[]} />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} readOnly optionList={[]} />
        </p>

        <h2>Regular node options</h2>
        <p>
          <Select {...{ size, theme, menuTheme, withActiveCheck }} placeholder="Long long long placeholder" optionList={['Apple', 'Pencil']} onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['Apple', 'Pencil', 'Apple Pencil', 'Pineapple Pencil']} onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['Apple', 'Pencil']} value="Apple" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['Apple', 'Pencil']}  value="Apple" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['Apple', 'Pencil', { label: <span><Icon name="apple" /> Apple</span>, value: 'Apple with Icon' }]} value="Pencil" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={[1, 2, 3, 4, 5]} value={2} onChange={action('Select changed')} />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={[1, 2, 3, 4, 5]} value="2" onChange={action('Select changed')} />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['1', '2', '3', '4', '5']} value={2} onChange={action('Select changed')} />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['1', '2', '3', '4', '5']} value="2" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={['Apple', 'Pencil']} isDisabled={true} onChange={action('Select changed')} />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            menuClassName="select-menu-with-icons"
            optionList={[
              { label: <span><Icon name="apple" /> Apple</span>, value: 'apple' },
              { label: <span><Icon name="pencil" /> Pencil</span>, value: 'pencil' },
            ]}
            onChange={action('Select changed')}
          />
        </p>

        <h3>Disabled option</h3>
        <p>
          <Select {...{ size, theme, menuTheme, withActiveCheck }} optionList={[{ label: 'Apple', value: 'apple', isDisabled: true }, 'Pencil']} onChange={action('Select changed')} />
        </p>

        <h2>Long lists (10+ options)</h2>
        <p>
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            value="Tanzania AA"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            isDisabled={false}
            value="Blue Mountain"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
        </p>

        <h3>Disabled/read-only long lists</h3>
        <p>
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            isDisabled
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            readOnly
            value="Harrar"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
            onClick={action('Select clicked')}
          />
        </p>

        <h2>`menuX` (left/center/right)</h2>
        <p>
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            menuX="left"
            value="Tanzania AA"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            menuX="center"
            value="Tanzania AA"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            menuX="right"
            isDisabled={false}
            value="Blue Mountain"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
        </p>

        <h2>Selects of grouped options</h2>
        <p>
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            value="Blackberries"
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            value="Brie"
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            value="Rib Eye Steak"
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            isDisabled
            value="cheddar"
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            isDisabled
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
        </p>

        <h2>Changing the `value` in `props`</h2>
        <p style={{ maxWidth: '20em' }}>
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            placeholder="选择一个项目"
            optionList={[1,2,3,4,5]}
            value={this.state.forcedChangingValue}
            onChange={this.onChangeForcedChangingSelect}
          />
          <button onClick={() => this.setState({ forcedChangingValue: 1 })}>One</button>
          {' / '}
          <button onClick={() => this.setState({ forcedChangingValue: 2 })}>Two</button>
          {' / '}
          <button onClick={() => this.setState({ forcedChangingValue: 3 })}>Three</button>
          {' / '}
          <button onClick={() => this.setState({ forcedChangingValue: 4 })}>Four</button>
          {' / '}
          <button onClick={() => this.setState({ forcedChangingValue: 5 })}>Five</button>
        </p>

        <h2>Longer options</h2>
        <p style={{ maxWidth: '20em' }}>
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            placeholder="选择一个项目"
            value={this.state.longerSelectValue}
            optionList={[
              ['我的项目', '私ノ友達', '双十一的特价活动超强報价页面，十月底最终版'],
              ['洋基队', 'InstaYankies', 'New York New York', 'Manhattan Project'],
              ['巨人队', 'Taller Men', 'Shorter Giants'],
              ['红襪队', '一个很長很長又臭又長很長很長又臭又長很長很長又臭又長又長又臭又長又臭又臭又長的项目名字'],
              ['队名為什麼要取得那麼地長啊，好奇怪啊，你們！队', '一个很長很長又臭又長很長很長又臭又長很長很長又臭又長又長又臭又長又臭又臭又長的项目名字'],
            ]}
            onChange={this.onChangeLongerSelect}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme, withActiveCheck }}
            placeholder="选择一个项目"
            value={this.state.longerSelectValue}
            optionList={[
              ['我的项目', '私ノ友達', '双十一的特价活动超强報价页面，十月底最终版'],
              ['洋基队', 'InstaYankies', 'New York New York', 'Manhattan Project'],
              ['巨人队', 'Taller Men', 'Shorter Giants'],
              ['红襪队', '一个很長很長又臭又長很長很長又臭又長很長很長又臭又長又長又臭又長又臭又臭又長的项目名字'],
              ['队名為什麼要取得那麼地長啊，好奇怪啊，你們！队', '一个很長很長又臭又長很長很長又臭又長很長很長又臭又長又長又臭又長又臭又臭又長的项目名字'],
            ]}
            onChange={this.onChangeLongerSelect}
          />
        </p>
      </Root>
    )
  }
}
