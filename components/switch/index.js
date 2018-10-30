import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { isEqual } from 'lodash'

import Icon from '../icon'
import { trimList } from '../util'

import './index.styl'

export default class Switch extends PureComponent {
  state = {
    prevProps: this.props,
    isChecked: this.props.isChecked,
  }

  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['regular', 'small']),

    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func,
    children: PropTypes.any,
  }

  static defaultProps = {
    className: '',
    size: 'regular',

    isChecked: false,
    isDisabled: false,
    disabled: false,
    readOnly: false,

    onChange: () => null,
  }

  static getDerivedStateFromProps(props, { prevProps }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, isChecked: props.isChecked }
    }
    return null
  }

  get isDisabled() {
    const { isDisabled, disabled } = this.props
    return isDisabled || disabled
  }

  get readOnly() {
    return this.props.readOnly
  }

  get canToggle() {
    const { isDisabled, readOnly } = this
    return !isDisabled && !readOnly
  }

  toggle = ({ target: $btn }) => {
    const { onChange } = this.props
    const { isChecked } = this.state
    const { isDisabled, canToggle } = this

    const newChecked = canToggle ? !isChecked : isChecked

    $btn.blur()

    this.setState({ isChecked: newChecked })
    return !isDisabled && onChange(newChecked)
  }

  render () {
    const { size, readOnly, children } = this.props
    const { isChecked } = this.state
    const { isDisabled } = this

    return (
      <label
        className={trimList([
          'Switch',
          size,
          isChecked ? 'is-checked' : 'isnt-checked',
          isDisabled && 'is-disabled',
          readOnly && 'readonly',
        ])}
      >
        <button type="button" disabled={isDisabled} onClick={this.toggle} />
        { children }
      </label>
    )
  }
}
