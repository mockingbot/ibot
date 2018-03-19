import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'

export function getOptionLabel(it) {
  return (
    isString(it) || isNumber(it)
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

export function checkOptionByValue(it, value) {
  return !!value && getOptionValue(it) === String(value)
}

export function getCurrentOptionIdx(
  { currentOptionIdx, value } = {
    currentOptionIdx: (this.state || this.props).currentOptionIdx,
    value: this.props.value,
  }
) {
  const { optionList } = this.props

  if (!value && isNumber(currentOptionIdx) || isString(currentOptionIdx)) {
    return currentOptionIdx
  }

  const firstIdx = optionList.findIndex(it => (
    isArray(it)
    ? !!it.find(o => checkOptionByValue(o, value))
    : checkOptionByValue(it, value)
  ))

  const group = optionList[firstIdx]
  const isInGroup = isArray(group)

  const secondIdx = isInGroup && (
    group.findIndex((it, idx) => (
      idx === 0 ? false : checkOptionByValue(it, value)
    ))
  )

  return isInGroup ? `${firstIdx}.${secondIdx}` : firstIdx
}
