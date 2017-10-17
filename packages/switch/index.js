import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './index.css'

class Switch extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    checked: true
  }

  constructor (props) {
    super(props)

    this.setChecked = this.setChecked.bind(this)
    this.toggle = this.toggle.bind(this)

    this.state = { checked: !!props.checked }
  }

  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      })
    }
  }

  setChecked (checked) {
    if (!('checked' in this.props)) {
      this.setState({
        checked
      })
    }
    this.props.onChange(checked)
  }

  toggle () {
    const checked = !this.state.checked
    this.setChecked(checked)
  }


  render () {
    const { children } = this.props
    const checked = this.state.checked
    let switchCls, innerCls
    if (checked) {
      switchCls = styles.switchOn
      innerCls = styles.innerOn
    } else {
      switchCls = styles.switchOff
      innerCls = styles.innerOff
    }

    return (
      <span
        className={switchCls}
        onClick={this.toggle}
        >
        <span className={innerCls}>
          { children }
        </span>
      </span>
    )
  }
}

export default Switch
