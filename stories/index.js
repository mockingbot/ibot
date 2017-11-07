import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import shuffle from 'lodash/shuffle'

// for now, need to ref the src directly otherwise webpack would resolve to the build version on lib
// TODO: only add module property of package.json in build time to avoid this issue
import Root from '../packages/root/index'
import ColorPicker from '../packages/color-picker/src/index'
import Icon from '../packages/icon/index'
import Button from '../packages/button/index'

import {
  FormLabel, FormEntry,
  Input, Textarea, InputNumber,
  Radio, Check,
  RadioGroup, CheckGroup,
  Select,
} from '../packages/form/index'

import Switch from '../packages/switch/index'
import Modal from '../packages/modal/index'

import iconList from '../packages/icon/icon-list'

storiesOf('Color Picker', module)
.add('Default', () => {
  const themes = Array(9).fill(null).map(() => `#${(Math.random() * 0xFFFFFF >> 0).toString(16)}`)

  return (
    <Root>
      <ColorPicker
        color="#ccaa55"
        opacity={100}
        themes={themes}
        style={{left: 50, top: 30}}
        onChange={() => null}
      />
    </Root>
  )
})

storiesOf('Icon', module)
.add('MockingBot', () => (
  <Root>
    <style>
    {`
      h2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      h2 button {
        font-size: .875rem;
      }

      h2 + div {
        margin-top: -1em;
        columns: 3;
      }

      .label {
        display: flex;
        align-items: center;
        height: 3em;
        color: #999;
      }

      .icon {
        margin-right: .25em;
        font-size: 2em;
        color: #eb5648;
      }
    `}
    </style>

    <h2>
      21 randomly-picked icons
      <Button type="primary" onClick={() => location.reload()}>Get A New Batch</Button>
    </h2>

    <div>
    { shuffle(iconList).slice(0, 21).map(icon => (
      <div key={icon.id} className="label">
        <Icon name={icon.id} />
        { icon.id }
      </div>
    )) }
    </div>
  </Root>
))

storiesOf('Button', module)
.add('default', () => (
  <Root>
    <style scoped>
    {`p.button button { margin-right: 1em; }`}
    {`p.button .icon { font-size: 1.1em; vertical-align: -.1em }`}
    {`p.button.same-width button:not(.text) { min-width: 5em; }`}
    </style>

    <h2>Types</h2>
    <p className="button">
      <Button type="primary">Primary</Button>
      <Button>Default (regular)</Button>
      <Button type="regular" icon="save">Regular w/ icon</Button>
      <Button type="text">Text</Button>
      <Button type="text" icon="play" isDisabled={false}>Text w/ icon</Button>
    </p>

    <h3>Disabled</h3>
    <p className="button">
      <Button type="primary" isDisabled>Primary</Button>
      <Button disabled isDisabled>Default (regular)</Button>
      <Button type="regular" icon="save" disabled>Regular w/ icon</Button>
      <Button type="text" disabled>Text</Button>
      <Button type="text" icon="play" disabled>Text w/ icon</Button>
    </p>

    <h2>Example</h2>
    <p className="button same-width">
      <Button type="primary">Done</Button>
      <Button>Cancel</Button>
      <Button type="regular" icon="cog">Settings</Button>
      <Button type="text">Learn More</Button>
      <Button type="text" icon="share">Share</Button>
    </p>

    <p className="button">
      <Button type="text" icon="like">Like</Button>
      <Button type="text" icon="single-comment">Comment</Button>
      <Button type="text" icon="undo" />
    </p>

    <p className="button">
      <Button type="text" icon="like">讚</Button>
      <Button type="text" icon="single-comment">留言</Button>
      <Button type="text" icon="undo" />
    </p>
  </Root>
))

storiesOf('Switch', module)
.add('On/off', () => (
  <Root>
    <p>
      A hot quick preview.{' '}
      <Switch onChange={action('checked')} />

      <br />
      跟汉字搭配{' '}
      <Switch onChange={action('checked')} />
    </p>

    <p>
      On/off:{' '}
      <Switch isChecked={false} onChange={action('checked')} />
      <Switch isChecked={true} onChange={action('checked')} />
    </p>

    <p>
      With icons:{' '}
      <Switch isChecked={true} onChange={action('checked')} icon="pencil" />
      <Switch isChecked={true} onChange={action('checked')} icon="single-comment" />
    </p>

    <p>
      Disabled:{' '}
      <Switch isChecked={false} isDisabled={true} onChange={action('checked')} />
      <Switch isChecked={true} isDisabled={true} onChange={action('checked')} />
      <Switch isChecked={false} isDisabled={true} onChange={action('checked')} icon="pencil" />
      <Switch isChecked={true} isDisabled={true} onChange={action('checked')} icon="single-comment" />
    </p>
  </Root>
))

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

    <h2>Input number</h2>
    <div>
      <InputNumber
        max={1000}
        min={-100}
        value={1}
        onChange={value => console.log(value)}
      />
      <InputNumber
        max={1000}
        min={-100}
        value={0}
        step={10}
        precision={0}
        onChange={value => console.log(value)}
      />
      <InputNumber
        max={1000}
        min={-100}
        value={0}
        step={10}
        formatter={value => `${value}%`}
        parser={value => value.replace("%", "")}
        precision={0}
        onChange={value => console.log(value)}
      />
      <InputNumber
        max={1000}
        min={0}
        value={0}
        step={10}
        formatter={value => `$${value}`}
        parser={value => value.replace("$", "")}
        precision={0}
        onChange={value => console.log(value)}
      />
      <InputNumber
        disabled={true}
        max={1000}
        min={0}
        value={0}
        step={10}
        formatter={value => `$${value}`}
        parser={value => value.replace("$", "")}
        precision={0}
        onChange={value => console.log(value)}
      />
    </div>

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
      <label><input type="checkbox" name="nc" /> 汉语</label>
      <label><input type="checkbox" name="nc" /> 日本語</label>
      <label><input type="checkbox" name="nc" defaultChecked /> English</label>
      <label><input type="checkbox" name="nc" disabled /> Klingon</label>
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

