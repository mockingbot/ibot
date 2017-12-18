import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { trimList } from '@ibot/util'

/**
 * <Radio>
 */
export class Radio extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isChecked: props.isChecked }
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
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
          defaultChecked={isChecked}
          disabled={isDisabled}
          name={name}
          onClick={this.onChange}
        />

        <span className="state" />
        <span className="label">{ label }</span>
      </label>
    )
  }
}

/**
 * <RadioGroup>
 */
export class RadioGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.name = props.name || Math.random().toString(36).substring(2, 15)
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    className: PropTypes.string,
    name: PropTypes.string,
    optionList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.any,
          value: PropTypes.any,
          isDisabled: PropTypes.bool,
        }),
      ])
    ).isRequired,
    currentOptionIdx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    size: 'regular',
    className: '',
    optionList: [],
    isDisabled: false,
    onChange: () => null,
  }

  createOnChangeHandler = (name, val, idx) => () => (
    this.props.onChange({ name, val, idx })
  )

  render() {
    const { name } = this

    const {
      size,
      className,
      optionList, currentOptionIdx,
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
            label={typeof opt === 'string' ? opt : opt.label}
            type="radio"
            isChecked={idx === currentOptionIdx}
            isDisabled={isDisabled || opt.isDisabled}
            onChange={
              !(isDisabled || opt.isDisabled)
              ? this.createOnChangeHandler(name, opt.value || opt, idx)
              : undefined
            }
          />
        ))
      }
      </span>
    )
  }
}
