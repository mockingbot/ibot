import React from 'react'
import PropTypes from 'prop-types'

/**
 * <Input>
 */
export function Input({
  className,
  value,
  type,
  ...others,
}) {
  return (
    <input
      type={type}
      className={`regular ${className}`}
      value={value}
      {...others}
    />
  )
}

Input.PropTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  className: '',
}

/**
 * <Textarea>
 */
export function Textarea({ className, value, ...others }) {
  return (
    <textarea
      className={`regular ${className}`}
      value={value}
      {...others}
    />
  )
}

Textarea.PropTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
}

Textarea.defaultProps = {
  type: 'text',
  className: '',
}
