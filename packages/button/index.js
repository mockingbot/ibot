import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon/index'

import './index.styl'

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'text', 'icon']),
    icon: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
  }

  static defaultProps = {
    type: 'regular',
    icon: '',
    className: '',
  }

  render () {
    const {
      type,
      icon,
      className,
      children,
      ...others,
    } = this.props

    return (
      <button
        className={`${type} ${className}`}
        {...others}
      >
        { !!icon && <Icon name={icon} /> }
        { children }
      </button>
    )
  }
}
