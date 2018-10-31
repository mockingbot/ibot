import { compact, isBoolean } from 'lodash'

import './polyfill'

import './index.styl'

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

export function preparePortal($root, className) {
  const $portal = Object.assign(
    document.createElement('div'),
    { className },
  )

  $root.appendChild($portal)
  return $portal
}

export function preventScrollingPropagation($elmt) {
  if (!$elmt || !($elmt instanceof Element)) return

  $elmt.addEventListener(
    'wheel',
    e => {
      const { scrollTop, scrollHeight } = $elmt
      const { height } = $elmt.getBoundingClientRect()

      const delta = e.deltaY * -1
      const isUp = delta > 0

      const prevent = () => {
        e.stopPropagation()
        e.preventDefault()
        return false
      }

      // Scrolling down, but this will take us past the bottom.
      if (!isUp && -delta > scrollHeight - height - scrollTop) {
          $elmt.scrollTop = scrollHeight
          return prevent()

      // Scrolling up, but this will take us past the top.
      } else if (isUp && delta > scrollTop) {
          $elmt.scrollTop = 0
          return prevent()
      }
    },
  )
}

export function toggleGlobalScroll(expected) {
  const $root = document.documentElement
  const $body = document.body
  const $content = $('.ContentRoot')

  const { innerWidth: vw, scrollX, scrollY } = window
  const is = isBoolean(expected) ? expected : $body.classList.toggle('is-content-fixed')

  if (isBoolean(expected)) {
    $body.classList[expected ? 'add' : 'remove']('is-content-fixed')
  }

  if (!$content) return is

  if (is) {
    $content.style.left = `-${scrollX}px`
    $content.style.top = `-${scrollY}px`

    window.scrollTo(
      Math.max(($root.scrollWidth - vw)/2, 0),
      0,
    )
  } else {
    window.scrollTo(
      Math.abs(parseInt($content.style.left, 10)),
      Math.abs(parseInt($content.style.top, 10)),
    )
  }

  return is
}
