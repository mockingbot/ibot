import React, { Fragment, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from 'react-event-listener'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import Button from '../button'
import Switch from '../switch'
import SVG from '../svg'
import {
  addModalToStack, deleteModalFromStack, checkNoOpenModalInStack, checkModalIndexInStack,
  toggleGlobalScroll, trimList, $, preparePortal, stopPropagation
} from '../util'
import { StyledMask, StyledModal, StyledModalPortal } from './styled'

const MODAL_ROOT_ID = 'IBOT_MODAL_ROOT'
const MODAL_PORTAL_CLASS = 'ModalPortal'

const TYPE_CLASS_MAP = {
  alert: 'AlertModal',
  form: 'FormModal',
  functional: 'FunctionalModal',
  display: 'DisplayModal'
}

export default class Modal extends PureComponent {
  state = {
    prevProps: this.props,
    isOpen: this.props.isOpen,
    isVisible: false
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.node,
    children: PropTypes.node,

    modal: PropTypes.node,
    type: PropTypes.oneOf([ 'alert', 'form', 'functional', 'display' ]),

    opener: PropTypes.node,
    openerType: PropTypes.oneOf([ 'primary', 'regular', 'text', 'switch', 'custom', 'none' ]),

    className: PropTypes.string,
    maskClassName: PropTypes.string,
    portalClassName: PropTypes.string,

    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
    onModalTransitionEnd: PropTypes.func,

    canClose: PropTypes.bool,
    canCloseOnClickMask: PropTypes.bool,
    shouldCloseOnAction: PropTypes.bool,

    canCloseOnEsc: PropTypes.bool,
    canConfirmOnEnter: PropTypes.bool,

    onConfirm: PropTypes.func,
    isConfirmDisabled: PropTypes.bool,

    onCancel: PropTypes.func,
    isCancelDisabled: PropTypes.bool
  }

  static defaultProps = {
    isOpen: false,
    type: 'functional',
    openerType: 'none',

    portalClassName: '',
    maskClassName: '',
    className: '',

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,
    onModalTransitionEnd: () => null,

    canClose: true,
    canCloseOnClickMask: true,
    canCloseOnEsc: true,
    shouldCloseOnAction: true,
    canConfirmOnEnter: true
  }

  static getDerivedStateFromProps (props, { prevProps }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, isOpen: props.isOpen }
    }

    return null
  }

  componentDidMount () {
    const { isOpen } = this.state
    this.init()
    if (isOpen) {
      setTimeout(this.didOpen)
    }
    window.addEventListener('resize', this.positionY)
  }

  init = () => {
    this.I18N = get(window, 'I18N', {})
    const $body = document.body

    this.$modalRoot = (
      document.getElementById(MODAL_ROOT_ID) ||
      Object.assign(document.createElement('div'), { id: MODAL_ROOT_ID })
    )

    if (!$body.contains(this.$modalRoot)) {
      $body.appendChild(this.$modalRoot)
    }

    this.portal = preparePortal(
      this.$modalRoot,
      trimList([ MODAL_PORTAL_CLASS, this.props.portalClassName ])
    )
  }

  componentDidUpdate (_, { isOpen: wasOpen }) {
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      this.open()
    } else if (wasOpen && !isOpen) {
      this.close()
    }
  }

  componentWillUnmount () {
    if (this.portal) this.portal.remove()

    this.didClose()
    window.removeEventListener('resize', this.positionY)
  }

  open = () => this.setState({ isOpen: true }, this.didOpen)
  close = () => this.portal.classList.remove('is-open')

  toggle = (willBeOpen = !this.state.isOpen) => (
    willBeOpen ? this.open() : this.close()
  )

  didOpen = () => {
    this.forceUpdate()
    const { portal } = this

    // Store in the modal stack to monitor:
    addModalToStack(this)

    // Reassign Y position of the modal:
    this.positionY()
    this.focusOnInput()

    // Transition:
    setTimeout(() => this.portal.classList.add('is-open'))
  }

  didClose = () => setTimeout(() => {
    // Remove from the stack in the next round:
    deleteModalFromStack(this)

    if (checkNoOpenModalInStack()) {
      toggleGlobalScroll(false)
    }
  })

  onTransitionEnd = () => {
    const isOpen = this.portal.classList.contains('is-open')

    if (isOpen) {
      this.props.onOpen()
      this.props.onToggle(true)
      toggleGlobalScroll(true)
    } else {
      this.setState({ isOpen: false }, this.didClose)
      this.props.onClose()
      this.props.onToggle(false)
    }
  }

  onModalTransitionEnd = (e) => {
    const { onModalTransitionEnd } = this.props
    stopPropagation(e)
    onModalTransitionEnd && onModalTransitionEnd(e)
  }

  onConfirm = () => {
    const {
      onConfirm,
      shouldCloseOnAction,
      isConfirmDisabled
    } = this.props

    if (typeof onConfirm === 'function' && !isConfirmDisabled) {
      onConfirm()
    }

    if (shouldCloseOnAction) {
      this.close()
    }
  }

  onCancel = () => {
    const {
      onCancel,
      shouldCloseOnAction,
      isCancelDisabled
    } = this.props

    if (typeof onCancel === 'function' && !isCancelDisabled) {
      onCancel()
    }

    if (shouldCloseOnAction) {
      this.close()
    }
  }

  positionY = () => setTimeout(() => {
    const { type } = this.props
    const $modal = $('.Modal', this.portal)

    if (!$modal || type === 'alert') return

    const { innerHeight: vh } = window
    const { offsetHeight: h } = $modal

    const action = (vh <= h || ((vh - h) / 2) < (vh * 0.2)) ? 'add' : 'remove'
    $modal.classList[ action ]('is-v-centered')
  })

  focusOnInput = () => {
    const $input = $('.content input', this.portal)
    if ($input) $input.focus()
  }

  onKeyDown = ({ key, target: $elmt }) => {
    const {
      type,
      canClose, canCloseOnEsc,
      canConfirmOnEnter,
      onConfirm
    } = this.props

    const { isOpen } = this.state
    const isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open')

    if (
      key === 'Escape' &&

      // Not focus on form elements:
      !$elmt.matches('input, textarea, select') && !isSelectMenuOpen &&

      // Current modal is open and can close via esc:
      isOpen && canClose && canCloseOnEsc && !isSelectMenuOpen &&

      // Only work on the toppest modal:
      checkModalIndexInStack(this) === 0
    ) {
      this.close()
    }

    if (
      key === 'Enter' &&

      // Not focus on form elements:
      !$elmt.matches('textarea, button') && !isSelectMenuOpen &&

      // Current modal is open and can confirm via enter:
      isOpen && canConfirmOnEnter &&

      // Only work on the toppest modal:
      checkModalIndexInStack(this) === 0 &&

      // Only work whilst `onConfirm` callback is provided:
      (!!onConfirm || type === 'alert')
    ) {
      this.onConfirm()
    }
  }

  onClickMask = e => {
    stopPropagation(e)

    const { canClose, canCloseOnClickMask } = this.props
    const isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open')

    if (canClose && canCloseOnClickMask && !isSelectMenuOpen) {
      this.close()
    }
  }

  render () {
    return this.renderOpener()
  }

  renderOpener () {
    const { opener, openerType } = this.props
    const { isOpen } = this.state

    const modal = this.renderModal()

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

  renderModal () {
    const { modal } = this.props
    if (this.portal) {
      return modal || createPortal(this.renderModalDOM(), this.portal)
    }
    return null
  }

  renderModalDOM () {
    const {
      type,
      title,
      children,

      maskClassName,
      className,

      canClose,
      canCloseOnClickMask,

      onCancel,
      isCancelDisabled,

      onConfirm,
      isConfirmDisabled
    } = this.props

    const { isOpen } = this.state

    const shouldRenderFooter = (
      (type === 'alert' && canClose) ||
      onCancel || onConfirm
    )

    return isOpen && (
      <Fragment>
        <StyledModalPortal />
        <StyledMask
          className={trimList([
            'ModalMask',
            maskClassName,
            canClose && canCloseOnClickMask ? 'can-close' : 'cant-close'
          ])}
          onClick={this.onClickMask}
          onTransitionEnd={this.onTransitionEnd}
        />
        <StyledModal
          className={trimList([ 'Modal', TYPE_CLASS_MAP[ type ], className ])}
          onClick={stopPropagation}
          onTransitionEnd={this.onModalTransitionEnd}
        >
          {/* Header */}
          <header>
            { title }

            {/* Close button */}
            { canClose && (
              <button className="close-btn" onClick={this.close}>
                <SVG name="times" />
              </button>
            )}
          </header>

          {/* Main content */}
          <div className="content">
            { children }
          </div>

          {/* Footer */}
          { shouldRenderFooter && (
            <footer>
              { onCancel && (
                <button
                  className="cancel-btn"
                  onClick={this.onCancel}
                  disabled={isCancelDisabled}
                >
                  {this.I18N.cancel || 'Cancel'}
                </button>
              )}

              { (type === 'alert' || onConfirm) && (
                <button
                  className="confirm-btn"
                  onClick={this.onConfirm}
                  disabled={isConfirmDisabled}
                >
                  {this.I18N.confirm || 'Confirm'}
                </button>
              )}
            </footer>
          )}
        </StyledModal>

        <EventListener
          target={document}
          onKeyDown={this.onKeyDown}
        />
      </Fragment>
    )
  }
}
