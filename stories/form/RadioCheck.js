import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../../packages/root/index'
import Icon from '../../packages/icon/index'
import Switch from '../../packages/switch/index'
import Button from '../../packages/button/index'

import Form from '../../packages/form/index'

const {
  FormLabel, FormEntry,
  Input, PanelInput,
  Textarea,
  InputNumber,
  Radio, Check,
  RadioGroup, CheckGroup,
  Select,
} = Form

export default class RadioCheckExample extends PureComponent {
  state = {
    isSmall: false,
    langValue: 'zh',
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  onChangeLang = (_, langValue) => this.setState(
    { langValue },
    () => action('Radio Checked')('lang', langValue),
  )

  render() {
    const {
      isSmall, langValue
    } = this.state
    const size = isSmall ? 'small' : 'regular'

    return (
      <Root>
        <style scoped>
        {`p { width: 15em; }`}
        </style>

        <Button
          type="primary"
          onClick={this.toggleSize}
          style={{
            position: 'fixed',
            top: '1em',
            right: '1em',
          }}
        >
          Toggle Size
        </Button>

        <style>
        {`p.radio { display: flex; flex-wrap: wrap; width: 15em; }`}
        {`p.radio label { margin-right: .5em; }`}
        </style>

        <h2>Radio</h2>
        <p className="radio">
          <Radio size={size} name="lang" value="zh" label="汉语" isChecked={'zh' === langValue} onChange={this.onChangeLang} />
          <Radio size={size} name="lang" value="ja" label="日本語" isChecked={'ja' === langValue} isDisabled={true}  onChange={this.onChangeLang} />
          <Radio size={size} name="lang" value="en" label="English" isChecked={'en' === langValue}  onChange={this.onChangeLang} />
          <Radio size={size} name="lang" value="tlh" label="Klingon" isChecked={'tlh' === langValue} isDisabled={true} onChange={this.onChangeLang} />
          <Radio size={size} name="lang" value="ava" label="Avarin" isChecked={'ava' === langValue} isDisabled={false} onChange={this.onChangeLang} />

          <br />
          <button onClick={this.onChangeLang.bind(this, null, 'zh')}>Change back to 汉语</button>
        </p>

        <style>
        {`p.radio-group { display: flex; }`}
        {`p.radio-group label { flex: 100%; }`}
        </style>

        <h2>Radio Group</h2>
        <p className="radio-group">
          <RadioGroup
            size={size}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: <b>Tōkyō, Japan</b>, value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            value="newyork"
            onChange={action('RadioGroup changed')}
          />
          <RadioGroup
            size={size}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            currentOptionIdx={1}
            onChange={action('RadioGroup changed')}
          />
        </p>

        <p className="radio-group">
          <RadioGroup
            size={size}
            optionList={[1,2,3,4,5]}
            value={2}
            onChange={action('RadioGroup changed')}
          />
          <RadioGroup
            size={size}
            optionList={[1,2,3,4,5]}
            value="2"
            onChange={action('RadioGroup changed')}
          />
          <RadioGroup
            size={size}
            optionList={['1','2','3','4','5']}
            value="2"
            onChange={action('RadioGroup changed')}
          />
          <RadioGroup
            size={size}
            optionList={['1','2','3','4','5']}
            value={2}
            onChange={action('RadioGroup changed')}
          />
          <RadioGroup
            size={size}
            optionList={['1','2','3','4','5']}
            currentOptionIdx={2}
            onChange={action('RadioGroup changed')}
          />
        </p>

        <h3>Disabling the entire radio group</h3>
        <p className="radio-group">
          <RadioGroup
            size={size}
            isDisabled
            optionList={[
              { label: 'Běijīng, China', value: 'beijing' },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
              { label: 'New York, USA', value: 'newyork', isDisabled: true },
            ]}
            currentOptionIdx={1}
            onChange={action('Radio changed')}
          />

        </p>

        <h2>Check</h2>
        <style>
        {`p.check { display: flex; width: 15em; flex-wrap: wrap; }`}
        {`p.check label { margin-right: .5em; }`}
        </style>
        <p className="check">
          <Check size={size} name="lang" label="汉语" isChecked={true} onChange={action('Check changed')} />
          <Check size={size} name="lang" label="日本語" isChecked={true} onChange={action('Check changed')} />
          <Check size={size} name="lang" label="English" onChange={action('Check changed')} />
          <Check size={size} name="lang" label="Klingon" isDisabled={true} onChange={action('Check changed')} />
        </p>

        <style>
        {`p.check-group { display: flex; }`}
        {`p.check-group label { flex: 100%; }`}
        </style>

        <h2>Check Group</h2>
        <p className="check-group">
          <CheckGroup
            size={size}
            optionList={[
              { label: <b>Běijīng, China</b>, value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            valueList={['beijing','newyork']}
            onChange={action('CheckGroup changed')}
          />
          <CheckGroup
            size={size}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            currentOptionIdxList={[0,3]}
            onChange={action('CheckGroup changed')}
          />
        </p>

        <p className="check-group">
          <CheckGroup
            size={size}
            optionList={[1,2,3,4,5]}
            valueList={[2,3]}
            onChange={action('CheckGroup changed')}
          />
          <CheckGroup
            size={size}
            optionList={[1,2,3,4,5]}
            valueList={['2', '3']}
            onChange={action('CheckGroup changed')}
          />
          <CheckGroup
            size={size}
            optionList={['1','2','3','4','5']}
            valueList={['2', '3']}
            onChange={action('CheckGroup changed')}
          />
          <CheckGroup
            size={size}
            optionList={['1','2','3','4','5']}
            valueList={[2, 3]}
            onChange={action('CheckGroup changed')}
          />
          <CheckGroup
            size={size}
            optionList={['1','2','3','4','5']}
            currentOptionIdxList={[2, 3]}
            onChange={action('CheckGroup changed')}
          />
        </p>

        <h3>Disabling the entire check group</h3>
        <p className="check-group">
          <CheckGroup
            size={size}
            isDisabled={true}
            optionList={[
              { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
              { label: 'Tōkyō, Japan', value: 'tokyo' },
              { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
              { label: 'New York, USA', value: 'newyork' },
            ]}
            currentOptionIdxList={[0,3]}
          />
        </p>
      </Root>
    )
  }
}
