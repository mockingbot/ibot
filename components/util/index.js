import compact from 'lodash/compact'
import './polyfill'

import './index.styl'

export * as SVG from './svg'

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const CANT_SCROLL_CLASS = 'ibot-cant-scroll'

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

export function preparePortal($root, className) {
  const $portal = Object.assign(
    document.createElement('div'),
    { className },
  )

  $root.appendChild($portal)
  return $portal
}
