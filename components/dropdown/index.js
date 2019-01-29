import React, { cloneElement, createRef, isValidElement, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { isBoolean, isEqual } from 'lodash'

import { preventScrollingPropagation, trimList, $, preparePortal } from '../util'
import { DROPDOWN_ARROW } from '../util/svg'
import { positionMenu } from './util'

import './index.styl'

const MENU_ROOT_ID = 'IBOT_DROPDOWN_MENU_ROOT'

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
    prevProps: this.props,
    isOpen: this.props.isOpen,

    $opener: null,
    currentMenuListItemIdx: this.props.currentMenuListItemIdx,
  }

  leaveTimeoutList = []

  static positionMenu = positionMenu

  static propTypes = {
    isOpen: PropTypes.bool,

    opener: PropTypes.node,
    openerType: PropTypes.oneOf(['button', 'custom']),
    className: PropTypes.string,

    portalClassName: PropTypes.string,
    menuBaseClassName: PropTypes.string,
    menuClassName: PropTypes.string,

    menuBaseStyle: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      top: PropTypes.number,

      width: PropTypes.number,
      height: PropTypes.number,
    }),

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

    shouldPreventScrollingPropagation: PropTypes.bool,
    shouldOpenOnHover: PropTypes.bool,
    shouldCloseOnClickOutside: PropTypes.bool,
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

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    arrowed: false,
    openerType: 'button',

    shouldPreventScrollingPropagation: true,
    shouldCloseOnSelect: true,
    shouldOpenOnHover: false,
    shouldCloseOnClickOutside: true,
    hoverDelay: 200,

    menuX: 'center',
    menuY: 'bottom',

    inflexible: false,
    menuBasedX: false,

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,
  }

  static getDerivedStateFromProps(props, { prevProps, isOpen }) {
    if (!isEqual(props, prevProps)) {
      if (isBoolean(props.isOpen)) {
        return { prevProps: props, isOpen: props.isOpen }
      }
      return { prevProps: props }
    }
    return null
  }

  componentDidUpdate(_, { isOpen: wasOpen }) {
    const { onOpen, onClose, onToggle } = this.props
    const { isOpen } = this.state

    if (wasOpen !== isOpen) {
      if (isOpen) {
        onOpen()
        onToggle(true)
      } else {
        onClose()
        onToggle(false)
      }
    }
  }

  toggle = willBeOpen => this.setState(
    { isOpen: isBoolean(willBeOpen) ? willBeOpen : !this.state.isOpen },
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
    const { className, opener, openerType, shouldCloseOnClickOutside } = this.props
    const { isOpen, $opener, currentMenuListItemIdx } = this.state
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      'Dropdown',
      isOpen && 'is-open',
      isDisabled && 'is-disabled',
      className,
    ])

    const openerAttr = {
      onClick: this.toggle,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      disabled: isDisabled,
    }

    return (
      <label ref={this.set$opener} className={klass}>
        {
          openerType !== 'button' && isValidElement(opener)
          ? cloneElement(opener, openerAttr)

          : <button type="button" {...openerAttr}>
              { opener }
            </button>
        }

        <DropdownMenu
          {...this.props}

          isOpen={isOpen}
          $opener={$opener}
          onSelect={this.onSelect}
          onClose={this.close}
          shouldCloseOnClickOutside={shouldCloseOnClickOutside}
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

  portal = preparePortal(
    $menuRoot,
    trimList(['DropdownMenuPortal', this.props.portalClassName]),
  )

  static propTypes = {
    ...Dropdown.propTypes,
    isOpen: PropTypes.bool,
    $opener: PropTypes.instanceOf(Element),
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
  }

  componentDidMount() {
    const { isOpen, shouldPreventScrollingPropagation } = this.props
    const { menuBaseRef: { current: $menuBase } } = this

    if (isOpen) {
      setTimeout(this.position)
    }

    if (shouldPreventScrollingPropagation) {
      preventScrollingPropagation($('.content', $menuBase))
    }

    window.addEventListener('resize', this.onResizeWindow)
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

    window.removeEventListener('resize', this.onResizeWindow)
  }

  menuBaseRef = createRef()

  onResizeWindow = () => this.props.isOpen && this.position()

  onClickOutside = ({ target }) => {
    const { $opener, onClose, shouldCloseOnClickOutside } = this.props

    if (!shouldCloseOnClickOutside) return

    const isOutsideMenu = !$menuRoot.contains(target)

    const closestLabel = target.closest('label')
    const isOwnLabel = closestLabel && closestLabel.contains($opener)
    const hasSelectMenuOpen = !!$('.SelectMenu.is-open')

    if (isOutsideMenu && !isOwnLabel && !hasSelectMenuOpen) {
      onClose()
    }
  }

  position = () => {
    const { $opener, menuX, menuY, menuBaseStyle, inflexible } = this.props
    const { menuBaseRef: { current: $menuBase } } = this

    const { isDownward } = positionMenu({
      $menuBase, $opener,
      menuX, menuY, menuBaseStyle,
      inflexible,
    })

    this.setState({ isDownward })
  }

  render() {
    const { portal, menu } = this
    return createPortal(menu, portal)
  }

  get menu() {
    const {
      isOpen,

      menuBaseClassName,
      menuClassName,

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
      <div ref={this.menuBaseRef} className={trimList(['DropdownMenuBase', menuBaseClassName])}>
        <div className={klass}>
          { arrowed && (
            <span className="arrow" dangerouslySetInnerHTML={{ __html: DROPDOWN_ARROW }} />
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
            onClick={this.onClickOutside}
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
