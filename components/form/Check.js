import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import isArray from 'lodash/isArray'
import isSet from 'lodash/isSet'
import isEqual from 'lodash/isEqual'

import Icon from '../icon'

import { trimList } from '../util'

import {
  getOptionLabel,
  getOptionValue,
  checkOptionByValueList,
  convertValueListToSet,
} from './util'

/**
 * <Check>
 */
export class Check extends PureComponent {
  state = {
    prevProps: this.props,
    isChecked: this.props.isChecked,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),

    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,

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

  static getDerivedStateFromProps(props, { prevProps, isChecked }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, isChecked: props.isChecked }
    }
    return null
  }

  onToggle = () => {
    const { name, value, label } = this.props

    this.setState(
      { isChecked: !this.state.isChecked },
      () => {
        const { onChange, onToggle } = this.props

        onToggle(this.state.isChecked, name, value || label)
        onChange(name, value || label, this.state.isChecked)
      }
    )
  }

  render() {
    const { size, theme, className, label, name, isDisabled } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={trimList([
          theme === 'core' ? 'CoreCheck' : 'Check',
          size,
          className,
          isChecked ? 'is-checked' : '',
          isDisabled ? 'is-disabled' : '',
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

  static getDerivedStateFromProps(props, { prevProps, valueList }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, valueList: props.valueList }
    }
    return null
  }

  createOnChangeHandler = (name, opt) => () => {
    const { optionList } = this.props
    const { valueList } = this.state

    const resultValueList = new Set(valueList)
    const optionValue = getOptionValue(opt)

    const toggleAction = resultValueList.has(optionValue) ? 'delete' : 'add'
    resultValueList[toggleAction](optionValue)

    const nextValueList = Array.from(resultValueList)
    const nextIdxList = nextValueList.map(v => optionList.findIndex(o => getOptionValue(o) === v))

    this.setState(
      { valueList: resultValueList },
      () => {
        const { onChange, onToggle } = this.props

        onToggle(nextValueList, name)
        onChange({ name, valueList: nextValueList, idxList: nextIdxList })
      },
    )
  }

  render() {
    const { name } = this

    const {
      size, theme,
      className,
      optionList,
      isDisabled,
    } = this.props

    const { valueList } = this.state

    const klass = trimList([
      theme === 'core' ? 'CoreCheckGroup' : 'CheckGroup',
      size,
      className,
      isDisabled && 'is-disabled',
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

export function CoreCheck(props) {
  return <Check {...props} theme="core" />
}

export function CoreCheckGroup(props) {
  return <CheckGroup {...props} theme="core" />
}
