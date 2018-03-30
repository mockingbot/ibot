import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon'
import util from '../util'

import './index.styl'

const { trimList } = util
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
    children: PropTypes.children,
  }

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    className: '',
    onChange: () => null,
    icon: '',
  }

  componentWillReceiveProps({ isChecked: willBeChecked }) {
    const { isChecked } = this.props

    if (willBeChecked !== isChecked) {
      this.setState({ isChecked: willBeChecked })
    }
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

export default Switch
