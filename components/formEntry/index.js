import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { trimList } from '../util'
import './index.styl'

function FormBase ({
  name: key, children: val,
  isRequired,
}) {
  return (
    <Fragment>
      { key && (
        <span className="FormEntry-Key key">
          {key}
          { isRequired && <span className="required-sign">*</span> }
        </span>
      )}
      <span className="FormEntry-Val val">{val}</span>
    </Fragment>
  )
}

FormBase.propTypes = {
  children: PropTypes.node,
  name: PropTypes.any,
  isRequired: PropTypes.bool,
}

/**
 * <FormDiv>
 */

export function FormDiv (props) {
  const { className, type } = props
  return (
    <div
      className={trimList(['FormEntry', className])}
      type={type}
    >
      <FormBase {...props} />
    </div>
  )
}

FormDiv.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
}

/**
 * <FormLabel>
 */

export function FormLabel (props) {
  const { className, type } = props
  console.log('props', props)
  return (
    <label
      className={trimList(['FormEntry', className])}
      type={type}
    >
      <FormBase {...props} />
    </label>
  )
}

FormLabel.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
}
