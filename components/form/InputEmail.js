import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { isEqual } from 'lodash'

import { trimList, getOtherProps, EMAIL_REGEX } from '../util'

const checkFinishedTyping = v => (
  /^@/.test(v)
  || /@\./.test(v)
  || /\s+[\w@]/.test(v)
  || /@\w*\.\w*/.test(v)
  || /@\w*@/.test(v)
)

export class InputEmail extends PureComponent {
  state = {
    prevProps: this.props,
    value: this.props.value,

    isActive: false,
    isValid: true,
    isFinishedTyping: checkFinishedTyping(this.props.value),
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    unstyled: PropTypes.bool,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,

    className: PropTypes.string,
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',
    unstyled: false,

    value: '',
    placeholder: '',

    isDisabled: false,
    disabled: false,
    readOnly: false,

    onChange: () => null,
  }

  static getDerivedStateFromProps(props, { prevProps, value }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, value: props.value }
    }
    return null
  }

  onChange = e => {
    const { target: { value } } = e

    this.setState(
      {
        value,
        isFinishedTyping: checkFinishedTyping(value),
      },
      () => {
        const { onChange } = this.props
        this.checkValidity()
        onChange(value.trim(), e)
      }
    )
  }

  checkValidity = () => {
    const { value, isFinishedTyping } = this.state

    const isValid = (
      value === '' || !isFinishedTyping
      ? true
      : EMAIL_REGEX.test(value)
    )

    this.setState({ isValid })
  }

  setActive = () => this.setState({ isActive: true })
  setInactive = () => this.setState({ isActive: false })

  onClickOutside = ({ target }) => {
    if (!(target.closest('label'))) {
      this.setInactive()
    }
  }

  render() {
    const {
      className,
      size, theme, unstyled,
      readOnly, placeholder,

      onFocus,
    } = this.props

    const { value, isActive, isValid } = this.state
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      theme === 'core' ? 'CoreInput CoreInputEmail' : 'Input InputEmail',
      size,
      unstyled && 'unstyled',
      className,

      isActive && !isDisabled && !readOnly && 'is-active',
      isDisabled && 'is-disabled',
      readOnly && 'is-readonly',
      isValid ? 'is-valid' : 'isnt-valid',
    ])

    return (
      <label
        className={klass}
        onMouseDown={this.setActive}
      >
        <input
          type="email"
          value={value}
          placeholder={placeholder}

          disabled={isDisabled}
          readOnly={readOnly}

          onChange={this.onChange}
          onFocus={onFocus}
          {...getOtherProps(this.constructor, this.props)}
        />

        <DocumentEvents
          enabled={isActive}
          onClick={this.onClickOutside}
        />
      </label>
    )
  }
}

export function CoreInputEmail(props) {
  return <InputEmail {...props} theme="core" />
}

export function PanelInputEmail({ className, ...others }) {
  return (
    <InputEmail
      size="small"
      className={trimList(['PanelInputEmail', className])}
      {...others}
    />
  )
}

PanelInputEmail.propTypes = {
  className: PropTypes.string,
}
