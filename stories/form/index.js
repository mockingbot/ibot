import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../../packages/root/index'
import Icon from '../../packages/icon/index'
import Switch from '../../packages/switch/index'
import Button from '../../packages/button/index'

import {
  FormLabel, FormEntry,
  Input, PanelInput,
  Textarea,
  InputNumber,
  Radio, Check,
  RadioGroup, CheckGroup,
  Select,
} from '../../packages/form/index'

import InputNumberExample from './InputNumber'
import SelectExample from './Select'

const onTypingChange = ({ target: { value } }) => action('Changed').call(null, value)

storiesOf('Form Components', module)
.add('Input', () => (
  <Root>
    <style scoped>
    {`p { width: 15em; }`}
    {`.Input, textarea { margin-bottom: .5em; width: 100%; }`}
    {`.PanelInput { max-width: 6em; width: auto; }`}
    </style>

    <h2>Text input</h2>
    <p>
      <Input placeholder="Type something here…" onChange={onTypingChange} />
      <br />
      <Input defaultValue="A text input with initial value." onChange={onTypingChange} />
      <br />
      <Input disabled placeholder="A disabled text input" onChange={onTypingChange} />
      <br />
      <Input readOnly value="A read-only text input" onChange={onTypingChange} />
    </p>

    <h2>Email input</h2>
    <p>
      <Input type="email" placeholder="Input email here…" onChange={onTypingChange} />
    </p>

    <h2>Panel input</h2>
    <p>
      <PanelInput placeholder="Helvetica?" onChange={onTypingChange} />
    </p>


    <style>
    {`
      .InputNumber { margin-right: 1em; width: 6em; }
    `}
    </style>
    <h2>Input number</h2>
    <div className="input-number">
      <InputNumber
        value={1}
        min={-1000}
        suffix="°"
        onChange={action('Number changed')}
      />
      <InputNumber
        value={0}
        step={10}
        precision={0}
        onChange={action('Number changed')}
      />

      <InputNumber
        max={1000}
        min={0}
        value={5}
        step={3}
        prefix="+"
        suffix="℃"
        precision={0}
        onChange={action('Number changed')}
      />

      <InputNumber
        max={1000}
        min={-100}
        value={5}
        step={10}
        suffix="%"
        precision={0}
        onChange={action('Number changed')}
      />

      <InputNumber
        max={1000}
        min={0}
        value={0}
        step={10}
        prefix="$"
        precision={0}
        onChange={action('Number changed')}
      />
      <InputNumber
        isDisabled={true}
        max={1000}
        min={0}
        value={0}
        step={10}
        formatter={value => `$${value}`}
        parser={value => value.replace("$", "")}
        precision={0}
        onChange={action('Number changed')}
      />
    </div>

    <h2>Textarea</h2>
    <p>
      <Textarea placeholder="Type some paragraphs of text here…" onChange={onTypingChange} />
      <br />
      <Textarea defaultValue="A textarea with initial value." onChange={onTypingChange} />
      <br />
      <Textarea disabled placeholder="A disabled textarea" onChange={onTypingChange} />
      <br />
      <Textarea readOnly placeholder="A read-only textarea" onChange={onTypingChange} />
    </p>
  </Root>
))

.add('Number', () => <InputNumberExample />)

