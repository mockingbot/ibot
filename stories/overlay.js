import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  Root, Icon, Switch, Overlay,
  FormLabel, FormEntry,
  InputNumber, Textarea, Input,
  RadioGroup, CheckGroup,
  Select,
  WidgetName,
} from '../components'

storiesOf('Overlay', module)
.add('Default', () => (
  <Root>
    <style>
      {`html { background-color: #eee; }`}
    </style>
    <Overlay isOpen={true} onClose={action('Overlay closed')} />
  </Root>
))
.add('Openers', () => (
  <Root>
    <style>
      {`html { background-color: #eee; }`}
    </style>

    <p>
      <Overlay
        openerType="switch"

        isOpen={true}
        title="Overlay’s Title"

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        Overlay!
        <div style={{ height: 1000, backgroundColor: '#eee' }} />
        Overlay!
      </Overlay>
    </p>

    <p>
      <Overlay openerType="custom" /* Shall not display */ />

      <Overlay
        openerType="custom" opener="Custom Opener"
        onToggle={action('Overlay toggled, `isOpen`')}
      />
    </p>

    <p>
      <style scoped>
      {`p button { margin-right: 1em; }`}
      {`p button .icon { font-size: 1.2em; vertical-align: -.1em }`}
      </style>

      <Overlay
        opener="Open a Overlay"
        openerType="primary"

        isOpen={false}
        title="Overlay’s Title"

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        <div style={{ background: '#ede', height: 200, padding: '.5em' }}>Overlay opened with a button</div>
      </Overlay>

      <Overlay
        opener="Open a Overlay"
        openerType="regular"

        isOpen={false}
        title="Overlay’s Title"

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        <div style={{ background: '#ede', height: 1200, padding: '.5em' }}>Overlay opened with a button</div>
      </Overlay>

      <Overlay
        opener="Open a Overlay"
        openerType="text"

        isOpen={false}
        title="Overlay’s Title"

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        Overlay opened with a button
      </Overlay>

      <Overlay
        isOpen={false}
        opener={[<Icon key="icon" name="share" />, 'Open a Overlay']}
        openerType="text"
        title="Overlay’s Title"

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        Overlay opened with a button
      </Overlay>
    </p>

    <p>
      Opening an overlay in an overlay:{' '}
      <Overlay
        openerType="switch"

        isOpen={false}
        title="Overlay’s Title"

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        Give me an overlay:{' '}
        <Overlay
          openerType="switch" title="Yay!"
          onToggle={action('MiM toggled, `isOpen`')}
        >
          Overlay in an overlay is open!
        </Overlay>
      </Overlay>
    </p>

    <p>
      Opening an inclosable overlay:{' '}
      <Overlay
        openerType="switch"

        isOpen={false}
        title="Overlay’s Title"
        canClose={false}

        onToggle={action('Overlay toggled, `isOpen`')}
      >
        This overlay is inclosable.
      </Overlay>
    </p>

    <p>
      Confirm/cancel:{' '}

      <Overlay
        openerType="switch"

        isOpen={false}
        title="Are you sure?"

        canClose={true}
        canConfirm={true}
        canCancel={true}

        onToggle={action('Overlay toggled, `isOpen`')}
        onConfirm={action('Overlay confirmed')}
        onCancel={action('Overlay cancelled')}
      >
        您确定要删除「这是一个测试」吗？
      </Overlay>

      <Overlay
        openerType="switch"

        isOpen={false}
        title="Are you sure?"

        canConfirm={false}
        canCancel={false}

        onToggle={action('Overlay toggled, `isOpen`')}
        onConfirm={action('Overlay confirmed')}
        onCancel={action('Overlay cancelled')}
      >
        您确定要删除「这是一个测试」吗？
      </Overlay>
    </p>
  </Root>
))
