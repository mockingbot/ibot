import compact from 'lodash/compact'
import './polyfill'

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function trimList(list) {
  return compact(list).join(' ')
}

export function getOtherProps({ propTypes = {} }, props) {
  const propKeyList = Object.keys(propTypes)

  return Object.entries(props).reduce(
    (result, [key, val]) => (
      !propKeyList.includes(key)
      ? Object.assign(result, { [key]: val })
      : result
    ),
    {},
  )
}

export function $(selector, context = document) {
  return context.querySelector(selector)
}

export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector))
}

export * as SVG from './svg'
