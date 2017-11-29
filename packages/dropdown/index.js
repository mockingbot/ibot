import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { trimList, DROPDOWN_ARROW } from '@ibot/util'

import './index.styl'

const MENU_ROOT_ID = 'MB_DROPDOWN_MENU_ROOT'
const { I18N = {} } = window

const $menuRoot = (
  document.getElementById(MENU_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: MENU_ROOT_ID })
)

const $body = document.body

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot)
}

export default class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      $opener: null,
      currentMenuListItemIdx: props.currentMenuListItemIdx,
    }
  }

  static propTypes = {
    opener: PropTypes.node,
    className: PropTypes.string,

    menuClassName: PropTypes.string,
    menu: PropTypes.node,
    menuList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        // Regular options:
        PropTypes.node,
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.any,
          isDisabled: PropTypes.bool,
        }),
      ])
    ),

    currentMenuListItemIdx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    arrowed: PropTypes.bool,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,

    onSelect: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
  }

  static defaultProps = {
    arrowed: false,
    shouldCloseOnSelect: true,
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResizeWindow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow)
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })
  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  set$opener = $opener => this.setState({ $opener })
  onResizeWindow = () => this.state.isOpen && this.close()

  onClickOutside = ({ target }) => (
    !$menuRoot.contains(target)
    && !(target.closest('label') && this.state.$opener.contains(target))
    && this.close()
  )

  onSelect = ({ currentTarget }) => {
    const { menuList, onSelect, shouldCloseOnSelect } = this.props

    if (typeof onSelect !== 'function') return

    const idx = currentTarget.dataset.idx
    const item = menuList[idx]
    const value = typeof item === 'string' ? item : (item && item.value)

    onSelect(idx, value)
    this.setState({ currentMenuListItemIdx: idx })

    if (shouldCloseOnSelect) {
      this.close()
    }
  }

  render() {
    const { className, opener } = this.props
    const { isOpen, $opener, currentMenuListItemIdx } = this.state
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      'Dropdown',
      isOpen && 'is-open',
      isDisabled && 'is-disabled',
      className,
    ])

    return (
      <label ref={this.set$opener} className={klass}>
        <button type="button" onClick={this.toggle} disabled={isDisabled}>
        { opener }
        </button>

        <DropdownMenu
          {...this.props}

          isOpen={isOpen}
          $opener={$opener}
          onSelect={this.onSelect}
          currentMenuListItemIdx={currentMenuListItemIdx}
        />

        { isOpen && (
          <DocumentEvents
            onMouseDown={this.onClickOutside}
            onScroll={this.onScrollOutside}
          />
        )}
      </label>
    )
  }
}

class DropdownMenu extends PureComponent {
  constructor(props) {
    super(props)

    Object.assign(this, {
      state: { isDownward: true },

      portal: Object.assign(
        document.createElement('div'),
        { className: 'DropdownMenuPortal' },
      ),
    })
  }

  static propTypes = {
    ...Dropdown.propTypes,
    isOpen: PropTypes.bool,
    $opener: PropTypes.instanceOf(Element),
    onSelect: PropTypes.func,
  }

  componentWillMount() {
    $menuRoot.appendChild(this.portal)
  }

  componentWillReceiveProps({ isOpen: willBeOpen, $opener }) {
    const { isOpen } = this.props
    const { $menu } = this

    // Set up the position of the <SelectMenu> once opened:
    if (!isOpen && willBeOpen) {
      const result = positionDropdown({ $menu, $opener })
      this.setState({ isDownward: result.direction === 'DOWN' })
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
  }

  set$menu = $menu => Object.assign(this, { $menu })

  render() {
    return createPortal(this.renderMenu(), this.portal)
  }

  renderMenu() {
    const {
      isOpen, menuClassName, arrowed,
      menu, menuList,
      currentMenuListItemIdx,
      onSelect,
    } = this.props

    const { isDownward } = this.state

    const klass = trimList([
      'DropdownMenu',
      isOpen && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      arrowed && 'arrowed',
      menuClassName,
    ])

    const content = (
      menuList
      ? (
        <ul className="MenuList">
        { menuList.map((it, idx) => (
          <li
            key={idx}
            role="option"
            data-idx={idx}
            className={trimList([
              it.isDisabled && 'is-disabled',
              idx === Number(currentMenuListItemIdx) && 'is-active',
            ])}
            onClick={it.isDisabled ? undefined : onSelect}
          >
          { it.label || it }
          </li>
        ))}
        </ul>
      )
      : menu
    )

    return (
      <div ref={this.set$menu} className={klass}>
        { arrowed && (
          <span className="arrow" dangerouslySetInnerHTML={{ __html: DROPDOWN_ARROW }} />
        )}

        <div className="content">
          { content }
        </div>
      </div>
    )
  }
}

/**
 * Position menu according to where its opener is and returns
 * corresponding information.
 *
 * @param {Object} option
 *  @prop {Element} $opener
 *  @prop {Element} $menu
 *  @prop {Boolean} [shouldSetMinWidth=false]
 *@return {Object}
 *  @prop {Object} style
 *  @prop {String} direction
 */
export function positionDropdown({ $opener, $menu, shouldSetMinWidth = false }) {
  if (!$opener || !$menu) return

  const { offsetWidth: wOf$menu, offsetHeight: hOf$menu } = $menu
  const { offsetWidth: wOf$opener, offsetHeight: hOf$opener } = $opener
  const { top, bottom, left } = $opener.getBoundingClientRect()
  const { innerHeight: hOf$win } = window

  const minW = Math.max(wOf$opener, wOf$menu)
  const minY = 10
  const maxY = hOf$win - 10

  const result = { style: {}, direction: 'DOWN' }
  const setStyle = style => Object.assign(result.style, style)

  // Y middle line of the $opener:
  const midOf$opener = top + hOf$opener/2

  // Deciding point which separates menus going upward or downward:
  const decidingPoint = hOf$win * 2/3

  // Set X position, etc:
  setStyle({ left: `${left}px` })

  if (shouldSetMinWidth) {
    setStyle({ minWidth: `${minW}px` })
  }

  // Slide downward:
  if (decidingPoint >= midOf$opener) {
    setStyle({ top: `${bottom}px` })

    // If the height of the menu is taller than that of space downward:
    if (bottom + hOf$menu > maxY) {
      setStyle({ maxHeight: `${maxY - bottom}px` })
    }

  // Slide upward:
  } else {
    Object.assign(result, { direction: 'UP' })

    setStyle({ top: '', bottom: `${hOf$win - top}px` })

    // If the height of the menu is taller than that of space upward:
    if (top - hOf$menu < minY) {
      setStyle({ maxHeight: `${top - minY}px` })
    }
  }

  Object.assign($menu.style, result.style)
  return result
}
