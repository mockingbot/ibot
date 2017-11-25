import React from 'react'
import PropTypes from 'prop-types'
import { trimList } from '@ibot/util'

/**
 * <Input>
 */
export function Input({
  size,
  className,
  value,
  type,
  ...others,
}) {
  return (
    <label className={trimList(['Input', size, className])}>
      <input
        type={type}
        value={value}
        {...others}
      />
    </label>
  )
}

Input.PropTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  className: PropTypes.string,
  value: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  size: 'regular',
}

export function PanelInput({ className, ...others }) {
  return (
    <Input
      size="small"
      className={trimList(['PanelInput', className])}
      {...others}
    />
  )
}

/**
 * <Textarea>
 */
export function Textarea({ className, value, ...others }) {
  return (
    <label className={trimList(['Textarea', 'regular', className])}>
      <textarea
        value={value}
        {...others}
      />
    </label>
  )
}

Textarea.PropTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
}
