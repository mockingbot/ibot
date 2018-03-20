import React from 'react'
import PropTypes from 'prop-types'
import util from '@ibot/util'
const { trimList } = util

function createOnChangeHandler(onChange) {
  return e => onChange(e.target.value, e)
}

/**
 * <Input>
 */
export function Input({
  size,
  className,
  value,
  type,
  onChange,
  ...others,
}) {
  return (
    <label className={trimList(['Input', size, className])}>
      <input
        type={type}
        value={value}
        onChange={createOnChangeHandler(onChange)}
        {...others}
      />
    </label>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  size: 'regular',
  onChange: () => null,
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

PanelInput.propTypes = {
  className: PropTypes.string,
}

/**
 * <Textarea>
 */
export function Textarea({
  className, size,
  value, onChange,
  ...others,
}) {
  return (
    <label className={trimList(['Textarea', size, className])}>
      <textarea
        value={value}
        onChange={createOnChangeHandler(onChange)}
        {...others}
      />
    </label>
  )
}

Textarea.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Textarea.defaultProps = {
  size: 'regular',
  onChange: () => null,
}

export function PanelTextarea({ className, ...others }) {
  return (
    <Textarea
      size="small"
      className={trimList(['PanelTextarea', className])}
      {...others}
    />
  )
}

PanelTextarea.propTypes = {
  className: PropTypes.string,
}

export * from './InputEmail'
export * from './InputNumber'
