import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { isBoolean, isEqual } from 'lodash'

import { Button } from '../button'
import SVG from '../svg'
import Icon from '../icon'
import Switch from '../switch'
import { CANT_SCROLL_CLASS, trimList, $, preparePortal } from '../util'

import './index.styl'

const OPEN_MODAL_STACK = []
const stopPropagation = e => e.stopPropagation()

const MODAL_ROOT_ID = 'IBOT_MODAL_ROOT'
const MODAL_PORTAL_CLASS = 'CoreModalPortal'

const $body = document.body

const $modalRoot = (
  document.getElementById(MODAL_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: MODAL_ROOT_ID })
)

if (!$body.contains($modalRoot)) {
  $body.appendChild($modalRoot)
}

const TYPE_CLASS_MAP = {
  alert: 'AlertCoreModal',
  form: 'FormCoreModal',
  functional: 'FunctionalCoreModal',
  display: 'DisplayCoreModal',
}

export default class CoreModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.node,
    children: PropTypes.node,

    modal: PropTypes.node,
    type: PropTypes.oneOf(['alert', 'form', 'functional', 'display']),

    opener: PropTypes.node,
    openerType: PropTypes.oneOf(['primary', 'regular', 'text', 'switch', 'custom', 'none']),

    className: PropTypes.string,
    maskClassName: PropTypes.string,
    portalClassName: PropTypes.string,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,

    canClose: PropTypes.bool,
    canCloseOnClickMask: PropTypes.bool,
    shouldCloseOnAction: PropTypes.bool,

    canCloseOnEsc: PropTypes.bool,
    canConfirmOnEnter: PropTypes.bool,

    onConfirm: PropTypes.func,
    confirmText: PropTypes.string,
    isConfirmDisabled: PropTypes.bool,

    onCancel: PropTypes.func,
    isCancelDisabled: PropTypes.bool,
    cancelText: PropTypes.string,
  }

  static defaultProps = {
    openerType: 'none',
    type: 'functional',

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,

    canClose: true,
    canCloseOnClickMask: true,
    shouldCloseOnAction: true,
    canCloseOnEsc: true,
    canConfirmOnEnter: true,
  }

  state = {
    prevProps: this.props,
    isOpen: this.props.isOpen,
    isVisible: false,
  }

  portal = preparePortal(
    $modalRoot,
    trimList([MODAL_PORTAL_CLASS, this.props.portalClassName]),
  )

  static getDerivedStateFromProps(props, { prevProps, isOpen }) {
    if (!isEqual(prevProps, props)) {
      const { isOpen: willBeOpen } = props

      if (isBoolean(willBeOpen)) {
        if (!isOpen && willBeOpen) {
          return { isOpen: true, prevProps: props }
        } else if (isOpen && !willBeOpen) {
          return { isVisible: false, prevProps: props }
        }
      }
      return { prevProps: props }
    }

    return null
  }

  componentDidMount() {
    const { onOpen, onToggle } = this.props
    const { isOpen } = this.state

    if (isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        this.didOpen,
      ))
    }

    window.addEventListener('resize', this.positionY)
  }

  componentDidUpdate(_, { isOpen: wasOpen }) {
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        this.didOpen,
      ))
    } else if (wasOpen && !isOpen) {
      this.didClose()
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
    $body.classList.remove(CANT_SCROLL_CLASS)

    window.removeEventListener('resize', this.positionY)
  }

  didOpen = () => {
    const { onOpen, onToggle } = this.props

    OPEN_MODAL_STACK.unshift(this)

    this.positionY()
    $body.classList.add(CANT_SCROLL_CLASS)

    onOpen()
    onToggle(true)
  }

  didClose = () => {
    const { onClose, onToggle } = this.props

    // Remove from the stack in the next round:
    const idx = OPEN_MODAL_STACK.indexOf(this)
    setTimeout(() => OPEN_MODAL_STACK.splice(idx, 1))

    $body.classList.remove(CANT_SCROLL_CLASS)

    onClose()
    onToggle(false)
  }

  onTransitionEnd = ({ target }) => {
    const { isVisible } = this.state

    if (!isVisible && target.matches('.CoreModalMask')) {
      this.setState({ isOpen: false })
    }
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isVisible: false })

  toggle = (willBeOpen = !this.state.isOpen) => (
    willBeOpen ? this.open() : this.close()
  )

  positionY = () => setTimeout(() => {
    const { type } = this.props
    const $modal = $('.CoreModal', this.portal)

    if (!$modal || type === 'alert') return

    const { innerHeight: vh } = window
    const { offsetHeight: h } = $modal

    const action = (vh <= h || ((vh - h)/2) < (vh * .2)) ? 'add' : 'remove'
    $modal.classList[action]('is-v-centered')
  })

  onClickMask = e => {
    stopPropagation(e)

    const { canClose, canCloseOnClickMask } = this.props
    const isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open')

    if (canClose && canCloseOnClickMask && !isSelectMenuOpen) {
      this.close()
    }
  }

  onKeyDown = ({ key, target: $elmt }) => {
    const {
      type,
      canClose, canCloseOnEsc,
      canConfirmOnEnter,
      onConfirm,
    } = this.props

    const { isOpen } = this.state
    const isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open')

    if (
      key === 'Escape'

      // Not focus on form elements:
      && !$elmt.matches('input, textarea, select') && !isSelectMenuOpen

      // Current modal is open and can close via esc:
      && isOpen && canClose && canCloseOnEsc && !isSelectMenuOpen

      // Only work on the toppest modal:
      && this === OPEN_MODAL_STACK[0]
    ) {
      this.close()
    }
  }

  render() {
    return this.opener
  }

  get opener() {
    const { opener, openerType } = this.props
    const { isOpen } = this.state

    const { modal } = this

    return (
      openerType === 'none'
      ? modal

      : openerType === 'custom'
      ? (
        opener
        ? <span onClick={this.toggle}>
            { opener }
            { modal }
          </span>
        : modal
      )

      : openerType === 'switch'
      ? <Switch isChecked={isOpen} onChange={this.toggle}>
          { modal }
        </Switch>

      : <Button type={openerType} onClick={this.open}>
          { opener }
          { modal }
        </Button>
    )
  }

  get modal() {
    return createPortal(this.modalDOM, this.portal)
  }

  get modalDOM() {
    const {
      type,
      maskClassName,
      className,
      title,

      children,

      canClose, canCloseOnClickMask,
    } = this.props

    const { isOpen, isVisible } = this.state

    return isOpen && (
      <div
        className={trimList([
          'CoreModalMask',
          maskClassName,
          isVisible && 'is-open',
          canClose && canCloseOnClickMask ? 'can-close' : 'cant-close',
        ])}
        onClick={this.onClickMask}
        onTransitionEnd={this.onTransitionEnd}
      >
        <div
          className={trimList(['CoreModal', TYPE_CLASS_MAP[type], className])}
          onTransitionEnd={stopPropagation}
          onClick={stopPropagation}
        >
          <header>
            { title }

            {/* Close button */}
            { canClose && (
              <Button type="text" className="close-btn" onClick={this.close}>
                <SVG name="times" label="Close the Modal" />
              </Button>
            )}
          </header>

          <div className="content">
            { children }
          </div>
        </div>

        <DocumentEvents onKeyDown={this.onKeyDown} />
      </div>
    )
  }
}
