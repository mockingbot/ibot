import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Switch from '../packages/switch/index'
import Button from '../packages/button/index'

import {
  FormLabel, FormEntry,
  Input, PanelInput,
  Textarea,
  InputNumber,
  Radio, Check,
  RadioGroup, CheckGroup,
  Select,
} from '../packages/form/index'

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

.add('Input Number', () => <InputNumberExample />)

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
.add('Select', () => (
  <Root>
    <style>
    {`
      .Select > button .icon,
      .select-menu-with-icons .icon {
        margin-right: .25em;
        font-size: 1.2em;
        vertical-align: -.1em;
      }

      p .Select {
        margin-right: 1em;
      }
    `}
    </style>

    <h2>Select with empty option list</h2>
    <p>
      <Select optionList={[]} />
      <Select isDisabled={false} optionList={[]} />
      <br />
      <Select isDisabled={true} optionList={[]} />
      <Select isDisabled optionList={[]} />
    </p>

    <h2>Regular node options</h2>
    <p>
      <Select optionList={['Apple', 'Pencil']} onChange={action('Select changed')} />
      <br />
      <Select optionList={['Apple', 'Pencil']} currentOptionIdx="0" onChange={action('Select changed')} />
      <br />
      <Select optionList={['Apple', 'Pencil']}  currentOptionIdx={0} onChange={action('Select changed')} />
      <br />
      <Select optionList={['Apple', 'Pencil']} currentOptionIdx={1} onChange={action('Select changed')} />
      <br />
      <Select optionList={['Apple', 'Pencil']} isDisabled={true} onChange={action('Select changed')} />
    </p>

    <p>
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
        currentOptionIdx={0}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
        currentOptionIdx="1"
        onChange={action('Select changed')}
      />
      <br />
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
        currentOptionIdx="1"
        isDisabled={true}
        onChange={action('Select changed')}
      />
    </p>

    <h2>Long lists (10+ options)</h2>
    <p>
      <Select
        optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        currentOptionIdx="5"
        optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        isDisabled={false}
        currentOptionIdx={10}
        optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        isDisabled
        optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']}
        onChange={action('Select changed')}
      />
    </p>

    <h2>Selects of grouped options</h2>
    <p>
      <Select
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        currentOptionIdx="0.2"
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        currentOptionIdx="1.5"
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        currentOptionIdx="2"
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
        onChange={action('Select changed')}
      />
      <br />
      <Select
        isDisabled
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
        onChange={action('Select changed')}
      />
    </p>
  </Root>
))
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

