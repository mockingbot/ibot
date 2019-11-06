import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { trimList } from '../util'

import './index.styl'
/**
 * <FormEntry>
 */
export default function FormEntry({
  className,
  name: key, children: val,
  type,
  isLabel,
  isRequired,
}) {
  return React.createElement(
    isLabel ? 'label' : 'div',
    { className: trimList(['FormEntry', className]), type },
    <Fragment>
      { key && (
        <span className="FormEntry-Key key">
          {key}
          { isRequired && <span className="required-sign">*</span> }
        </span>
      )}
      <span className="FormEntry-Val val">{val}</span>
    </Fragment>,
  )
}

FormEntry.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
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
  return <FormEntry {...props} isLabel={true} />
}
