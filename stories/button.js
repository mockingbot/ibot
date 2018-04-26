import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'

import {
  Root,
  Button, CoreButton,
  PrimaryCoreButton,
  SecondaryCoreButton, RegularCoreButton,
  TertiaryCoreButton,
} from '../components'

storiesOf('Button', module)
.add('default', () => <ButtonExample />)

class ButtonExample extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isSmall: false }
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  render() {
    const { isSmall } = this.state
    const size = isSmall ? 'small' : 'regular'

    return (
      <Root>
        <Button
          type="primary"
          onClick={this.toggleSize}
          style={{
            position: 'fixed',
            right: '1em',
            top: '1em',
          }}
        >
          Toggle Size
        </Button>

        <style scoped>
        {`p.button button { margin-right: 1em; }`}
        {`p.button .icon { font-size: 1.1em; vertical-align: -.1em }`}
        {`p.button.same-width button:not(.text) { min-width: 5em; }`}
        </style>

        <h2>Types</h2>
        <p className="button">
          <Button type="primary" size={size}>Primary</Button>
          <Button size={size}>Default (regular)</Button>
          <Button type="regular" size={size} icon="save">Regular w/ icon</Button>
          <Button type="text" size={size}>Text</Button>
          <Button type="text" size={size} icon="play" isDisabled={false}>Text w/ icon</Button>
        </p>

        <h3>Disabled</h3>
        <p className="button">
          <Button type="primary" size={size} isDisabled>Primary</Button>
          <Button disabled isDisabled size={size}>Default (regular)</Button>
          <Button type="regular" size={size} icon="save" disabled>Regular w/ icon</Button>
          <Button type="text" size={size} disabled>Text</Button>
          <Button type="text" size={size} icon="play" disabled>Text w/ icon</Button>
        </p>

        <h2>Example</h2>
        <p className="button same-width">
          <Button type="primary" size={size}>Done</Button>
          <Button size={size}>Cancel</Button>
          <Button type="regular" size={size} icon="cog">Settings</Button>
          <Button type="text" size={size}>Learn More</Button>
          <Button type="text" size={size} icon="share">Share</Button>
        </p>

        <p className="button">
          <Button type="text" size={size} icon="like">Like</Button>
          <Button type="text" size={size} icon="single-comment">Comment</Button>
          <Button type="text" size={size} icon="undo" />
        </p>

        <p className="button">
          <Button type="text" size={size} icon="like">讚</Button>
          <Button type="text" size={size} icon="single-comment">留言</Button>
          <Button type="text" size={size} icon="undo" />
        </p>

        <h2>Core Button</h2>
        <h3>Primary</h3>
        <p className="button">
          <PrimaryCoreButton size={size}>Done</PrimaryCoreButton>
          <PrimaryCoreButton disabled size={size}>Done</PrimaryCoreButton>
        </p>

        <h3>Regular/Secondary</h3>
        <p className="button">
          <CoreButton size={size}>Cancel</CoreButton>
          <RegularCoreButton size={size}>Cancel</RegularCoreButton>
          <SecondaryCoreButton size={size}>Cancel</SecondaryCoreButton>
          <SecondaryCoreButton disabled size={size}>Cancel</SecondaryCoreButton>
        </p>

        <h3>Tertiary</h3>
        <p className="button">
          <TertiaryCoreButton size={size}>Fine</TertiaryCoreButton>
          <TertiaryCoreButton disabled size={size}>Fine</TertiaryCoreButton>
        </p>
      </Root>
    )
  }
}
