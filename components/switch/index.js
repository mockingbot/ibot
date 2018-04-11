import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon'
import { trimList } from '../util'

import './index.styl'

export default class Switch extends PureComponent {
  state = { isChecked: this.props.isChecked }

  static propTypes = {
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.any,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    className: '',
    onChange: () => null,
    icon: '',
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

  render () {
    const { icon, isDisabled, children } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={trimList([
          'Switch',
          isChecked ? 'is-checked' : 'isnt-checked',
          isDisabled && 'is-disabled',
        ])}
      >
        <button type="button" disabled={isDisabled} onClick={this.toggle}>
          { icon ? <Icon name={icon} /> : children }
        </button>
      </label>
    )
  }
}
