import { isValidElement } from 'react'

import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'

export function getOptionLabel(it) {
  return (
    isString(it) || isNumber(it) || isValidElement(it)
    ? it
    : it.label || it.value
    ? it.label || it.value
    : undefined
  )
}

export function getOptionValue(it) {
  return (
    isString(it) || isNumber(it)
    ? String(it)
    : it.value || it.label
    ? String(it.value || it.label)
    : undefined
  )
}

export function convertValueListToSet(valueList) {
  return new Set(Array.from(valueList || []).map(String))
}

export function checkOptionByValue(it, value) {
  return !!value && getOptionValue(it) === String(value)
}

export function checkOptionByValueList(it, valueList) {
  return convertValueListToSet(valueList).has(getOptionValue(it))
}

export function setNumberValue(value) {
  return value !== '' && isNumber(Number(value)) ? Number(value) : ''
}
