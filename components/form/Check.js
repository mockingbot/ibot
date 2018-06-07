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
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
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

  static getDerivedStateFromProps(props, { prevProps, isChecked }) {
    if (!isEqual(prevProps, props)) {
      const willBeChecked = props.isChecked !== isChecked ? props.isChecked : isChecked
      return { prevProps: props, isChecked: willBeChecked }
    }
    return null
  }

  onToggle = () => {
    const { name, value, label } = this.props

    this.setState(
      { isChecked: !this.state.isChecked },
      () => this.props.onChange(name, value || label, this.state.isChecked),
    )
  }

  render() {
    const { size, className, label, name, isDisabled } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={trimList([
          'Check',
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
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,

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
    className: '',
    optionList: [],
    onChange: () => null,
    isDisabled: false,
  }

  static getDerivedStateFromProps(props, { prevProps, valueList }) {
    if (!isEqual(prevProps, props)) {
      const nextValueList = props.valueList !== valueList ? props.valueList : valueList
      return { prevProps: props, valueList: nextValueList }
    }
    return null
  }

  createOnChangeHandler = (name, opt) => () => {
    const { optionList, onChange } = this.props
    const { valueList } = this.state

    const resultValueList = new Set(valueList)
    const optionValue = getOptionValue(opt)

    const toggleAction = resultValueList.has(optionValue) ? 'delete' : 'add'
    resultValueList[toggleAction](optionValue)

    const nextValueList = Array.from(resultValueList)
    const nextIdxList = nextValueList.map(v => optionList.findIndex(o => getOptionValue(o) === v))

    this.setState(
      { valueList: resultValueList },
      () => onChange({ name, valueList: nextValueList, idxList: nextIdxList }),
    )
  }

  render() {
    const { name } = this

    const {
      size,
      className,
      optionList,
      isDisabled,
    } = this.props

    const { valueList } = this.state

    const klass = trimList([
      'CheckGroup',
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
            size={size}
            isDisabled={isDisabled || opt.isDisabled}
            isChecked={checkOptionByValueList(opt, valueList)}
            label={getOptionLabel(opt)}
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
