import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import Icon from '../icon'
import {
  getOptionLabel,
  getOptionValue,
  checkOptionByValueList,
  convertValueListToSet,
  trimList,
} from '../util'
import './index.styl'
/**
 * <Check>
 */
export default class Check extends PureComponent {
  state = {
    prevProps: this.props,
    isChecked: this.props.isChecked,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),

    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,

    label: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
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
    const { name, value, label, onChange, onToggle } = this.props
    const { isChecked } = this.state
    const { canToggle } = this

    const willBeChecked = canToggle ? !isChecked : isChecked

    this.setState({ isChecked: willBeChecked })
    onToggle(willBeChecked, name, value || label)
    onChange(name, value || label, willBeChecked)
  }

  render () {
    const { size, theme, className, label, name } = this.props
    const { isChecked } = this.state
    const { isDisabled, readOnly } = this

    return (
      <label
        className={trimList([
          theme === 'core' ? 'CoreCheck' : 'Check',
          size,
          className,
          isChecked && 'is-checked',
          isDisabled && 'is-disabled',
          readOnly && 'readonly',
        ])}
      >
        <input
          type="checkbox"
          defaultChecked={isChecked}
          disabled={isDisabled}
          name={name}
          onChange={this.onToggle}
        />
        <span className="Check-state"><Icon type="dora" name="check" /></span>
        <span className="Check-label">{ label }</span>
      </label>
    )
  }
}

/**
 * <CheckGroup>
 */
export class CheckGroup extends PureComponent {
  name = this.props.name || Math.random().toString(36).substring(2, 15)

  state = {
    prevProps: this.props,
    valueList: convertValueListToSet(this.props.valueList),
  }

  static propTypes = {
    name: PropTypes.string,
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    className: PropTypes.string,

    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,

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

    valueList: PropTypes.oneOfType([
      PropTypes.instanceOf(Set),
      PropTypes.array,
    ]),

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',
    className: '',
    optionList: [],
    onChange: () => null,
    onToggle: () => null,
    isDisabled: false,
  }

  static getDerivedStateFromProps (props, { prevProps, valueList }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, valueList: props.valueList }
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

  createOnChangeHandler = (name, opt) => () => {
    const { optionList, onToggle, onChange } = this.props
    const { valueList } = this.state
    const { canToggle } = this

    if (!canToggle) {
      const currentValueList = Array.from(valueList)
      const currentIdxList = currentValueList.map(v => optionList.findIndex(o => getOptionValue(o) === v))
      onToggle(currentValueList, name)
      onChange({ name, valueList: currentValueList, idxList: currentIdxList })
      return
    }

    const resultValueList = new Set(valueList)
    const optionValue = getOptionValue(opt)

    const toggleAction = resultValueList.has(optionValue) ? 'delete' : 'add'
    resultValueList[toggleAction](optionValue)

    const nextValueList = Array.from(resultValueList)
    const nextIdxList = nextValueList.map(v => optionList.findIndex(o => getOptionValue(o) === v))

    this.setState({ valueList: resultValueList })

    onToggle(nextValueList, name)
    onChange({ name, valueList: nextValueList, idxList: nextIdxList })
  }

  render () {
    const { size, theme, className, optionList } = this.props
    const { valueList } = this.state
    const { name, isDisabled, readOnly } = this

    const klass = trimList([
      theme === 'core' ? 'CoreCheckGroup' : 'CheckGroup',
      size,
      className,
      isDisabled && 'is-disabled',
      readOnly && 'readonly',
    ])

    return (
      <span className={klass}>
        {
          optionList.map((opt, idx) => opt && (
            <Check
              key={idx}
              name={name}
              label={getOptionLabel(opt)}

              size={size}
              theme={theme}

              isDisabled={isDisabled || opt.isDisabled}
              readOnly={readOnly}
              isChecked={checkOptionByValueList(opt, valueList)}

              onChange={
                !(isDisabled || opt.isDisabled)
                  ? this.createOnChangeHandler(name, opt)
                  : undefined
              }
            />
          ))
        }
      </span>
    )
  }
}