.add('Radio/Check', () => (
  <Root>
    <style scoped>
    {`p { width: 15em; }`}
    </style>

    <h2>Native Radio</h2>
    <p style={{ width: '100%' }}>
      <label><input type="radio" name="nr" defaultChecked /> 汉语</label>
      <label><input type="radio" name="nr" /> 日本語</label>
      <label><input type="radio" name="nr" disabled /> English</label>
      <label><input type="radio" name="nr" /> Klingon</label>
    </p>

    <style>
    {`p.radio { display: flex; flex-wrap: wrap; width: 15em; }`}
    {`p.radio label { margin-right: .5em; }`}
    </style>

    <h2>Radio</h2>
    <p className="radio">
      <Radio name="lang" value="zh" label="汉语" isChecked={true} onChange={action('Radio changed')} />
      <Radio name="lang" value="ja" label="日本語" isDisabled={true} onChange={action('Radio changed')} />
      <Radio name="lang" value="en" label="English" onChange={action('Radio changed')} />
      <Radio name="lang" value="tlh" label="Klingon" isDisabled={true} onChange={action('Radio changed')} />
    </p>

    <style>
    {`p.radio-group { display: flex; }`}
    {`p.radio-group label { flex: 100%; }`}
    </style>

    <h2>Radio Group</h2>
    <p className="radio-group">
      <RadioGroup
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

    <h3>Disabling the entire radio group</h3>
    <p className="radio-group">
      <RadioGroup
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

    <h2>Native Check</h2>
    <p style={{ width: '100%' }}>
      <label><input type="checkbox" name="nr" /> 汉语</label>
      <label><input type="checkbox" name="nr" /> 日本語</label>
      <label><input type="checkbox" name="nr" defaultChecked /> English</label>
      <label><input type="checkbox" name="nr" disabled /> Klingon</label>
    </p>

    <h2>Check</h2>
    <style>
    {`p.check { display: flex; width: 15em; flex-wrap: wrap; }`}
    {`p.check label { margin-right: .5em; }`}
    </style>
    <p className="check">
      <Check name="lang" label="汉语" isChecked={true} onChange={action('Check changed')} />
      <Check name="lang" label="日本語" isChecked={true} onChange={action('Check changed')} />
      <Check name="lang" label="English" onChange={action('Check changed')} />
      <Check name="lang" label="Klingon" isDisabled={true} onChange={action('Check changed')} />
    </p>

    <style>
    {`p.check-group { display: flex; }`}
    {`p.check-group label { flex: 100%; }`}
    </style>

    <h2>Check Group</h2>
    <p className="check-group">
      <CheckGroup
        optionList={[
          { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
          { label: 'Tōkyō, Japan', value: 'tokyo' },
          { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
          { label: 'New York, USA', value: 'newyork' },
        ]}
        currentOptionIdxList={[0,3]}
        onChange={({ name, idxList, valueList }) => action('CheckGroup changed').call(null, name, ...idxList, valueList)}
      />
    </p>

    <h3>Disabling the entire check group</h3>
    <p className="check-group">
      <CheckGroup
        isDisabled={true}
        optionList={[
          { label: 'Běijīng, China', value: 'beijing', isDisabled: true },
          { label: 'Tōkyō, Japan', value: 'tokyo' },
          { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok', isDisabled: true },
          { label: 'New York, USA', value: 'newyork' },
        ]}
        currentOptionIdxList={[0,3]}
        onChange={({ name, idxList, valueList }) => action('CheckGroup changed').call(null, name, ...idxList, valueList)}
      />
    </p>
  </Root>
))
.add('Select', () => <SelectExample />)
.add('Form Entries', () => (
  <Root>
    <style scoped>
    {`
      form { width: 25em; }
      .language-list label { flex: 100%; }

      .Select > button .icon,
      .select-menu-with-icons .icon {
        margin-right: .25em;
        font-size: 1.2em;
        vertical-align: -.1em;
      }
    `}
    </style>

    <h2>Form Labels/Entries</h2>
    <form>
      <FormLabel name="Name" isRequired={true}>
        <Input placeholder="Tell us who you are…" />
      </FormLabel>

      <FormEntry name="Gender">
        <RadioGroup
          optionList={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'O' },
          ]}
          currentOptionIdx={2}
        />
      </FormEntry>

      <FormLabel name="Email" isRequired={true}>
        <Input type="email" defaultValue="who@am.i" />
      </FormLabel>

      <FormLabel name="ID">
        <Input readOnly defaultValue="@necolas" />
      </FormLabel>

      <FormLabel name="Data">
        <Switch isChecked={true} />
      </FormLabel>

      <FormLabel name="Bio">
        <Textarea disabled placeholder="Verify your email to modify your bio." />
      </FormLabel>

      <FormLabel name="Address">
        <Textarea defaultValue={
`1600 Pennsylvania Ave. NW
Washington DC 20006
USA`
        }>
        </Textarea>
      </FormLabel>

      <FormLabel name="Continent">
        <Select
          menuClassName="select-menu-with-icons"
          optionList={[
            <span><Icon name="room_service" type="md" /> Asia</span>,
            <span><Icon name="golf_course" type="md" /> Africa</span>,
            <span><Icon name="kitchen" type="md" /> North America</span>,
            <span><Icon name="beach_access" type="md" /> South America</span>,
            <span><Icon name="ac_unit" type="md" /> Antarctica</span>,
            <span><Icon name="spa" type="md" /> Europe</span>,
            <span><Icon name="child_care" type="md" /> Oceania</span>,
          ]}
        />
      </FormLabel>
      <FormEntry name="Planet">
        <RadioGroup
          optionList={[
            { label: 'Earth' },
            { label: 'The other 7' },
            { label: 'Not in Solar System' },
          ]}
          currentOptionIdx={2}
        />
      </FormEntry>

      <FormLabel name="Newsletter">
        <Check
          isChecked={true}
          label="I would like to receive newsletters from MockingBot in the future."
        />
      </FormLabel>

      <FormEntry name="Languages">
        <CheckGroup
          className="language-list"
          optionList={[
            { label: 'JavaScript' },
            { label: 'Ruby on Rails' },
            { label: 'Python' },
            { label: 'C/C++/C♯/Objective C' },
            { label: 'Go' },
            { label: 'Node.js' },
            { label: 'Perl' },
            { label: '珍珠語言（PerlYuYan）' },
          ]}
          currentOptionIdxList={[0,1,5]}
        />
      </FormEntry>
    </form>
  </Root>
))
