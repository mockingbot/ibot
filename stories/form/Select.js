import React from 'react'
import { action } from '@storybook/addon-actions'

import Root from '../components/root'
import Button from '../../components/button'
import Select from '../../components/select'
import Icon from '../components/icon'

const MENU_THEME_LIST = ['plain', 'core', 'check']

export default class SelectExample extends React.PureComponent {
  state = {
    isSmall: false,
    isCore: false,
    menuTheme: 'plain',

    forcedChangingValue: 5,
    longerSelectValue: 'Taller Men',
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  toggleCoreMenu = () => this.setState(prevState => {
    const { menuTheme } = prevState
    const prevIdx = MENU_THEME_LIST.indexOf(menuTheme)

    return { menuTheme: MENU_THEME_LIST[prevIdx === 2 ? 0 : prevIdx + 1] }
  })

  onChangeForcedChangingSelect = forcedChangingValue => this.setState(
    { forcedChangingValue },
    action('Select changed')(forcedChangingValue),
  )

  onChangeLongerSelect = longerSelectValue => this.setState(
    { longerSelectValue },
    action('Select changed')(longerSelectValue),
  )

  render () {
    const { isSmall, isCore, menuTheme } = this.state
    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'

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
            onClick={this.toggleSize}
          >
            Toggle Size
          </Button>
        </div>

        <h2>Select with empty option list</h2>
        <p>
          <Select {...{ size, theme, menuTheme }} optionList={[]} />
          <Select {...{ size, theme, menuTheme }} isDisabled={false} optionList={[]} />
          <br />
          <Select {...{ size, theme, menuTheme }} isDisabled={true} optionList={[]} />
          <Select {...{ size, theme, menuTheme }} isDisabled optionList={[]} />
          <Select {...{ size, theme, menuTheme }} readOnly optionList={[]} />
        </p>

        <h2>Regular node options</h2>
        <p>
          <Select {...{ size, theme, menuTheme }} placeholder="Long long long placeholder" optionList={['Apple', 'Pencil']} onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme }} optionList={['Apple', 'Pencil', 'Apple Pencil', 'Pineapple Pencil']} onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme }} optionList={['Apple', 'Pencil']} value="Apple" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme }} optionList={['Apple', 'Pencil']} value="Apple" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme }} optionList={['Apple', 'Pencil', { label: <span><Icon name="apple" /> Apple</span>, value: 'Apple with Icon' }]} value="Pencil" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme }} optionList={[1, 2, 3, 4, 5]} value={2} onChange={action('Select changed')} />
          <Select {...{ size, theme, menuTheme }} optionList={[1, 2, 3, 4, 5]} value="2" onChange={action('Select changed')} />
          <Select {...{ size, theme, menuTheme }} optionList={['1', '2', '3', '4', '5']} value={2} onChange={action('Select changed')} />
          <Select {...{ size, theme, menuTheme }} optionList={['1', '2', '3', '4', '5']} value="2" onChange={action('Select changed')} />
          <br />
          <Select {...{ size, theme, menuTheme }} optionList={['Apple', 'Pencil']} isDisabled={true} onChange={action('Select changed')} />
          <br />
          <Select
            {...{ size, theme, menuTheme }}
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
          <Select {...{ size, theme, menuTheme }} optionList={[{ label: 'Apple', value: 'apple', isDisabled: true }, 'Pencil']} onChange={action('Select changed')} />
        </p>

        <h2>Long lists (10+ options)</h2>
        <p>
          <Select
            {...{ size, theme, menuTheme }}
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme }}
            value="Tanzania AA"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme }}
            isDisabled={false}
            value="Blue Mountain"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
        </p>

        <h3>Disabled/read-only long lists</h3>
        <p>
          <Select
            {...{ size, theme, menuTheme }}
            isDisabled
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
            menuX="left"
            value="Tanzania AA"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme }}
            menuX="center"
            value="Tanzania AA"
            optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
            onChange={action('Select changed')}
          />
          <Select
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
            optionList={[
              ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
              ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
              'Rib Eye Steak', 'Bacon Sandwich', 'Caesar Salad',
            ]}
            onChange={action('Select changed')}
          />
          <br />
          <Select
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
            placeholder="选择一个项目"
            optionList={[1, 2, 3, 4, 5]}
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
            {...{ size, theme, menuTheme }}
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
            {...{ size, theme, menuTheme }}
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
