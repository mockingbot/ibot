import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon'
import { trimList } from '../util'

import './index.styl'

export default class Switch extends PureComponent {
  state = { isChecked: this.props.isChecked }

  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['regular', 'small']),

    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,

    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    size: 'regular',

    isChecked: false,
    isDisabled: false,
    disabled: false,

    onChange: () => null,
  }

  static getDerivedStateFromProps({ isChecked: willBeChecked }, { isChecked }) {
    if (willBeChecked !== isChecked) {
      return { isChecked: willBeChecked }
    }
    return null
  }

  toggle = ({ target: $btn }) => {
    const { isDisabled, onChange } = this.props
    const { isChecked } = this.state

    $btn.blur()

    return (
      !isDisabled && this.setState(
        { isChecked: !isChecked },
        () => onChange(this.state.isChecked),
      )
    )
  }

  get isDisabled() {
    const { isDisabled, disabled } = this.props
    return isDisabled || disabled
  }

  render () {
    const { size } = this.props
    const { isChecked } = this.state
    const { isDisabled } = this

    return (
      <label
        className={trimList([
          'Switch',
          size,
          isChecked ? 'is-checked' : 'isnt-checked',
          isDisabled && 'is-disabled',
        ])}
      >
        <button type="button" disabled={isDisabled} onClick={this.toggle} />
      </label>
    )
  }
}
