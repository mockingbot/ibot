import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { trimList, $, SVG } from '../util'

import './index.styl'

const MENU_ROOT_ID = 'MB_DROPDOWN_MENU_ROOT'

const $menuRoot = (
  document.getElementById(MENU_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: MENU_ROOT_ID })
)

const $body = document.body

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot)
}

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    Object.assign(this, {
      state: {
        isOpen: false,
        $opener: null,
        currentMenuListItemIdx: props.currentMenuListItemIdx,
      },

      leaveTimeoutList: [],
    })
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

    shouldOpenOnHover: PropTypes.bool,
    hoverDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    arrowed: PropTypes.bool,
    position: PropTypes.oneOf(['top', 'bottom']),
    unfold: PropTypes.oneOf(['left', 'center', 'right']),
    inflexible: PropTypes.bool,

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,

    onSelect: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
  }

  static defaultProps = {
    arrowed: false,

    shouldCloseOnSelect: true,
    shouldOpenOnHover: false,
    hoverDelay: 200,

    position: 'bottom',
    unfold: 'center',
    inflexible: false,
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

  onMouseEnter = () => {
    const { shouldOpenOnHover } = this.props

    if (!shouldOpenOnHover) return
    clearTimeout(this.closeTimeout)

    Object.assign(this, {
      hoverTimeout: setTimeout(
        this.open,
        this.props.hoverDelay,
      ),
    })
  }

  onMouseLeave = () => {
    const { shouldOpenOnHover } = this.props

    if (shouldOpenOnHover) {
      clearTimeout(this.hoverTimeout)
    }
  }

  onMouseMove = ({ clientX, clientY }) => {
    const { shouldOpenOnHover, hoverDelay } = this.props
    const { $opener } = this.state

    if (!shouldOpenOnHover) return

    clearTimeout(this.hoverTimeout)

    const $on = document.elementFromPoint(clientX, clientY)
    const isOutsideOpener = !$opener.contains($on)
    const isOutsideMenu = !$on.closest('.DropdownMenu')

    if (!isOutsideMenu) {
      this.leaveTimeoutList.map(clearTimeout)
      Object.assign(this, { leaveTimeoutList: [] })

    } else if (isOutsideOpener && isOutsideMenu) {
      this.leaveTimeoutList.push(
        setTimeout(this.close, Math.max(hoverDelay, 300))
      )
    }
  }

  set$opener = $opener => this.setState({ $opener })
  onResizeWindow = () => this.state.isOpen && this.close()

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
        <button
          type="button"
          onClick={this.toggle}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          disabled={isDisabled}
        >
        { opener }
        </button>

        <DropdownMenu
          {...this.props}

          isOpen={isOpen}
          $opener={$opener}
          onSelect={this.onSelect}
          onClose={this.close}
          currentMenuListItemIdx={currentMenuListItemIdx}
        />

        <DocumentEvents
          enabled={isOpen}
          onMouseMove={this.onMouseMove}
        />
      </label>
    )
  }
}

class DropdownMenu extends PureComponent {
  constructor(props) {
    super(props)

    Object.assign(this, {
      state: { isDownward: props.position === 'bottom' },

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
    onClose: PropTypes.func,
  }

  componentWillMount() {
    $menuRoot.appendChild(this.portal)
  }

  componentWillReceiveProps({ isOpen: willBeOpen, $opener }) {
    const { $menu } = this
    const { isOpen, position, inflexible } = this.props

    // Set up the position of the <DropdownMenu> once opened:
    if (!isOpen && willBeOpen) {
      const result = positionDropdown({ $menu, $opener, position, inflexible })
      this.setState({ isDownward: result.finalPosition === 'bottom' })
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
  }

  set$menu = $menu => Object.assign(this, { $menu })

  onClickOutside = ({ target }) => {
    const { $opener, onClose } = this.props

    const isOutsideMenu = !$menuRoot.contains(target)

    const closestLabel = target.closest('label')
    const isOwnLabel = closestLabel && closestLabel.contains($opener)
    const hasSelectMenuOpen = !!$('.SelectMenu.is-open')

    if (isOutsideMenu && !isOwnLabel && !hasSelectMenuOpen) {
      onClose()
    }
  }

  onScrollOutside = () => {
    const { $menu } = this
    const { $opener, position, inflexible } = this.props

    const result = positionDropdown({ $menu, $opener, position, inflexible })
    this.setState({ isDownward: result.finalPosition === 'bottom' })
  }

  render() {
    return createPortal(this.renderMenu(), this.portal)
  }

  renderMenu() {
    const {
      isOpen, menuClassName,
      arrowed, unfold,
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
      `unfold-${unfold}`,
      menuClassName,
    ])

    return (
      <div ref={this.set$menu} className={klass}>
        { arrowed && (
          <span className="arrow" dangerouslySetInnerHTML={{ __html: SVG.DROPDOWN_ARROW }} />
        )}

        <div className="content">
        {
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
        }
        </div>

        <DocumentEvents
          enabled={isOpen}
          onMouseDown={this.onClickOutside}
        />

        <DocumentEvents
          enabled={isOpen}
          capture={true}
          onScroll={this.onScrollOutside}
        />
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
 *  @prop {String} [position="bottom"]
 *  @prop {String} [inflexible=false]
 *  @prop {Boolean} [shouldSetMinWidth=false]
 *  @prop {Boolean} [shouldSetMaxHeight=false]
 *@return {Object}
 *  @prop {Object} style
 *  @prop {String} finalPosition
 */
function positionDropdown({
  $opener, $menu,

  position = 'bottom',
  inflexible = false,

  shouldSetMinWidth = false,
  shouldSetMaxHeight = false,
  shouldAlignLeft = false,
} = {}) {
  if (!$opener || !$menu) return

  const { offsetWidth: wOf$menu, offsetHeight: hOf$menu } = $menu
  const { offsetWidth: wOf$opener, offsetHeight: hOf$opener } = $opener
  const { top, bottom, left } = $opener.getBoundingClientRect()
  const { innerHeight: hOf$win } = window

  const minW = Math.max(wOf$opener, wOf$menu)
  const minY = 10
  const maxY = hOf$win - 10

  const result = { style: {}, finalPosition: position }
  const setStyle = style => Object.assign(result.style, style)

  // Y middle line of the $opener:
  const midOf$opener = top + hOf$opener/2

  // Point deciding the position for the menu:
  const decidingPoint = hOf$win * (position === 'top' ? 1/3 : 2/3)

  // Set X position, etc:
  setStyle({ left: `${ shouldAlignLeft ? left : left + wOf$opener/2}px` })

  if (shouldSetMinWidth) {
    setStyle({ minWidth: `${minW}px` })
  }

  // Slide downward:
  if (
    inflexible && position === 'bottom'
    || !inflexible && decidingPoint >= midOf$opener
  ) {
    Object.assign(result, { finalPosition: 'bottom' })

    setStyle({ top: `${bottom}px`, bottom: '' })

    // If the height of the menu is taller than that of space downward:
    if (shouldSetMaxHeight && bottom + hOf$menu > maxY) {
      setStyle({ maxHeight: `${maxY - bottom}px` })
    }

  // Slide upward:
  } else {
    Object.assign(result, { finalPosition: 'top' })

    setStyle({ top: '', bottom: `${hOf$win - top}px` })

    // If the height of the menu is taller than that of space upward:
    if (shouldSetMaxHeight && top - hOf$menu < minY) {
      setStyle({ maxHeight: `${top - minY}px` })
    }
  }

  Object.assign($menu.style, result.style)
  return result
}

export default Object.assign(Dropdown, { positionDropdown: positionDropdown })
