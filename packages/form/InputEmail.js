import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { trimList, getOtherProps, EMAIL_REGEX } from '@ibot/util'

const checkFinishedTyping = v => (
  /^@/.test(v)
  || /@\./.test(v)
  || /\s+[\w@]/.test(v)
  || /@\w*\.\w*/.test(v)
)

export class InputEmail extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      isActive: false,
      isValid: true,
      isFinishedTyping: checkFinishedTyping(props.value),
    }
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    unstyled: PropTypes.bool,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 'regular',
    unstyled: false,

    value: '',
    placeholder: '',

    isDisabled: false,
    disabled: false,
    readOnly: false,

    onChange: () => null,
  }

  componentWillReceiveProps({ value: newValue }) {
    const { value, placeholder } = this.props

    if (newValue !== value) {
      this.setState({ value: newValue })
    }
  }

  onChange = ({ target: { value } }) => (
    this.setState(
      {
        value,
        isFinishedTyping: checkFinishedTyping(value),
      },
      () => {
        const { onChange } = this.props
        this.checkValidity()
        onChange(value.trim())
      }
    )
  )

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
      size, unstyled,
      readOnly, placeholder,

      onFocus,
    } = this.props

    const { value, isActive, isValid } = this.state
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      'Input InputEmail',
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
          onMouseDown={this.onClickOutside}
        />
      </label>
    )
  }
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
