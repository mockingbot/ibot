import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon/index'

import './index.styl'

class Switch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isChecked: props.isChecked }
  }

  static propTypes = {
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.string,
  }

  static defaultProps = {
    isChecked: false,
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

  toggle = () => this.setState(
    { isChecked: !this.state.isChecked },
    () => this.props.onChange(this.state.isChecked),
  )

  render () {
    const { icon, children } = this.props
    const { isChecked } = this.state

    return (
      <button
        className={`switch ${isChecked ? 'is-checked' : 'isnt-checked'}`}
        onClick={this.toggle}
      >
        <span>
          { icon ? <Icon name={icon} /> : children }
        </span>
      </button>
    )
  }
}

export default Switch
