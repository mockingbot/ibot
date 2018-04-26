import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon'
import SVG from '../svg'
import { trimList } from '../util'

import './index.styl'

const CLASS_MAP = {
  primary: 'Primary',
  regular: 'Regular',
  secondary: 'Regular',
  tertiary: 'Tertiary',
  text: 'Text',
}

export class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'regular', 'secondary', 'tertiary', 'text']),
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    iconType: PropTypes.oneOf(['svg', 'dora', 'mb','icon', 'fa', 'md']),
    icon: PropTypes.string,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
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
  }

  render () {
    const {
      type, size, theme,
      isDisabled,
      icon, iconType,
      className,
      children, html,
      ...others
    } = this.props

    const klass = trimList([
      `${CLASS_MAP[type]}${theme === 'core' ? 'CoreButton' : 'Button'}`,
      size !== 'regular' && size,
      className,
    ])

    const contentProp = (
      html
      ? { dangerouslySetInnerHTML: { __html: html } }
      : { children: (
          <Fragment>
            { icon && (
              iconType === 'svg'
              ? <SVG name={icon} />
              : <Icon key="icon" type={iconType} name={icon} />
            )}
            { children }
          </Fragment>
      )}
    )

    return (
      <button
        className={klass}
        disabled={isDisabled}
        {...others}
        {...contentProp}
      />
    )
  }
}

// PLAIN:
export function PrimaryButton(props) {
  return <Button {...props} type="primary" />
}

export function RegularButton(props) {
  return <Button {...props} type="regular" />
}

export const SecondaryButton = RegularButton

export function TertiaryButton(props) {
  return <Button {...props} type="tertiary" />
}

export function TextButton(props) {
  return <Button {...props} type="text" />
}

// CORE:
export function CoreButton(props) {
  return <Button {...props} theme="core" />
}

export function PrimaryCoreButton(props) {
  return <CoreButton {...props} type="primary" />
}

export function RegularCoreButton(props) {
  return <CoreButton {...props} type="regular" />
}

export const SecondaryCoreButton = RegularCoreButton

export function TertiaryCoreButton(props) {
  return <CoreButton {...props} type="tertiary" />
}

export function TextCoreButton(props) {
  return <CoreButton {...props} type="text" />
}
