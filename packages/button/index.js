import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon/index'

import './index.styl'

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'text']),
    icon: PropTypes.string,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    children: PropTypes.any,
  }

  static defaultProps = {
    type: 'regular',
    icon: '',
    className: '',
    isDisabled: false,
  }

  render () {
    const {
      type,
      icon,
      className,
      children,
      isDisabled,
      ...others,
    } = this.props

    return (
      <button
        className={`${type} ${className}`}
        disabled={isDisabled}
        {...others}
      >
        { !!icon && <Icon name={icon} /> }
        { children }
      </button>
    )
  }
}
