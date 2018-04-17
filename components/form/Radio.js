import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { trimList } from '../util'
import { getOptionLabel, getOptionValue, checkOptionByValue } from './util'
/**
 * <Radio>
 */
export class Radio extends PureComponent {
  state = { isChecked: this.props.isChecked }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    isChecked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
  }

  static defaultProps = {
    size: 'regular',
    isChecked: false,
    label: '',
    className: '',
    onChange: () => null,
  }

  static getDerivedStateFromProps({ isChecked: willBeChecked }, { isChecked }) {
    if (willBeChecked !== isChecked) {
      return { isChecked: willBeChecked }
    }

    return null
  }

  onChange = () => {
    const { name, value, label } = this.props

    this.setState(
      { isChecked: true },
      () => this.props.onChange(name, value || label, true),
    )
  }

  render() {
    const { size, className, label, name, isDisabled } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={
          trimList([
            'Radio',
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
          onClick={this.onChange}
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

  state = { value: this.props.value }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
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
  }

  static defaultProps = {
    size: 'regular',
    className: '',
    optionList: [],
    isDisabled: false,
    onChange: () => null,
  }

  static getDerivedStateFromProps({ value: nextValue }, { value }) {
    if (value !== nextValue) {
      return { value: nextValue }
    }

    return null
  }

  createOnChangeHandler = (name, value, idx) => () => (
    this.setState(
      { value },
      () => this.props.onChange({ name, value, idx }),
    )
  )

  render() {
    const { name } = this

    const {
      size,
      className,
      optionList,
      isDisabled,
    } = this.props

    const { value } = this.state

    const klass = trimList([
      'RadioGroup',
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
