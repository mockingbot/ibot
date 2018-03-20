import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import isSet from 'lodash/isSet'

import Icon from '@ibot/icon'
import util from '@ibot/util'
import { getOptionLabel, getOptionValue } from './util'

const { trimList } = util

/**
 * <Check>
 */
export class Check extends PureComponent {
  state = { isChecked: this.props.isChecked }

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
    currentOptionIdxList: this.currentOptionIdxList,
  }

  static propTypes = {
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

    currentOptionIdxList: PropTypes.oneOfType([
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

  get currentOptionIdxList() {
    const { optionList, valueList } = this.props
    const { currentOptionIdxList = this.props.currentOptionIdxList } = this.state || {}

    return new Set(
      isArray(currentOptionIdxList) || isSet(currentOptionIdxList)
      ? currentOptionIdxList
      : Array.from(valueList || [])
        .map(v => optionList.findIndex(opt => getOptionValue(opt) === String(v)))
        .filter(idx => idx !== -1)
    )
  }

  createOnChangeHandler = (name, idx) => () => {
    const { optionList, onChange } = this.props
    const { currentOptionIdxList } = this

    const result = new Set(currentOptionIdxList)
    const action = result.has(idx) ? 'delete' : 'add'
    result[action](idx)

    const idxList = Array.from(result)
    const valueList = idxList.map(idx => getOptionValue(optionList[idx]))

    this.setState(
      { currentOptionIdxList: result },
      () => onChange({ name, idxList, valueList }),
    )
  }

  render() {
    const { name, currentOptionIdxList } = this

    const {
      size,
      className,
      optionList,
      isDisabled,
    } = this.props

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
            isChecked={currentOptionIdxList.has(idx)}
            label={getOptionLabel(opt)}
            onChange={
              !(isDisabled || opt.isDisabled)
              ? this.createOnChangeHandler(name, idx)
              : undefined
            }
          />
        ))
      }
      </span>
    )
  }
}
