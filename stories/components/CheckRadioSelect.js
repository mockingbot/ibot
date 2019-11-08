import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/input'
import Check, { CheckGroup } from '../../components/check'
import Radio, { RadioGroup } from '../../components/radio'
import Select from '../../components/select'
import { trimList } from '../../components/util'

export function CoreCheck (props) {
  return <Check {...props} theme="core" />
}

export function CoreCheckGroup (props) {
  return <CheckGroup {...props} theme="core" />
}

export function CoreRadio (props) {
  return <Radio {...props} theme="core" />
}

export function CoreRadioGroup (props) {
  return <RadioGroup {...props} theme="core" />
}

export function CoreSelect (props) {
  return <Select {...props} theme="core" />
}

export function PanelSelect ({ className, ...others }) {
  return (
    <Input
      size="small"
      className={trimList(['PanelSelect', className])}
      {...others}
    />
  )
}

PanelSelect.propTypes = {
  className: PropTypes.string,
}
