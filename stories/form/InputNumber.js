import React from 'react'
import { action } from '@storybook/addon-actions'

import {
  Root, Icon, Button,
  FormLabel,
  InputNumber, SelectNumber, //PanelInputNumber, PanelSelectNumber,
} from '../../components'

export default class InputNumberExample extends React.PureComponent {
  state = {
    isSmall: false,
    isCore: false,
    formData: { a: 0 },
  }

  toggleSize = () => this.setState({ isSmall: !this.state.isSmall })
  toggleCore = () => this.setState({ isCore: !this.state.isCore })

  onChange = (name, value, e) => this.setState(
    ({ formData }) => ({formData: { ...formData, [name]: value }}),
    () => action('Number changed')(value, e),
  )

  getFormData = (name, defaultValue) => {
    const value = this.state.formData[name]

    return (
      value === 0 || value === '' || !!value
      ? value
      : defaultValue
    )
  }

  render() {
    const { isSmall, isCore, formData } = this.state

    const size = isSmall ? 'small' : 'regular'
    const theme = isCore ? 'core' : 'plain'

    return (
      <Root>
        <style>
        {`
          .FormEntry { width: 12rem; }
          .InputNumber, .CoreInputNumber { width: 100%; }
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
          <InputNumber
            theme={theme}
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
            dontSelectOnFocus
          />
        </FormLabel>

        <FormLabel name="Small">
          <InputNumber
            size="small"
            theme={theme}
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="Unstyled">
          <InputNumber
            theme={theme}
            unstyled
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        {/*
        <FormLabel name="Panel Input">
          <PanelInputNumber
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <FormLabel name="With options">
          <PanelSelectNumber
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>
          */}

        <FormLabel name="With options">
          <SelectNumber
            theme={theme}
            optionList={[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 64, 128, 256]}
            precision={2}
            value={formData.a}
            onChange={this.onChange.bind(this, 'a')}
          />
        </FormLabel>

        <h2>Information</h2>
        <FormLabel name="Placeholder">
          <InputNumber
            {...{ size, theme }}
            min={1}
            max={200}
            precision={2}
            placeholder="Height?"
            value={formData.aaa}
            onChange={this.onChange.bind(this, 'aaa')}
          />
        </FormLabel>

        <FormLabel name="With title">
          <InputNumber
            {...{ size, theme }}
            title="W"
            precision={1}
            suffix="px"
          />
        </FormLabel>

        <FormLabel name="Icon title">
          <InputNumber
            {...{ size, theme }}
            className="degree-input-number"
            title={<Icon name="degree" type="dora" />}
            precision={1}
            suffix="°"
          />
        </FormLabel>

        <FormLabel name="Title & prefix">
          <InputNumber
            {...{ size, theme }}
            title="US"
            prefix="$"
          />
        </FormLabel>

        <FormLabel name="Title, prefix, suffix">
          <InputNumber
            {...{ size, theme }}
            title="US"
            prefix="$"
            suffix="刀"
          />
        </FormLabel>

        <FormLabel name="With desc">
          <InputNumber
            {...{ size, theme }}
            desc="Tracking"
            suffix="em"
            step={.125}
            precision={3}
            min={-10}
            max={10}
            value={this.getFormData('tracking', .25)}
            onChange={this.onChange.bind(this, 'tracking')}
          />
        </FormLabel>

        <FormLabel name="With prefix">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            value={formData.b}
            prefix="¥"
            step={5}
            onChange={this.onChange.bind(this, 'b')}
          />
        </FormLabel>

        <FormLabel name="With suffix">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            min={-Infinity}
            value={formData.c}
            suffix="℃"
            onChange={this.onChange.bind(this, 'c')}
          />
        </FormLabel>

        <FormLabel name="Prefix & suffix">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            value={formData.d}
            prefix="+"
            suffix="kg"
            step={3}
            onChange={this.onChange.bind(this, 'd')}
          />
        </FormLabel>

        <FormLabel name="Disabled">
          <InputNumber
            {...{ size, theme }}
            disabled
            value={formData.d}
            precision={2}
            prefix="+"
            suffix="kg"
            step={3}
            onChange={this.onChange.bind(this, 'd')}
          />
        </FormLabel>

        <FormLabel name="Read-only">
          <InputNumber
            {...{ size, theme }}
            readOnly
            value={formData.d}
            precision={2}
            prefix="+"
            suffix="kg"
            step={3}
            onChange={this.onChange.bind(this, 'd')}
          />
        </FormLabel>

        <h2>Precision</h2>
        <FormLabel name="Integer">
          <InputNumber
            {...{ size, theme }}
            precision={0}
            max={100}
            step={2}
            min={-100}
            value={formData.e}
            onChange={this.onChange.bind(this, 'e')}
          />
        </FormLabel>

        <FormLabel name="1">
          <InputNumber
            {...{ size, theme }}
            precision={1}
            value={this.getFormData('g', 1.1)}
            onChange={this.onChange.bind(this, 'g')}
          />
        </FormLabel>

        <FormLabel name="2">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            value={this.getFormData('h', 2.33)}
            onChange={this.onChange.bind(this, 'h')}
          />
        </FormLabel>

        <h2>Step</h2>
        <FormLabel name="Regular">
          <InputNumber
            {...{ size, theme }}
            value={this.getFormData('i', 58)}
            min={-Infinity}
            onChange={this.onChange.bind(this, 'i')}
          />
        </FormLabel>

        <FormLabel name="0.1">
          <InputNumber
            {...{ size, theme }}
            precision={1}
            min={-Infinity}
            step={0.1}
            value={this.getFormData('j', 5.8)}
            onChange={this.onChange.bind(this, 'j')}
          />
        </FormLabel>

        <FormLabel name="0.01">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            min={-Infinity}
            step={0.01}
            value={this.getFormData('k', 1.68)}
            onChange={this.onChange.bind(this, 'k')}
          />
        </FormLabel>

        <FormLabel name="3">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            min={-Infinity}
            step={3}
            value={this.getFormData('l', 230)}
            onChange={this.onChange.bind(this, 'l')}
          />
        </FormLabel>

        <h2>Data binding</h2>
        <FormLabel name="Check below">
          <InputNumber
            {...{ size, theme }}
            precision={3}
            min={-Infinity}
            step={2}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>

        <FormLabel name="Check above">
          <InputNumber
            {...{ size, theme }}
            precision={3}
            min={-Infinity}
            step={2}
            value={this.getFormData('m', 233.666)}
            onChange={this.onChange.bind(this, 'm')}
          />
        </FormLabel>

        <h2>Parser: angle</h2>
        <FormLabel name="Degree">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            suffix="°"
            min={-Infinity}
            parser={v => v%360}
            value={this.getFormData('n', 359)}
            onChange={this.onChange.bind(this, 'n')}
          />
        </FormLabel>

        <h2>Formatter: thousands separator</h2>
        <FormLabel name="Dollars">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            max={10000000}
            min={22000}
            step={100}
            formatter={v => v.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            parser={v => v.replace(/\,/g, '')}
            value={this.getFormData('o', 2332330)}
            onChange={this.onChange.bind(this, 'o')}
          />
        </FormLabel>

        <h2>Max/min</h2>
        <FormLabel name="Max. 10">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            max={10}
            min={-Infinity}
            step={.75}
            value={this.getFormData('mm0', 8)}
            onChange={this.onChange.bind(this, 'mm0')}
          />
        </FormLabel>

        <FormLabel name="Min. 10">
          <InputNumber
            {...{ size, theme }}
            precision={2}
            min={10}
            step={.75}
            value={this.getFormData('mm1', 12)}
            onChange={this.onChange.bind(this, 'mm1')}
          />
        </FormLabel>

        <FormLabel name="10-20">
          <InputNumber
            {...{ size, theme }}
            precision={0}
            min={10}
            max={20}
            step={2}
            value={this.getFormData('mm2', 15)}
            onChange={this.onChange.bind(this, 'mm2')}
          />
        </FormLabel>
      </Root>
    )
  }
}
