import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { trimList } from '../util'
import { StyledInputLabel } from './styled'

function createOnChangeHandler (onChange) {
  return e => onChange(e.target.value, e)
}
/**
 * <Input>
 */
export default function Input ({
  size, theme,
  isInvalid,
  unstyled,
  className,
  value,
  type,
  onChange,
  isAutoFocus,
  ...others
}) {
  const klass = trimList([
    theme === 'core' ? 'CoreInput' : 'Input',
    size,
    unstyled && 'unstyled',
    isInvalid && 'is-invalid',
    className
  ])

  const inputRef = useRef(null)

  useEffect(() => {
    isAutoFocus && inputRef.current.focus()
  }, [ isAutoFocus ])

  return (
    <StyledInputLabel className={klass}>
      <input
        type={type}
        value={value}
        onChange={createOnChangeHandler(onChange)}
        ref={inputRef}
        {...others}
      />
    </StyledInputLabel>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf([ 'regular', 'small' ]),
  theme: PropTypes.oneOf([ 'core', 'plain' ]),
  unstyled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isAutoFocus: PropTypes.bool
}

Input.defaultProps = {
  type: 'text',
  size: 'regular',
  theme: 'plain',
  isAutoFocus: false,
  onChange: () => null
}

/**
 * <Textarea>
 */
export function Textarea ({
  size, theme,
  unstyled,
  className,
  value, onChange,
  ...others
}) {
  const klass = trimList([
    theme === 'core' ? 'CoreTextarea' : 'Textarea',
    size,
    unstyled && 'unstyled',
    className
  ])

  return (
    <StyledInputLabel className={klass}>
      <textarea
        value={value}
        onChange={createOnChangeHandler(onChange)}
        {...others}
      />
    </StyledInputLabel>
  )
}

Textarea.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([ 'regular', 'small' ]),
  theme: PropTypes.oneOf([ 'core', 'plain' ]),
  unstyled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
}

Textarea.defaultProps = {
  size: 'regular',
  theme: 'plain',
  onChange: () => null
}
