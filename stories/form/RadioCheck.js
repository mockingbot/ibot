import React, { PureComponent } from 'react'
import { action } from '@storybook/addon-actions'

import {
  Root, Button,
  Radio, Check,
  RadioGroup, CheckGroup,
} from '../../components'

export default class RadioCheckExample extends PureComponent {
  state = {
    isSmall: false,
    isCore: false,
    langValue: 'zh',
    cgValueList: ['One', 'Three', 'Five'],
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })
  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  onChangeLang = (isChecked, name, langValue) => this.setState(
    { langValue },
    () => action('Radio Checked')(isChecked, name, langValue),
  )

  onChangeCgValueList = (cgValueList, name) => this.setState(
    { cgValueList },
    () => action('Radio Checked')(cgValueList, name)
  )

  toggle3FromOutside = () => this.setState(
    ({ cgValueList: prevList }) => ({
      cgValueList: (
        prevList.includes('Three')
        ? prevList.filter(v => v !== 'Three')
        : [...prevList, 'Three']
      )
    }),
  )

  render() {
    const {
      isSmall, isCore, langValue,
      cgValueList,
    } = this.state

    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'

    return (
      <Root>
        <style scoped>
        {`p { width: 15em; }`}
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
            onClick={this.toggleSize}
          >
            Toggle Size
          </Button>
        </div>

        <style>
        {`p.radio { display: flex; flex-wrap: wrap; width: 15em; }`}
        {`p.radio label { margin-right: .5em; }`}
        </style>

        <h2>Radio</h2>
        <p className="radio">
          <Radio {...{ size, theme }} name="lang" value="zh" label="汉语" isChecked={'zh' === langValue} onToggle={this.onChangeLang} />
          <Radio {...{ size, theme }} name="lang" value="ja" label="日本語" isChecked={'ja' === langValue} isDisabled={true}  onToggle={this.onChangeLang} />
          <Radio {...{ size, theme }} name="lang" value="en" label="English" isChecked={'en' === langValue}  onToggle={this.onChangeLang} />
          <Radio {...{ size, theme }} name="lang" value="tlh" label="Klingon" isChecked={'tlh' === langValue} isDisabled={true} onToggle={this.onChangeLang} />
          <Radio {...{ size, theme }} name="lang" value="ava" label="Avarin" isChecked={'ava' === langValue} isDisabled={false} onToggle={this.onChangeLang} />

          <br />
          <button onClick={this.onChangeLang.bind(this, true, 'lang', 'zh')}>Change back to 汉语</button>
        </p>

        <h3>Read-only</h3>
        <p className="check">
          <Radio {...{ size, theme }} name="lang" label="汉语" isChecked={true} readOnly onToggle={action('Check toggled')} />
          <Radio {...{ size, theme }} name="lang" label="日本語" isChecked={false} readOnly onToggle={action('Check toggled')} />
          <Radio {...{ size, theme }} name="lang" value="en" label="English" isDisabled readOnly isChecked={'en' === langValue}  onToggle={this.onChangeLang} />
        </p>

        <style>
        {`p.radio-group { display: flex; }`}
        {`p.radio-group label { flex: 100%; }`}
        </style>

        <h2>Radio Group</h2>
        <p className="radio-group">
          <RadioGroup
            {...{ size, theme }}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: <b>Tōkyō, Japan</b>, value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            value="newyork"
            onToggle={action('RadioGroup toggled')}
          />
          <RadioGroup
            {...{ size, theme }}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            value="tokyo"
            onToggle={action('RadioGroup toggled')}
          />
        </p>

        <p className="radio-group">
          <RadioGroup
            {...{ size, theme }}
            optionList={[1,2,3,4,5]}
            value={2}
            onToggle={action('RadioGroup toggled')}
          />
          <RadioGroup
            {...{ size, theme }}
            optionList={[1,2,3,4,5]}
            value="2"
            onToggle={action('RadioGroup toggled')}
          />
          <RadioGroup
            {...{ size, theme }}
            optionList={['1','2','3','4','5']}
            value="2"
            onToggle={action('RadioGroup toggled')}
          />
          <RadioGroup
            {...{ size, theme }}
            optionList={['1','2','3','4','5']}
            value={2}
            onToggle={action('RadioGroup toggled')}
          />
          <RadioGroup
            {...{ size, theme }}
            optionList={['1','2','3','4','5']}
            value={'2'}
            onToggle={action('RadioGroup toggled')}
          />
        </p>

        <h3>Disabling the entire radio group</h3>
        <p className="radio-group">
          <RadioGroup
            {...{ size, theme }}
            isDisabled
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            value="tokyo"
            onToggle={action('Radio toggled')}
          />
        </p>

        <h3>Read-only</h3>
        <p className="radio-group">
          <RadioGroup
            {...{ size, theme }}
            readOnly
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            value="tokyo"
            onToggle={action('Radio toggled')}
          />
        </p>

        <h2>Check</h2>
        <style>
        {`p.check { display: flex; width: 15em; flex-wrap: wrap; }`}
        {`p.check label { margin-right: .5em; }`}
        </style>
        <p className="check">
          <Check {...{ size, theme }} name="lang" label="汉语" isChecked={true} onToggle={action('Check toggled')} />
          <Check {...{ size, theme }} name="lang" label="日本語" isChecked={true} onToggle={action('Check toggled')} />
          <Check {...{ size, theme }} name="lang" label="English" onToggle={action('Check toggled')} />
          <Check {...{ size, theme }} name="lang" label="Klingon" isDisabled={true} onToggle={action('Check toggled')} />
        </p>

        <h3>Read-only</h3>
        <p className="check">
          <Check {...{ size, theme }} name="lang" label="汉语" isChecked={true} readOnly onToggle={action('Check toggled')} />
          <Check {...{ size, theme }} name="lang" label="日本語" isChecked={false} readOnly onToggle={action('Check toggled')} />
          <Check {...{ size, theme }} name="lang" label="日本語" isChecked={false} isDisabled readOnly onToggle={action('Check toggled')} />
        </p>

        <style>
        {`p.check-group { display: flex; }`}
        {`p.check-group label { flex: 100%; }`}
        </style>

        <h2>Check Group</h2>
        <p className="check-group">
          <CheckGroup
            {...{ size, theme }}
            optionList={[
              { label: <b>Běijīng, China</b>, value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            valueList={['beijing','newyork']}
            onToggle={action('CheckGroup toggled')}
          />
          <CheckGroup
            {...{ size, theme }}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            valueList={['beijing', 'newyork']}
            onToggle={action('CheckGroup toggled')}
          />
        </p>

        <p className="check-group">
          <CheckGroup
            {...{ size, theme }}
            optionList={[1,2,3,4,5]}
            valueList={[2,3]}
            onToggle={action('CheckGroup toggled')}
          />
          <CheckGroup
            {...{ size, theme }}
            optionList={[1,2,3,4,5]}
            valueList={['2', '3']}
            onToggle={action('CheckGroup toggled')}
          />
          <CheckGroup
            {...{ size, theme }}
            optionList={['1','2','3','4','5']}
            valueList={['2', '3']}
            onToggle={action('CheckGroup toggled')}
          />
          <CheckGroup
            {...{ size, theme }}
            optionList={['1','2','3','4','5']}
            valueList={[2, 3]}
            onToggle={action('CheckGroup toggled')}
          />
          <CheckGroup
            {...{ size, theme }}
            optionList={['1','2','3','4','5']}
            valueList={[2, 3]}
            onToggle={action('CheckGroup toggled')}
          />
        </p>

        <h3>Toggle from outside</h3>
        <p className="check-group">
          <CheckGroup
            {...{ size, theme }}
            optionList={['One', 'Two', 'Three', 'Four', 'Five']}
            valueList={cgValueList}
            onToggle={this.onChangeCgValueList}
          />
        </p>
        <button onClick={this.toggle3FromOutside}>Toggle ‘three’</button>

        <h3>Disabling the entire check group</h3>
        <p className="check-group">
          <CheckGroup
            {...{ size, theme }}
            isDisabled={true}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            valueList={['beijing', 'newyork']}
          />
        </p>

        <h3>Read-only</h3>
        <p className="check-group">
          <CheckGroup
            {...{ size, theme }}
            readOnly
            optionList={[
              { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            valueList={['beijing', 'newyork']}
          />
        </p>
      </Root>
    )
  }
}
