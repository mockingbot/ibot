import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Switch from '../packages/switch/index'

import {
  FormLabel, FormEntry,
  Input, Textarea,
  Radio, Check,
  RadioGroup, CheckGroup,
  Select,
} from '../packages/form/index'

storiesOf('Form Components', module)
.add('Input', () => (
  <Root>
    <style scoped>
    {`p { width: 15em; }`}
    {`input, textarea { margin-bottom: .5em; width: 100%; }`}
    </style>

    <h2>Text input</h2>
    <p>
      <Input placeholder="Type something here…" />
      <br />
      <Input defaultValue="A text input with initial value." />
      <br />
      <Input disabled placeholder="A disabled text input" />
      <br />
      <Input readOnly placeholder="A read-only text input" />
    </p>

    <h2>Email input</h2>
    <p>
      <Input type="email" placeholder="Input email here…" />
    </p>

    <h2>Textarea</h2>
    <p>
      <Textarea placeholder="Type some paragraphs of text here…" />
      <br />
      <Textarea defaultValue="A textarea with initial value." />
      <br />
      <Textarea disabled placeholder="A disabled textarea" />
      <br />
      <Textarea readOnly placeholder="A read-only textarea" />
    </p>
  </Root>
))
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
      <Radio name="lang" value="zh" label="汉语" isChecked={true} />
      <Radio name="lang" value="ja" label="日本語" isDisabled={true} />
      <Radio name="lang" value="en" label="English" />
      <Radio name="lang" value="tlh" label="Klingon" isDisabled={true} />
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
      />
    </p>

    <h3>Disabling the entire radio group</h3>
    <p className="radio-group">
      <RadioGroup
        isDisabled
        optionList={[
          { label: 'Běijīng, China', value: 'beijing' },
          { label: 'Tōkyō, Japan', value: 'tokyo' },
          { label: 'Krung-dēvamahānagara amararatanakosindra mahindrayudhyā mahātilakabhava navaratanarājadhānī purīrāmasya utamarājanivēsana mahāsthāna amaravimāna avatārasthitya shakrasdattiya vishnukarmaprasiddhi, Thailand', value: 'bangkok' },
          { label: 'New York, USA', value: 'newyork', isDisabled: true },
        ]}
        currentOptionIdx={1}
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
      <Check name="lang" label="汉语" isChecked={true} />
      <Check name="lang" label="日本語" isChecked={true} />
      <Check name="lang" label="English" />
      <Check name="lang" label="Klingon" isDisabled={true} />
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
      <Select optionList={['Apple', 'Pencil']} />
      <br />
      <Select optionList={['Apple', 'Pencil']} currentOptionIdx="0" />
      <br />
      <Select optionList={['Apple', 'Pencil']}  currentOptionIdx={0} />
      <br />
      <Select optionList={['Apple', 'Pencil']} currentOptionIdx={1} />
      <br />
      <Select optionList={['Apple', 'Pencil']} isDisabled={true} />
    </p>

    <p>
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
      />
      <br />
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
        currentOptionIdx={0}
      />
      <br />
      <Select
        menuClassName="select-menu-with-icons"
        optionList={[
          <span><Icon name="apple" /> Apple</span>,
          <span><Icon name="pencil" /> Pencil</span>,
        ]}
        currentOptionIdx="1"
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
      />
    </p>

    <h2>Long lists (10+ options)</h2>
    <p>
      <Select optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']} />
      <br />
      <Select currentOptionIdx="5" optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']} />
      <br />
      <Select isDisabled={false} currentOptionIdx={10} optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']} />
      <br />
      <Select isDisabled optionList={['Yirgacheffe', 'Harrar', 'Kenya AA', 'Antiqua Flora', 'Huehuetenango', 'Tanzania AA', 'Cerrado', 'Bucaramanga Supremo', 'Tarrazu', 'Hawaii Kona', 'Blue Mountain', 'Mandheling']} />
    </p>

    <h2>Selects of grouped options</h2>
    <p>
      <Select
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
      />
      <br />
      <Select
        currentOptionIdx="0.2"
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
      />
      <br />
      <Select
        currentOptionIdx="1.5"
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
      />
      <br />
      <Select
        currentOptionIdx="2"
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
      />
      <br />
      <Select
        isDisabled
        optionList={[
          ['Fruit', 'Apples', 'Blackberries', 'Blueberries', 'Bananas', 'Pitayas', 'Mangos'],
          ['Cheese', 'Blue Cheese', 'Parmesan', 'Ricotta', 'Benedictine', 'Brie', { label: 'Cheddar', value: 'cheddar' }, { label: 'Cream Cheese', isDisabled: true }],
          'Rib eye Steak', 'Bacon Sandwich', 'Caesar Salad',
        ]}
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
