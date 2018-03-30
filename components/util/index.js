import compact from 'lodash/compact'
import './polyfill'

import './index.styl'

import * as SVG from './svg'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function trimList(list) {
  return compact(list).join(' ')
}

function getOtherProps({ propTypes = {} }, props) {
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

function $(selector, context = document) {
  return context.querySelector(selector)
}

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector))
}

export default { EMAIL_REGEX, trimList, getOtherProps, $, $$, SVG }
