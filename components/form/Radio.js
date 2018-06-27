import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { trimList } from '../util'
import { getOptionLabel, getOptionValue, checkOptionByValue } from './util'

import isEqual from 'lodash/isEqual'

/**
 * <Radio>
 */
export class Radio extends PureComponent {
  state = {
    prevProps: this.props,
    isChecked: this.props.isChecked,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    className: PropTypes.string,

    label: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,

    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',

    isChecked: false,
    label: '',
    className: '',

    onChange: () => null,
    onToggle: () => null,
  }

  static getDerivedStateFromProps(props, { prevProps, isChecked }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, isChecked: props.isChecked }
    }
    return null
  }

  onToggle = () => {
    const { name, value, label } = this.props

    this.setState(
      { isChecked: true },
      () => {
        const { onToggle, onChange } = this.props
        onToggle(true, name, value || label)
        onChange(name, value || label, true)
      },
    )
  }

  render() {
    const { size, theme, className, label, name, isDisabled } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={
          trimList([
            theme === 'core' ? 'CoreRadio' : 'Radio',
            size,
            className,
            isChecked ? 'is-checked' : '',
            isDisabled ? 'is-disabled' : '',
          ])
        }
      >
        <input
          type="radio"
          defaultChecked={isChecked}
          disabled={isDisabled}
          name={name}
          onClick={this.onToggle}
        />

        <span className="Check-state" />
        <span className="Check-label">{ label }</span>
      </label>
    )
  }
}

/**
 * <RadioGroup>
 */
export class RadioGroup extends PureComponent {
  name = this.props.name || Math.random().toString(36).substring(2, 15)

  state = {
    prevProps: this.props,
    value: this.props.value,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    className: PropTypes.string,

    name: PropTypes.string,

    optionList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
          label: PropTypes.any,
          value: PropTypes.any,
          isDisabled: PropTypes.bool,
        }),
      ])
    ).isRequired,

    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    isDisabled: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',

    className: '',
    optionList: [],
    isDisabled: false,

    onChange: () => null,
    onToggle: () => null,
  }

  static getDerivedStateFromProps(props, { prevProps, value }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, value: props.value }
    }
    return null
  }

  createOnChangeHandler = (name, value, idx) => () => (
    this.setState(
      { value },
      () => {
        const { onToggle, onChange } = this.props

        onToggle(value, name)
        onChange({ name, value, idx })
      },
    )
  )

  render() {
    const { name } = this

    const {
      size, theme,
      className,
      optionList,
      isDisabled,
    } = this.props

    const { value } = this.state

    const klass = trimList([
      theme === 'core' ? 'CoreRadioGroup' : 'RadioGroup',
      size,
      className,
      isDisabled && 'is-disabled',
    ])

    return (
      <span className={klass}>
      {
        optionList
        .map((opt, idx) => opt && (
          <Radio
            key={idx}
            name={name}
            size={size}
            theme={theme}

            label={getOptionLabel(opt)}
            type="radio"
            isChecked={checkOptionByValue(opt, value)}
            isDisabled={isDisabled || opt.isDisabled}

            onChange={
              !(isDisabled || opt.isDisabled)
              ? this.createOnChangeHandler(name, getOptionValue(opt), idx)
              : undefined
            }
          />
        ))
      }
      </span>
    )
  }
}

export function CoreRadio(props) {
  return <Radio {...props} theme="core" />
}

export function CoreRadioGroup(props) {
  return <RadioGroup {...props} theme="core" />
}
