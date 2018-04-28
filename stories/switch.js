import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Root, Switch } from '../components'

storiesOf('Switch', module)
.add('On/off', () => (
  <Root>
    <h2>Regular</h2>
    <p>
      A hot quick preview.{' '}
      <Switch onChange={action('Switch `isChecked`')} />
    </p>

    <p>
      跟汉字搭配{' '}
      <Switch onChange={action('Switch `isChecked`')} />
    </p>

    <p>
      On/off:{' '}
      <Switch isChecked={true} onChange={action('Switch `isChecked`')} />
      <Switch isChecked={false} onChange={action('Switch `isChecked`')} />
    </p>

    <p>
      Disabled:{' '}
      <Switch isChecked={false} isDisabled onChange={action('Switch `isChecked`')} />
      <Switch isChecked={true} isDisabled={true} onChange={action('Switch `isChecked`')} />
      <Switch isChecked={false} disabled onChange={action('Switch `isChecked`')} icon="pencil" />
      <Switch isChecked={true} disabled={true} onChange={action('Switch `isChecked`')} icon="single-comment" />
    </p>

    <h2>Small</h2>
    <p>
      On/off: {' '}
      <Switch size="small" isChecked={true} onChange={action('Switch `isChecked`')} icon="pencil" />
      <Switch size="small" isChecked={false} onChange={action('Switch `isChecked`')} icon="single-comment" />
    </p>

    <p>
      跟汉字搭配{' '}
      <Switch size="small" onChange={action('Switch `isChecked`')} />
    </p>

    <p>
      Disabled:{' '}
      <Switch size="small" isChecked={false} isDisabled onChange={action('Switch `isChecked`')} />
      <Switch size="small" isChecked={true} isDisabled={true} onChange={action('Switch `isChecked`')} />
      <Switch size="small" isChecked={false} disabled onChange={action('Switch `isChecked`')} icon="pencil" />
      <Switch size="small" isChecked={true} disabled={true} onChange={action('Switch `isChecked`')} icon="single-comment" />
    </p>
  </Root>
))
