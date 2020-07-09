import React from 'react'
import PropTypes from 'prop-types'
import { trimList } from '../util'
import { StyledFormDiv, StyledFormLabel, StyledFormKey, StyledFormVal } from './styled'

function FormBase ({
  name: key, children: val,
  isRequired
}) {
  return (
    <>
      { key && (
        <StyledFormKey className="FormEntry-Key key">
          {key}
          { isRequired && <span className="required-sign">*</span> }
        </StyledFormKey>
      )}

      <StyledFormVal className="FormEntry-Val val">{val}</StyledFormVal>
    </>
  )
}
FormBase.propTypes = {
  children: PropTypes.node,
  name: PropTypes.any,
  isRequired: PropTypes.bool
}
/**
 * <FormDiv>
 */
export function FormDiv (props) {
  const { className, type } = props
  return (
    <StyledFormDiv
      className={trimList([ 'FormEntry', className ])}
      type={type}
    >
      <FormBase {...props} />
    </StyledFormDiv>
  )
}
FormDiv.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
}
/**
 * <FormLabel>
 */
export function FormLabel (props) {
  const { className, type } = props
  return (
    <StyledFormLabel
      className={trimList([ 'FormEntry', className ])}
      type={type}
    >
      <FormBase {...props} />
    </StyledFormLabel>
  )
}
FormLabel.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
}
