import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '@mockingbot/icon'
import { trimList } from '@mockingbot/util'

import './index.styl'

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'text']),
    iconType: PropTypes.oneOf(['mb','icon', 'fa', 'md']),
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
      iconType,
      className,
      children,
      isDisabled,
      ...others,
    } = this.props

    return (
      <button
        className={trimList([type, className])}
        disabled={isDisabled}
        {...others}
      >
        { !!icon && <Icon type={iconType} name={icon} /> }
        { children }
      </button>
    )
  }
}
