import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

// for now, need to ref the src directly otherwise webpack would resolve to the build version on lib
// TODO: only add module property of package.json in build time to avoid this issue
import Root from '../packages/root/index'
import ColorPicker from '../packages/color-picker/src/index'

import {
  FormLabel, FormEntry,
  Input, Textarea,
  Radio, Check,
  RadioGroup, CheckGroup,
} from '../packages/form/index'
import Switch from '../packages/switch/index'
import Modal from '../packages/modal/index'
import ModalAndOpener from '../packages/modal/ModalAndOpener'

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

    <h2>Radio</h2>
    <style>
    {`p.radio { display: flex; flex-wrap: wrap; width: 15em; }`}
    {`p.radio label { flex: 1 1 5em; }`}
    </style>
    <p className="radio">
      <Radio name="lang" value="zh" label="汉语" isChecked={true} />
      <Radio name="lang" value="ja" label="日本語" isDisabled={true} />
      <Radio name="lang" value="en" label="English" />
      <Radio name="lang" value="tlh" label="Klingon" isDisabled={true} />
    </p>

    <h2>Radio Group</h2>
    <style>
    {`p.radio-group { display: flex; }`}
    {`p.radio-group label { flex: 100%; }`}
    </style>
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

    <h2>Check</h2>
    <style>
    {`p.check { display: flex; width: 15em; flex-wrap: wrap; }`}
    {`p.check label { flex: 1 1 5em; }`}
    </style>
    <p className="check">
      <Check name="lang" label="汉语" isChecked={true} />
      <Check name="lang" label="日本語" isChecked={true} />
      <Check name="lang" label="English" />
      <Check name="lang" label="Klingon" isDisabled={true} />
    </p>

    <h2>Check Group</h2>
    <style>
    {`p.check-group { display: flex; }`}
    {`p.check-group label { flex: 100%; }`}
    </style>
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
  </Root>
))
.add('Form Entries', () => (
  <Root>
    <style scoped>
    {`form { width: 25em; }`}
    {`.language-list label { flex: 100%; }`}
    </style>

    <h2>Form Labels/Entries</h2>
    <form>
      <FormLabel name="Name">
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

      <FormLabel name="Email">
        <Input type="email" defaultValue="who@am.i" />
      </FormLabel>

      <FormLabel name="ID">
        <Input readOnly defaultValue="@necolas" />
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
.add('Modal and Opener', () => (
  <Root>
    <p>
      <ModalAndOpener
        openerType="switch"
        isOpen={true}
        title="Modal’s Title"
      >
        {'Modal opened with <Switch />'}
      </ModalAndOpener>
    </p>

    <p>
      <style scoped>
      {`p button { margin-right: 1em; }`}
      {`p button .icon { font-size: 1.2em; vertical-align: -.1em }`}
      </style>

      <ModalAndOpener
        isOpen={false}
        buttonType="primary"
        opener="Open a Modal"
        title="Modal’s Title"
      >
        Modal opened with a button
      </ModalAndOpener>

      <ModalAndOpener
        isOpen={false}
        opener="Open a Modal"
        title="Modal’s Title"
      >
        Modal opened with a button
      </ModalAndOpener>

      <ModalAndOpener
        isOpen={false}
        buttonType="text"
        opener="Open a Modal"
        title="Modal’s Title"
      >
        Modal opened with a button
      </ModalAndOpener>

      <ModalAndOpener
        isOpen={false}
        buttonType="text"
        icon="share"
        opener="Open a Modal"
        title="Modal’s Title"
      >
        Modal opened with a button
      </ModalAndOpener>
    </p>

    <ModalAndOpener
      openerType="div"
      opener="Open a Modal with Some Text"
      isOpen={false}
      title="Modal’s Title"
    >
      Modal opened with some text
    </ModalAndOpener>
  </Root>
))
