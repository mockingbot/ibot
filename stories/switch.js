import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Root, Switch } from '../components'

storiesOf('Switch', module)
.add('On/off', () => (
  <Root>
    <p>
      A hot quick preview.{' '}
      <Switch onChange={action('Switch `isChecked`')} />

      <br />
      跟汉字搭配{' '}
      <Switch onChange={action('Switch `isChecked`')} />
    </p>

    <p>
      On/off:{' '}
      <Switch isChecked={false} onChange={action('Switch `isChecked`')} />
      <Switch isChecked={true} onChange={action('Switch `isChecked`')} />
    </p>

    <p>
      With icons:{' '}
      <Switch isChecked={true} onChange={action('Switch `isChecked`')} icon="pencil" />
      <Switch isChecked={true} onChange={action('Switch `isChecked`')} icon="single-comment" />
    </p>

    <p>
      Disabled:{' '}
      <Switch isChecked={false} isDisabled={true} onChange={action('Switch `isChecked`')} />
      <Switch isChecked={true} isDisabled={true} onChange={action('Switch `isChecked`')} />
      <Switch isChecked={false} isDisabled={true} onChange={action('Switch `isChecked`')} icon="pencil" />
      <Switch isChecked={true} isDisabled={true} onChange={action('Switch `isChecked`')} icon="single-comment" />
    </p>
  </Root>
))
