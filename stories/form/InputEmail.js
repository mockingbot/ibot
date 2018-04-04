import React from 'react'
import { action } from '@storybook/addon-actions'

import { Root, Button, form } from '../../components'

const {
  FormLabel,
  Input: { InputEmail, PanelInputEmail },
} = form

export default class InputEmailExample extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { formData: {}, isSmall: false }
  }

  onChange = (name, value, e) => this.setState(
    ({ formData }) => ({formData: { ...formData, [name]: value }}),
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

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })

  render() {
    const { formData, isSmall } = this.state
    const size = isSmall ? 'small' : 'regular'

    return (
      <Root>
        <style>
        {`
          .toggle-size { position: fixed; top: 1em; right: 1em; }
          .FormEntry { width: 20rem; }
          .InputEmail { width: 100%; }
         `}
        </style>

        <Button type="primary" onClick={this.toggleSize} className="toggle-size">
          Toggle Size
        </Button>

        <FormLabel name="Regular">
          <InputEmail
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Small">
          <InputEmail
            size="small"
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Unstyled">
          <InputEmail
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
            size={size}
            placeholder="Company Email"
            value={formData.aaa}
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <FormLabel name="Disabled">
          <InputEmail
            size={size}
            disabled
            value="hi@example.com"
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <FormLabel name="Read-only">
          <InputEmail
            size={size}
            readOnly
            value="hi@hello.com"
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <h2>Data binding</h2>
        <FormLabel name="Check below">
          <InputEmail
            size={size}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>

        <FormLabel name="Check above">
          <InputEmail
            size={size}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>
     </Root>
    )
  }
}
