import React, { PureComponent } from 'react'
import { action } from '@storybook/addon-actions'

import Root from '../../components/root'
import Button from '../../components/button'
import Input, { Textarea } from '../../components/input'
import InputNumber from '../../components/numberInput'
import InputEmail from '../../components/emailInput'
import { PanelInput, PanelTextarea } from '../components/Input'

const onTypingChange = action('Typing changed')

export default class InputExample extends PureComponent {
  state = {
    isSmall: false,
    isCore: false,
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  render () {
    const { isSmall, isCore } = this.state
    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'

    return (
      <Root>
        <style scoped>
          {`p { width: 15em; }`}
          {`.Input, .CoreInput, textarea { margin-bottom: .5em; width: 100%; }`}
          {`.PanelInput { max-width: 6em; width: auto; }`}
        </style>

        <div
          style={{
            position: 'fixed',
            top: '1em',
            right: '1em',
          }}
        >
          <Button
            type="primary"
            onClick={this.toggleCore}
            style={{ marginRight: '.5em' }}
          >
            Theme: {theme}
          </Button>

          <Button
            type="primary"
            onClick={this.toggleSize}
          >
            Toggle Size
          </Button>
        </div>

        <h2>Text input</h2>
        <p>
          <Input {...{ size, theme }} placeholder="Type something here…" onChange={onTypingChange} />
          <br />
          <Input {...{ size, theme }} isInvalid placeholder="This is invalid…" onChange={onTypingChange} />
          <br />
          <Input {...{ size, theme }} defaultValue="A text input with initial value." onChange={onTypingChange} />
          <br />
          <Input {...{ size, theme }} disabled placeholder="A disabled text input" onChange={onTypingChange} />
          <br />
          <Input {...{ size, theme }} readOnly value="A read-only text input" onChange={onTypingChange} />
          <br />
          <Input {...{ size, theme }} unstyled placeholder="An unstyled text input" onChange={onTypingChange} />
        </p>

        <h2>Email input</h2>
        <p>
          <InputEmail {...{ size, theme }} placeholder="Input email here…" onChange={onTypingChange} />
        </p>

        <h2>Panel input</h2>
        <p>
          <PanelInput placeholder="Helvetica?" onChange={onTypingChange} />
        </p>

        <style>
          {`
          .InputNumber, .CoreInputNumber { margin-right: 1em; width: 6em; }
        `}
        </style>
        <h2>Input number</h2>
        <div className="input-number">
          <InputNumber
            {...{ size, theme }}
            value={1}
            min={-1000}
            suffix="°"
            onChange={action('Number changed')}
          />
          <InputNumber
            {...{ size, theme }}
            value={0}
            step={10}
            precision={0}
            onChange={action('Number changed')}
          />

          <InputNumber
            {...{ size, theme }}
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
            {...{ size, theme }}
            max={1000}
            min={-100}
            value={5}
            step={10}
            suffix="%"
            precision={0}
            onChange={action('Number changed')}
          />

          <InputNumber
            {...{ size, theme }}
            max={1000}
            min={0}
            value={0}
            step={10}
            prefix="$"
            precision={0}
            onChange={action('Number changed')}
          />
          <InputNumber
            {...{ size, theme }}
            isDisabled={true}
            max={1000}
            min={0}
            value={0}
            step={10}
            formatter={value => `$${value}`}
            parser={value => value.replace('$', '')}
            precision={0}
            onChange={action('Number changed')}
          />
        </div>

        <h2>Textarea</h2>
        <p>
          <Textarea {...{ size, theme }} placeholder="Type some paragraphs of text here…" onChange={onTypingChange} />
          <br />
          <Textarea {...{ size, theme }} defaultValue="A textarea with initial value." onChange={onTypingChange} />
          <br />
          <Textarea {...{ size, theme }} disabled placeholder="A disabled textarea" onChange={onTypingChange} />
          <br />
          <Textarea {...{ size, theme }} readOnly placeholder="A read-only textarea" onChange={onTypingChange} />
        </p>

        <h2>Panel textarea</h2>
        <p>
          <PanelTextarea placeholder="What do you want?" onChange={onTypingChange} />
        </p>
      </Root>
    )
  }
}
