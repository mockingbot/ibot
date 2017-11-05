import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Switch from '../packages/switch/index'

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
