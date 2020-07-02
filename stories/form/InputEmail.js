import React from 'react'
import { action } from '@storybook/addon-actions'

import Root from '../components/root'
import Button from '../../components/button'
import InputEmail from '../../components/emailInput'
import { FormLabel } from '../../components/formEntry'
import { PanelInputEmail } from '../components/Input'

export default class InputEmailExample extends React.PureComponent {
  state = {
    isSmall: false,
    isCore: false,

    formData: {},
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  onChange = (name, value, e) => this.setState(
    ({ formData }) => ({ formData: { ...formData, [name]: value } }),
    () => action('Email changed')(value, e),
  )

  getFormData = (name, defaultValue) => {
    const value = this.state.formData[name]

    return (
      value === 0 || !!value
        ? value
        : defaultValue
    )
  }

  render () {
    const { isSmall, isCore, formData } = this.state

    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'

    return (
      <Root>
        <style>
          {`
          .FormEntry { width: 20rem; }
          .InputEmail, .CoreInputEmail { width: 100%; }
         `}
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

        <FormLabel name="Regular">
          <InputEmail
            theme={theme}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Small">
          <InputEmail
            size="small"
            theme={theme}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Unstyled">
          <InputEmail
            theme={theme}
            unstyled
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Panel Input">
          <PanelInputEmail
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <h2>Information</h2>
        <FormLabel name="Placeholder">
          <InputEmail
            {...{ size, theme }}
            placeholder="Company Email"
            value={formData.aaa}
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <FormLabel name="Disabled">
          <InputEmail
            {...{ size, theme }}
            disabled
            value="hi@example.com"
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <FormLabel name="Read-only">
          <InputEmail
            {...{ size, theme }}
            readOnly
            value="hi@hello.com"
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <h2>Data binding</h2>
        <FormLabel name="Check below">
          <InputEmail
            {...{ size, theme }}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>

        <FormLabel name="Check above">
          <InputEmail
            {...{ size, theme }}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>
      </Root>
    )
  }
}
