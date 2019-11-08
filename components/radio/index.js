import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import { getOptionLabel, getOptionValue, checkOptionByValue, trimList } from '../util'
import './index.styl'
/**
 * <Radio>
 */
export default class Radio extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    className: PropTypes.string,

    label: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,

    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

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

  state = {
    prevProps: this.props,
    isChecked: this.props.isChecked,
  }

  static getDerivedStateFromProps (props, { prevProps, isChecked }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, isChecked: props.isChecked }
    }
    return null
  }

  get isDisabled () {
    const { isDisabled, disabled } = this.props
    return isDisabled || disabled
  }

  get readOnly () {
    return this.props.readOnly
  }

  get canToggle () {
    const { isDisabled, readOnly } = this
    return !isDisabled && !readOnly
  }

  onToggle = () => {
    const { name, value, label, onToggle, onChange } = this.props
    const { isChecked } = this.state
    const { canToggle } = this
    const result = canToggle ? true : isChecked

    this.setState({ isChecked: result })

    onToggle(result, name, value || label)
    onChange(name, value || label, result)
  }

  render () {
    const { size, theme, className, label, name } = this.props
    const { isChecked } = this.state
    const { isDisabled, readOnly } = this

    return (
      <label
        className={
          trimList([
            theme === 'core' ? 'CoreRadio' : 'Radio',
            size,
            className,
            isChecked && 'is-checked',
            isDisabled && 'is-disabled',
            readOnly && 'readonly',
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
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',

    className: '',
    optionList: [],

    onChange: () => null,
    onToggle: () => null,
  }

  static getDerivedStateFromProps (props, { prevProps, value }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, value: props.value }
    }
    return null
  }

  get isDisabled () {
    const { isDisabled, disabled } = this.props
    return isDisabled || disabled
  }

  get readOnly () {
    return this.props.readOnly
  }

  get canToggle () {
    const { isDisabled, readOnly } = this
    return !isDisabled && !readOnly
  }

  createOnChangeHandler = (name, value, idx) => () => {
    const { onToggle, onChange } = this.props
    const { value: originalValue } = this.state
    const { canToggle } = this

    const result = canToggle ? value : originalValue

    this.setState({ value: result })
    onToggle(result, name)
    onChange({ name, value: result, idx })
  }

  render () {
    const { size, theme, className, optionList } = this.props
    const { value } = this.state
    const { name, isDisabled, readOnly } = this

    const klass = trimList([
      theme === 'core' ? 'CoreRadioGroup' : 'RadioGroup',
      size,
      className,
      isDisabled && 'is-disabled',
      readOnly && 'readonly',
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
                readOnly={readOnly}

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
