import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '@ibot/icon'
import { trimList } from '@ibot/util'

import './index.styl'

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'text']),
    iconType: PropTypes.oneOf(['mb','icon', 'fa', 'md']),
    icon: PropTypes.string,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    children: PropTypes.any,
    html: PropTypes.string,
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
      html,
      ...others,
    } = this.props

    const contentProp = (
      !!html
      ? { dangerouslySetInnerHTML: { __html: html } }
      : { children: [!!icon && <Icon key="icon" type={iconType} name={icon} />, children] }
    )

    return (
      <button
        className={trimList([type, className])}
        disabled={isDisabled}
        {...others}
        {...contentProp}
      />
    )
  }
}
