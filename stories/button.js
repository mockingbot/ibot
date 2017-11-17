import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Root from '../packages/root/index'
import Icon from '../packages/icon/index'
import Button from '../packages/button/index'

storiesOf('Button', module)
.add('default', () => (
  <Root>
    <style scoped>
    {`p.button button { margin-right: 1em; }`}
    {`p.button .Icon { font-size: 1.1em; vertical-align: -.1em }`}
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

