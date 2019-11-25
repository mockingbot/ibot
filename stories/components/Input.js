import React from 'react'
import PropTypes from 'prop-types'
import { trimList } from '../../components/util'
import Input, { Textarea } from '../../components/input'
import InputEmail from '../../components/emailInput'
import InputNumber from '../../components/numberInput'

export function CoreInput (props) {
  return <Input {...props} theme="core" />
}

export function PanelInput ({ className, ...others }) {
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

export function CoreTextarea (props) {
  return <Textarea {...props} theme="core" />
}

export function PanelTextarea ({ className, ...others }) {
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

export function CoreInputNumber (props) {
  return <InputNumber {...props} theme="core" />
}

export function SelectNumber ({ className, ...others }) {
  return (
    <InputNumber
      className={trimList(['SelectNumber', className])}
      {...others}
    />
  )
}

SelectNumber.propTypes = {
  className: PropTypes.string,
}

SelectNumber.defaultProps = {
  optionList: [1, 2, 3],
}

export function CoreSelectNumber (props) {
  return <SelectNumber {...props} theme="core" />
}

export function CoreInputEmail (props) {
  return <InputEmail {...props} theme="core" />
}

export function PanelInputEmail ({ className, ...others }) {
  return (
    <InputEmail
      size="small"
      className={trimList(['PanelInputEmail', className])}
      {...others}
    />
  )
}

PanelInputEmail.propTypes = {
  className: PropTypes.string,
}
