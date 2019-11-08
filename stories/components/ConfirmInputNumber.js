import React from 'react'
import PropTypes from 'prop-types'
import ConfirmInputNumber from '../../components/confirmInputNumber'
import { trimList } from '../../components/util'

export function CoreConfirmInputNumber (props) {
  return <ConfirmInputNumber {...props} theme="core" />
}

export function PanelInputNumber ({ className, ...others }) {
  return (
    <ConfirmInputNumber
      size="small"
      className={trimList(['PanelInputNumber', className])}
      {...others}
    />
  )
}

PanelInputNumber.propTypes = {
  className: PropTypes.string,
}

export function PanelSelectNumber ({ className, ...others }) {
  return (
    <ConfirmInputNumber
      size="small"
      className={trimList(['PanelInputNumber', className])}
      {...others}
    />
  )
}

PanelSelectNumber.propTypes = PanelInputNumber.propTypes

PanelSelectNumber.defaultProps = {
  optionList: [1, 2, 3],
}
