import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import util from '@ibot/util'
import { getOptionLabel, getOptionValue, getCurrentOptionIdx } from './util'
const { trimList } = util
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
  }

  static defaultProps = {
    size: 'regular',
    isChecked: false,
    label: '',
    className: '',
    onChange: () => null,
  }

  componentWillReceiveProps({ isChecked: willBeChecked }) {
    const { isChecked } = this.props

    if (willBeChecked !== isChecked) {
      this.setState({ isChecked: willBeChecked })
    }
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
          checked={isChecked}
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

  state = {
    currentOptionIdx: this.currentOptionIdx,
  }

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

    currentOptionIdx: PropTypes.oneOfType([
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

  componentWillReceiveProps(nextProps) {
    const { currentOptionIdx, value } = this.props
    const { currentOptionIdx: nextOptionIdx, value: nextValue } = nextProps

    if (currentOptionIdx !== nextOptionIdx || value !== nextValue) {
      this.setState({
        currentOptionIdx: this::getCurrentOptionIdx(nextProps),
        value: nextValue,
      })
    }
  }

  get currentOptionIdx() {
    return this::getCurrentOptionIdx()
  }

  createOnChangeHandler = (name, value, idx) => () => (
    this.setState(
      { currentOptionIdx: idx, value },
      () => this.props.onChange({ name, value, idx }),
    )
  )

  render() {
    const { name, currentOptionIdx } = this

    const {
      size,
      className,
      optionList,
      isDisabled,
    } = this.props

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
            isChecked={idx === currentOptionIdx}
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
