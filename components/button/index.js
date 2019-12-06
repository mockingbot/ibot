import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import omit from 'lodash/omit'

import Icon from '../icon'
import SVG from '../svg'
import { trimList } from '../util'

import './index.styl'

const TYPE_MAP = {
  primary: 'Primary',
  regular: 'Regular',
  secondary: 'Regular',
  tertiary: 'Tertiary',
  text: 'Text',
}

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'secondary', 'tertiary', 'text']),
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),

    iconType: PropTypes.oneOf(['svg', 'dora', 'mb', 'icon', 'fa', 'md']),
    icon: PropTypes.string,

    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    loading: PropTypes.bool,

    to: PropTypes.string,
    nativeLink: PropTypes.bool,

    children: PropTypes.any,
    html: PropTypes.string,
  }

  static defaultProps = {
    type: 'regular',
    size: 'regular',
    theme: 'plain',
    icon: '',
    className: '',
    isDisabled: false,
    nativeLink: false,
  }

  get name () {
    const { to, nativeLink } = this.props
    const { isDisabled } = this

    return (
      to && !isDisabled
        ? nativeLink ? 'a' : Link
        : 'button'
    )
  }

  get className () {
    const { type, theme, size, className } = this.props
    const { isDisabled, isLoading } = this

    return trimList([
      'Button',
      `${TYPE_MAP[type]}${theme === 'core' ? 'CoreButton' : 'Button'}`,
      size !== 'regular' && size,
      isLoading && 'is-loading',
      isDisabled && 'is-disabled',
      className,
    ])
  }

  get isDisabled () {
    const { isDisabled, disabled } = this.props
    return isDisabled || disabled
  }

  get isLoading () {
    const { isLoading, loading } = this.props
    return isLoading || loading
  }

  get to () {
    const { to, nativeLink } = this.props
    const { isDisabled } = this

    return isDisabled ? undefined : nativeLink ? undefined : to
  }

  get href () {
    const { to, nativeLink } = this.props
    const { isDisabled } = this

    return isDisabled ? undefined : nativeLink ? to : undefined
  }

  render () {
    const {
      icon, iconType,
      children, html,
      ...others
    } = this.props

    const { name, className, isDisabled, isLoading, to, href } = this

    const contentProp = (
      html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : { children: (
          <Fragment>
            { isLoading && <SVG name="loading" /> }

            { icon && (
              iconType === 'svg'
                ? <SVG name={icon} />
                : <Icon key="icon" type={iconType} name={icon} />
            )}
            { children }
          </Fragment>
        ) }
    )

    const props = {
      type: name === 'button' ? 'button' : undefined,
      className,
      to,
      href,

      disabled: isDisabled,
      onClick: e => isDisabled && e.preventDefault(),

      ...omit(others, ['className', 'type', 'theme', 'isDisabled', 'disabled', 'isLoading', 'loading', 'to', 'nativeLink']),
      ...contentProp,
    }

    return React.createElement(name, props)
  }
}

function CoreButton (props) {
  return <Button {...props} theme="core" />
}

export function PrimaryCoreButton (props) {
  return <CoreButton {...props} type="primary" />
}

export function TertiaryCoreButton (props) {
  return <CoreButton {...props} type="tertiary" />
}