storiesOf('Modal', module)
.add('Default', () => (
  <Root>
    <Modal isOpen={true} />
  </Root>
))
.add('Openers', () => (
  <Root>
    <p>
      <Modal
        openerType="switch"

        isOpen={true}
        title="Modal’s Title"
      >
        Modal opened with <Switch />
      </Modal>
    </p>

    <p>
      <style scoped>
      {`p button { margin-right: 1em; }`}
      {`p button .icon { font-size: 1.2em; vertical-align: -.1em }`}
      </style>

      <Modal
        opener="Open a Modal"
        openerType="primary"

        isOpen={false}
        title="Modal’s Title"
      >
        Modal opened with a button
      </Modal>

      <Modal
        opener="Open a Modal"
        openerType="regular"

        isOpen={false}
        title="Modal’s Title"
      >
        Modal opened with a button
      </Modal>

      <Modal
        opener="Open a Modal"
        openerType="text"

        isOpen={false}
        title="Modal’s Title"
      >
        Modal opened with a button
      </Modal>

      <Modal
        isOpen={false}
        opener={[<Icon key="icon" name="share" />, 'Open a Modal']}
        openerType="text"
        title="Modal’s Title"
      >
        Modal opened with a button
      </Modal>
    </p>
  </Root>
))
.add('Advanced', () => (
  <Root>
    <style>
    {`h2 + .form-entry { margin-top: -1em; }`}
    {`.alert-modal p, .form-modal p { margin: .5em 0; }`}
    {`.form-entry > .key { flex-basis: 15em; }`}
    {`button.text .icon { margin-right: .25em; font-size: 1.1em; vertical-align: -.1em; }`}
    </style>

    <h2>Alert</h2>
    <FormLabel name="Default">
      <Modal
        opener="Alert"
        openerType="text"

        type="alert"
        title="Warning"
      >
        <p>
          An alert automatically comes with a confirm button,
          whether you provide the <code>onConfirm</code> callback or not.
        </p>
      </Modal>
    </FormLabel>


    <FormLabel name="Action Callbacks">
      <Modal
        openerType="switch"

        type="alert"
        title="Warning"

        onConfirm={() => alert('You confirmed!')}
        confirmText="Try Me!"

        onCancel={() => alert('You cancelled!')}
        cancelText="Nope!"
      >
        <p>Something serious just happened!</p>
        <p>P.S. Try the cancel and confirm buttons below.</p>
      </Modal>
    </FormLabel>

    <FormLabel name="Not closing after actions">
      <Modal
        openerType="switch"

        type="alert"
        title="Warning"

        onConfirm={() => alert('You confirmed!')}
        onCancel={() => alert('You cancelled!')}
        shouldCloseOnAction={false}
      >
        <p>Try the cancel and confirm buttons below.</p>
        <p>You get to decide whether to close the modal after actions or not.</p>
      </Modal>
    </FormLabel>

    <FormLabel name={<span>Can’t close <strong> (serious)</strong></span>}>
      <Modal
        openerType="switch"

        type="alert"
        title="Inclosable Modal"
        portalClassName="cant-close-modal-portal"

        canClose={false}

        onOpen={() => Object.assign(window, {
          ccm_interval: setInterval(() => {
            try {
              const $portal = document.querySelector('.cant-close-modal-portal')
              const $countdown = $portal.querySelector('.countdown')
              let countdown = parseInt($countdown.innerHTML)

              countdown--
              $countdown.innerHTML = `${countdown}s`

              if (countdown <= 0) {
                clearInterval(window.ccm_interval)

                /**
                 * **NOTE** Removing the `is-open` class is not a good way to
                 * close a modal, you should instead alter the `isOpen` property
                 * of the component in its stateful parent for such purpose.
                 */
                $portal.classList.remove('is-open')
              }
            } catch (e) {
              clearInterval(window.ccm_interval)
            }
          }, 1000)
        })}
      >
        <p>This modal cannot be closed manually.</p>
        <p>
          Provide an <code>onOpen</code> callback and set a timeout to
          close the modal by altering its <code>isOpen</code> property.
        </p>

        <p>
          This modal will be closed in {' '}
          <span className="countdown" style={{ color: '#eb5648' }}>7s</span>
          {' '} automatically.
        </p>
      </Modal>
    </FormLabel>

    <FormLabel name="Can’t close via clicking mask">
      <Modal
        openerType="switch"

        type="alert"
        title="Warning"

        canCloseOnClickMask={false}
      >
        <p>
          This modal cannot be closed through clicking mask.
        </p>

        <p>P.S. Other regular modals can.</p>
      </Modal>
    </FormLabel>

    <FormLabel name="Can’t close/confirm with key-pressing">
      <Modal
        openerType="switch"

        type="alert"
        title="Warning"

        canCloseOnEsc={false}
        canConfirmOnEnter={false}
      >
        <p>
          This modal cannot be closed via pressing <kbd>Esc</kbd> key
          and cannot be confirmed via pressing <kbd>Enter</kbd> key.
        </p>

        <p>P.S. Other regular modals can.</p>
      </Modal>
    </FormLabel>


    <h2>Form</h2>
    <FormLabel name="Add New Master">
      <Modal
        openerType="text"
        opener={<Icon name="plus" />}
        className="master-modal"

        type="form"
        title="New Master"
        onConfirm={action('submit form')}
      >
        <p>All modals will try to focus on the first input element once opened.</p>

        <FormLabel name="Name">
          <Input placeholder="Name the new master" />
        </FormLabel>

        <FormEntry name="Access">
          <RadioGroup
            optionList={[
              { label: 'Public', value: false },
              { label: 'Private', value: true },
            ]}
            currentOptionIdx={1}
          />
        </FormEntry>

        <FormLabel name="Size">
          <style>
          {`
            .master-modal .form-entry > .val > input.regular[type=number] {
              display: inline-block;
              width: 6em;
            }
          `}
          </style>

          <Input type="number" defaultValue={300} />
          &nbsp;&times;&nbsp;
          <Input type="number" defaultValue={50} />
        </FormLabel>
      </Modal>
    </FormLabel>

    <FormLabel name="Transfer Screen(s)">
      <Modal
        opener={<Icon name="exchange" />}
        openerType="text"

        type="form"
        title="Transfer Screen(s)"
      >
        <FormLabel>
        </FormLabel>
      </Modal>
    </FormLabel>

    <FormLabel name="Y-position">
      <Modal
        openerType="switch"

        type="form"
        title="Demo for Modals"
      >
        <p>
          Generally, modals will be positioned at 20vh vertically.
        </p>
      </Modal>
    </FormLabel>

    <FormLabel name="Y-position for slightly-longer modals">
      <Modal
        openerType="switch"

        type="form"
        title="Demo for Slightly-longer Modals"
        className="s-long-modal"
      >
        <style>{`.s-long-modal { height: 500px; }`}</style>
        <p>
          Should the Y position of a slightly-longer modal (except alert)
          is smaller than 20vh while it’s positioned vertically-centered,
          the modal is positioned vertically-centered.
        </p>
      </Modal>
    </FormLabel>

    <FormLabel name="Y-position for long modals">
      <Modal
        openerType="switch"

        type="form"
        title="Demo for Long Modals"
        className="long-modal"
      >
        <style>{`.long-modal { height: 1200px; }`}</style>
        <p>
          Long modals except for alerts will be positioned vertically
          at 50px and there’ll be a 50px bottom margin for visual reason.
        </p>
      </Modal>
    </FormLabel>

    <h2>Functional</h2>
    <FormLabel name="Share">
      <Modal
        opener={[<Icon key="icon" name="share" />, 'Share']}
        openerType="text"

        title="Share"
        className="share-modal"
      >
        <style>
        {`.share-modal .form-entry > .key { flex-basis: 10em; }`}
        {`.share-modal .form-entry > .val label { width: 100%; }`}
        </style>

        <p>Embed the app in a website or blog by the code below:</p>
        <Textarea
          readOnly
          value='<iframe src="https://modao.cc/app/123/embed" width="488" height="900" allowTransparency="true" frameborder="0"></iframe>'
          onClick={() => document.querySelector('.share-modal textarea').select()}
          style={{ width: '100%', height: '5em' }}
        />

        <FormEntry name="Access">
          <RadioGroup
            optionList={[
              'Only for Collaborators',
              { label: [
                'Anyone with the URL and optional password:',
                <Input key="input" type="password" />,
              ]}
            ]}
            currentOptionIdx={1}
          />
        </FormEntry>

        <FormEntry name="Preview Settings">
          <CheckGroup
            optionList={[
              'Highlight clickable areas on the screens.',
              'Play the app directly without showing install instructions.',
            ]}
            currentOptionIdxList={[0]}
          />
        </FormEntry>

      </Modal>
    </FormLabel>

    <h2>Display</h2>
    <FormLabel name="Shortcuts">
      <Modal
        opener={[<Icon key="icon" name="keyboard" />, 'Shortcuts']}
        openerType="text"

        type="display"
        title="Shortcuts"
      >
        <p>
          Display modals are designed to display information that
          needs larger spaces, i.e. list of shortcuts.
        </p>
      </Modal>
    </FormLabel>
 </Root>
))
