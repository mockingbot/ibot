import React from 'react'
import PropTypes from 'prop-types'

import { trimList } from '../util'

function createOnChangeHandler(onChange) {
  return e => onChange(e.target.value, e)
}

/**
 * <Input>
 */
export function Input({
  size, theme,
  unstyled,
  className,
  value,
  type,
  onChange,
  ...others
}) {
  const klass = trimList([
    theme === 'core' ? 'CoreInput' : 'Input',
    size,
    unstyled && 'unstyled',
    className,
  ])

  return (
    <label className={klass}>
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
  theme: PropTypes.oneOf(['core', 'plain']),
  unstyled: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  size: 'regular',
  theme: 'plain',
  onChange: () => null,
}

export function CoreInput(props) {
  return <Input {...props} theme="core" />
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
    className,
  ])

  return (
    <label className={klass}>
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
  theme: PropTypes.oneOf(['core', 'plain']),
  unstyled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Textarea.defaultProps = {
  size: 'regular',
  theme: 'plain',
  onChange: () => null,
}

export function CoreTextarea(props) {
  return <Input {...props} theme="core" />
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
export * from './ConfirmInputNumber'
