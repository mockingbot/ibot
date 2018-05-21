import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { isBoolean } from 'lodash'

import { trimList, $, SVG, preparePortal } from '../util'
import { positionMenu } from './util'

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

export default class Dropdown extends PureComponent {
  state = {
    isOpen: false,
    $opener: null,
    currentMenuListItemIdx: this.props.currentMenuListItemIdx,
  }

  leaveTimeoutList = []

  static positionMenu = positionMenu

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
    inflexible: PropTypes.bool,

    menuX: PropTypes.oneOf(['left', 'center', 'right']),
    menuY: PropTypes.oneOf(['top', 'bottom']),
    menuBasedX: PropTypes.bool,

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,

    onSelect: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,

    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    arrowed: false,

    shouldCloseOnSelect: true,
    shouldOpenOnHover: false,
    hoverDelay: 200,

    menuX: 'center',
    menuY: 'bottom',

    inflexible: false,
    menuBasedX: false,

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeWindow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow)
  }

  toggle = willBeOpen  => this.setState(
    { isOpen: isBoolean(willBeOpen) ? willBeOpen : !this.state.isOpen },
    () => {
      const { onOpen, onClose, onToggle } = this.props
      const { isOpen } = this.state

      if (isOpen) {
        onOpen()
      } else {
        onClose()
      }

      onToggle(isOpen)
    },
  )

  open = () => this.toggle(true)
  close = () => this.toggle(false)

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
  state = { isDownward: this.props.position === 'bottom' }

  portal = preparePortal($menuRoot, 'DropdownMenuPortal')

  static propTypes = {
    ...Dropdown.propTypes,
    isOpen: PropTypes.bool,
    $opener: PropTypes.instanceOf(Element),
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
  }

  componentDidUpdate({ isOpen: wasOpen }) {
    const { isOpen } = this.props

    // Set up the position of the <DropdownMenu> once opened:
    if (!wasOpen && isOpen) {
      this.position()
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
  }

  set$menuBase = $menuBase => Object.assign(this, { $menuBase })

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

  position = () => {
    const { $menuBase } = this
    const { $opener, menuX, menuY, inflexible } = this.props

    const { isDownward } = positionMenu({ $menuBase, $opener, menuX, menuY, inflexible })
    this.setState({ isDownward })
  }

  render() {
    return createPortal(this.renderMenu(), this.portal)
  }

  renderMenu() {
    const {
      isOpen, menuClassName,
      menu, menuList,
      arrowed, menuX, menuY, menuBasedX,
      currentMenuListItemIdx,
      onSelect,
    } = this.props

    const { isDownward } = this.state

    const klass = trimList([
      'DropdownMenu',
      isOpen && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      `x-${menuX}`,
      arrowed && `arrowed ${menuBasedX ? 'x-menu-based' : 'x-arrow-based'}`,
      menuClassName,
    ])

    return (
      <div ref={this.set$menuBase} className="DropdownMenuBase">
        <div className={klass}>
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
            onScroll={this.position}
          />
        </div>
      </div>
    )
  }
}