class InputNumberExample extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { formData: {}, isSmall: true }
  }

  onChange = (name, value) => this.setState(
    ({ formData }) => ({ formData: { ...formData, [name]: value }}),
    () => action('Number changed')(value),
  )

  getFormData = (name, defaultValue) => {
    const value = this.state.formData[name]

    return (
      value === 0 || !!value
      ? value
      : defaultValue
    )
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  render() {
    const { formData, isSmall } = this.state
    const size = isSmall ? 'small' : 'regular'

    return (
      <Root>
        <style>
        {`
          .toggle-size { position: absolute; top: 1em; right: 1em; }
          .FormEntry { width: 12rem; }
          .InputNumber { width: 100%; }
         `}
        </style>

        <Button type="primary" onClick={this.toggleSize} className="toggle-size">
          Toggle Size
        </Button>

        <FormLabel name="Small (default)">
          <InputNumber
            size={size}
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Regular">
          <InputNumber
            size="regular"
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Placeholder">
          <InputNumber
            size={size}
            precision={2}
            placeholder="Height?"
            value={formData.aaa}
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <FormLabel name="With title">
          <InputNumber
            size={size}
            title="W"
            precision={1}
            suffix="px"
          />
        </FormLabel>

        <FormLabel name="Title & prefix">
          <InputNumber
            size={size}
            title="US"
            prefix="$"
          />
        </FormLabel>

        <FormLabel name="Title, prefix, suffix">
          <InputNumber
            size={size}
            title="US"
            prefix="$"
            suffix="刀"
          />
        </FormLabel>

        <FormLabel name="With desc">
          <InputNumber
            size={size}
            desc="Tracking"
            suffix="em"
            step={.125}
            precision={3}
            min={-10}
            max={10}
            value={this.getFormData('tracking', .25)}
            onChange={this.onChange.bind(this, 'tracking')}
          />
        </FormLabel>

        <FormLabel name="With prefix">
          <InputNumber
            size={size}
            precision={2}
            value={formData.b}
            prefix="¥"
            step={5}
            onChange={this.onChange.bind(this, 'b')}
          />
        </FormLabel>

        <FormLabel name="With suffix">
          <InputNumber
            size={size}
            precision={2}
            min={-Infinity}
            value={formData.c}
            suffix="℃"
            onChange={this.onChange.bind(this, 'c')}
          />
        </FormLabel>

        <FormLabel name="Prefix & suffix">
          <InputNumber
            size={size}
            precision={2}
            value={formData.d}
            prefix="+"
            suffix="kg"
            step={3}
            onChange={this.onChange.bind(this, 'd')}
          />
        </FormLabel>

        <FormLabel name="Disabled">
          <InputNumber
            size={size}
            disabled
            value={formData.d}
            precision={2}
            prefix="+"
            suffix="kg"
            step={3}
            onChange={this.onChange.bind(this, 'd')}
          />
        </FormLabel>

        <FormLabel name="Read-only">
          <InputNumber
            size={size}
            readOnly
            value={formData.d}
            precision={2}
            prefix="+"
            suffix="kg"
            step={3}
            onChange={this.onChange.bind(this, 'd')}
          />
        </FormLabel>

        <h2>Precision</h2>
        <FormLabel name="Integer">
          <InputNumber
            size={size}
            precision={0}
            max={100}
            step={2}
            min={-100}
            value={formData.e}
            onChange={this.onChange.bind(this, 'e')}
          />
        </FormLabel>

        <FormLabel name="1">
          <InputNumber
            size={size}
            precision={1}
            value={this.getFormData('g', 1.1)}
            onChange={this.onChange.bind(this, 'g')}
          />
        </FormLabel>

        <FormLabel name="2">
          <InputNumber
            size={size}
            precision={2}
            value={this.getFormData('h', 2.33)}
            onChange={this.onChange.bind(this, 'h')}
          />
        </FormLabel>

        <h2>Step</h2>
        <FormLabel name="Regular">
          <InputNumber
            size={size}
            value={this.getFormData('i', 58)}
            min={-Infinity}
            onChange={this.onChange.bind(this, 'i')}
          />
        </FormLabel>

        <FormLabel name="0.1">
          <InputNumber
            size={size}
            precision={1}
            min={-Infinity}
            step={0.1}
            value={this.getFormData('j', 5.8)}
            onChange={this.onChange.bind(this, 'j')}
          />
        </FormLabel>

        <FormLabel name="0.01">
          <InputNumber
            size={size}
            precision={2}
            min={-Infinity}
            step={0.01}
            value={this.getFormData('k', 1.68)}
            onChange={this.onChange.bind(this, 'k')}
          />
        </FormLabel>

        <FormLabel name="3">
          <InputNumber
            size={size}
            precision={2}
            min={-Infinity}
            step={3}
            value={this.getFormData('l', 230)}
            onChange={this.onChange.bind(this, 'l')}
          />
        </FormLabel>

        <h2>Data binding</h2>
        <FormLabel name="Check below">
          <InputNumber
            size={size}
            precision={3}
            min={-Infinity}
            step={2}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>

        <FormLabel name="Check above">
          <InputNumber
            size={size}
            precision={3}
            min={-Infinity}
            step={2}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>

        <h2>Parser: angle</h2>
        <FormLabel name="Degree">
          <InputNumber
            size={size}
            precision={2}
            suffix="°"
            min={-Infinity}
            parser={v => v%360}
            value={this.getFormData('n', 359)}
            onChange={this.onChange.bind(this, 'n')}
          />
        </FormLabel>

        <h2>Formatter: thousands separator</h2>
        <FormLabel name="Dollars">
          <InputNumber
            size={size}
            precision={2}
            max={10000000}
            min={22000}
            step={100}
            formatter={v => v.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            parser={v => v.replace(/\,/g, '')}
            value={this.getFormData('o', 2332330)}
            onChange={this.onChange.bind(this, 'o')}
          />
        </FormLabel>

        <h2>Max/min</h2>
        <FormLabel name="Max. 10">
          <InputNumber
            size={size}
            precision={2}
            max={10}
            min={-Infinity}
            step={.75}
            value={this.getFormData('mm0', 8)}
            onChange={this.onChange.bind(this, 'mm0')}
          />
        </FormLabel>

        <FormLabel name="Min. 10">
          <InputNumber
            size={size}
            precision={2}
            min={10}
            step={.75}
            value={this.getFormData('mm1', 12)}
            onChange={this.onChange.bind(this, 'mm1')}
          />
        </FormLabel>

        <FormLabel name="10-20">
          <InputNumber
            size={size}
            precision={0}
            min={10}
            max={20}
            step={2}
            value={this.getFormData('mm2', 15)}
            onChange={this.onChange.bind(this, 'mm2')}
          />
        </FormLabel>
      </Root>
    )
  }
}
