import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import SVG from '../svg'
import { trimList } from '../util'
import { StyledButton } from './styled'

const TYPE_MAP = {
  primary: 'Primary',
  regular: 'Regular',
  secondary: 'Regular',
  tertiary: 'Tertiary',
  text: 'Text'
}

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf([ 'primary', 'regular', 'secondary', 'tertiary', 'text' ]),
    size: PropTypes.oneOf([ 'regular', 'small' ]),
    theme: PropTypes.oneOf([ 'core', 'plain' ]),

    iconType: PropTypes.oneOf([ 'svg', 'dora', 'mb', 'icon', 'fa', 'md' ]),
    icon: PropTypes.string,

    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    loading: PropTypes.bool,

    children: PropTypes.any,
    html: PropTypes.string
  }

  static defaultProps = {
    type: 'regular',
    size: 'regular',
    theme: 'plain',
    icon: '',
    className: '',
    isDisabled: false
  }

  get className () {
    const { type, theme, size, className } = this.props
    const { isDisabled, isLoading } = this

    return trimList([
      'Button',
      `${TYPE_MAP[ type ]}${theme === 'core' ? 'CoreButton' : 'Button'}`,
      size !== 'regular' && size,
      isLoading && 'is-loading',
      isDisabled && 'is-disabled',
      className
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

  render () {
    const { className, isLoading, isDisabled } = this
    const { iconType, icon, children, ...others } = this.props
    return (
      <StyledButton
        className={className}
        disabled={isDisabled}
        onClick={e => isDisabled && e.preventDefault()}
        type={'button'}
        {...omit(others, [ 'className', 'type', 'theme', 'isDisabled', 'disabled', 'isLoading', 'loading' ])}
      >
        <>
          { isLoading && <SVG name="loading" /> }

          { icon && iconType === 'svg' && (
            <SVG name={icon} />
          )}
          { children }
        </>
      </StyledButton>
    )
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
