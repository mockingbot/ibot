import isBoolean from 'lodash/isBoolean'
import compact from 'lodash/compact'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import { isValidElement } from 'react'
export * as SVG from './svg'

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9-]{2,63}$/i

const IBOT = { OPEN_MODAL_STACK: [] }

export function checkModalIndexInStack (modal) {
  return IBOT.OPEN_MODAL_STACK.indexOf(modal)
}

export function checkNoOpenModalInStack () {
  const { OPEN_MODAL_STACK } = IBOT
  return OPEN_MODAL_STACK.length === 0 || OPEN_MODAL_STACK.every(modal => !modal.state.isOpen)
}

export function addModalToStack (modal) {
  return Object.assign(IBOT, { OPEN_MODAL_STACK: [ modal, ...IBOT.OPEN_MODAL_STACK ] })
}

export function deleteModalFromStack (modal) {
  return Object.assign(IBOT, { OPEN_MODAL_STACK: IBOT.OPEN_MODAL_STACK.filter(it => it !== modal) })
}

export function trimList (list) {
  return compact(list).join(' ')
}

export function getOtherProps ({ propTypes = {} }, props) {
  const propKeyList = Object.keys(propTypes)

  return Object.entries(props).reduce(
    (result, [ key, val ]) => (
      !propKeyList.includes(key)
        ? Object.assign(result, { [ key ]: val })
        : result
    ),
    {}
  )
}

export function $ (selector, context = document) {
  return context.querySelector(selector)
}

export function $$ (selector, context = document) {
  return Array.from(context.querySelectorAll(selector))
}

export function preparePortal ($root, className) {
  const $portal = Object.assign(
    document.createElement('div'),
    { className }
  )

  $root.appendChild($portal)
  return $portal
}

export function preventScrollingPropagation ($elmt) {
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
    }
  )
}

export function toggleGlobalScroll (expected) {
  const $root = document.documentElement
  const $body = document.body
  const $content = $('.ContentRoot')

  const { innerWidth: vw, scrollX, scrollY } = window
  const is = isBoolean(expected) ? expected : $body.classList.toggle('is-content-fixed')

  if (isBoolean(expected)) {
    $body.classList[ expected ? 'add' : 'remove' ]('is-content-fixed')
  }

  if (!$content) return is

  if (is) {
    $content.style.left = `-${scrollX}px`
    $content.style.top = `-${scrollY}px`

    window.scrollTo(
      Math.max(($root.scrollWidth - vw) / 2, 0),
      0
    )
  } else {
    window.scrollTo(
      Math.abs(parseInt($content.style.left, 10)),
      Math.abs(parseInt($content.style.top, 10))
    )
  }

  return is
}

export function getOptionLabel (it, optionLabelProp) {
  return (
    isString(it) || isNumber(it) || isValidElement(it)
      ? it
      : it[ optionLabelProp || 'label' || 'value' ]
        ? it[ optionLabelProp || 'label' || 'value' ]
        : undefined
  )
}

export function getOptionValue (it) {
  return (
    isString(it) || isNumber(it)
      ? String(it)
      : it.value || it.label
        ? String(it.value || it.label)
        : undefined
  )
}

export function convertValueListToSet (valueList) {
  return new Set(Array.from(valueList || []).map(String))
}

export function checkOptionByValue (it, value) {
  return !!value && getOptionValue(it) === String(value)
}

export function checkOptionByValueList (it, valueList) {
  return convertValueListToSet(valueList).has(getOptionValue(it))
}

export function setNumberValue (value) {
  return value !== '' && isNumber(Number(value)) ? Number(value) : ''
}
