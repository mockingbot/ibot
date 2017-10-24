import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.styl'

class Switch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isChecked: props.isChecked }
  }

  static propTypes = {
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    isChecked: true,
  }

  componentWillReceiveProps({ willBeChecked }) {
    const { isChecked } = this.state

    if (willBeChecked !== isChecked) {
      this.setState({ isChecked: willBeChecked })
    }
  }

  toggle = () => {
    this.setState(
      { isChecked: !this.state.isChecked },
      () => this.props.onChange(this.state.isChecked)
    )
  }

  render () {
    const { children } = this.props
    const { isChecked } = this.state

    return (
      <span
        className={`switch ${isChecked ? 'is-checked' : 'isnt-checked'}`}
        onClick={this.toggle}
      >
        <span>{ children }</span>
      </span>
    )
  }
}

export default Switch
