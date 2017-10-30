import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '@mockingbot/icon'

import './index.styl'

class Switch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isChecked: props.isChecked }
  }

  static propTypes = {
    isChecked: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.string,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    className: '',
    onChange: () => null,
    icon: '',
  }

  componentWillReceiveProps({ isChecked: willBeChecked }) {
    const { isChecked } = this.state

    if (willBeChecked !== isChecked) {
      this.setState({ isChecked: willBeChecked })
    }
  }

  toggle = () => !this.props.isDisabled && this.setState(
    { isChecked: !this.state.isChecked },
    () => this.props.onChange(this.state.isChecked),
  )

  render () {
    const { icon, isDisabled, children } = this.props
    const { isChecked } = this.state

    return (
      <label
        className={`switch ${isChecked ? 'is-checked' : 'isnt-checked'} ${isDisabled ? 'is-disabled' : ''}`}
      >
        <button type="button" disabled={isDisabled} onClick={this.toggle}>
          { icon ? <Icon name={icon} /> : children }
        </button>
      </label>
    )
  }
}

export default Switch
