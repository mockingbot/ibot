import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '@ibot/icon'
import util from '@ibot/util'

import './index.styl'
const { trimList } = util

const CLASS_MAP = {
  primary: 'PrimaryButton',
  regular: 'RegularButton',
  text: 'TextButton',
}

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'text']),
    size: PropTypes.oneOf(['regular', 'small']),
    iconType: PropTypes.oneOf(['dora', 'mb','icon', 'fa', 'md']),
    icon: PropTypes.string,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    children: PropTypes.any,
    html: PropTypes.string,
  }

  static defaultProps = {
    type: 'regular',
    size: 'regular',
    icon: '',
    className: '',
    isDisabled: false,
  }

  render () {
    const {
      type, size,
      isDisabled,
      icon, iconType,
      className,
      children, html,
      ...others,
    } = this.props

    const contentProp = (
      !!html
      ? { dangerouslySetInnerHTML: { __html: html } }
      : { children: [!!icon && <Icon key="icon" type={iconType} name={icon} />, children] }
    )

    return (
      <button
        className={trimList([CLASS_MAP[type], size !== 'regular' && size, className])}
        disabled={isDisabled}
        {...others}
        {...contentProp}
      />
    )
  }
}
