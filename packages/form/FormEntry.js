import React from 'react'
import PropTypes from 'prop-types'

/**
 * <FormEntry>
 */
export function FormEntry({
  className,
  name: key, children: val,
  type,
  isLabel,
  isRequired,
}) {
  return React.createElement(
    isLabel ? 'label' : 'div',
    { className: `form-entry ${className}`, type },
    key && (
      <span className="key">
        {key}
        { isRequired && <span className="required-sign">*</span> }
      </span>
    ),
    <span className="val">{val}</span>,
  )
}

FormEntry.PropTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  name: PropTypes.any,
  type: PropTypes.string,
  isLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
}

FormEntry.defaultProps = {
  className: '',
  isLabel: false,
}

/**
 * <FormLabel>
 */
export function FormLabel(props) {
  return <FormEntry{...props} isLabel={true} />
}
